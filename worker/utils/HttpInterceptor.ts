import { refreshToken as apiRefreshToken } from '../services/AuthService'; // Renamed for clarity

export const setupHttpInterceptor = () => {
  let isRefreshing = false;
  let pendingRequests: Array<{
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
    config: UniApp.RequestOptions; // Store original config for retry
  }> = [];

  const processPendingRequests = (isSuccess: boolean, token?: string) => {
    pendingRequests.forEach(request => {
      if (isSuccess && token) {
        request.resolve(token); 
      } else {
        request.reject(new Error('Token刷新失败 (processPendingRequests)'));
      }
    });
    pendingRequests = [];
  };

  uni.addInterceptor('request', {
    invoke(options: UniApp.RequestOptions) {
      const NO_AUTH_URLS = ['/login/wechat/miniapp', '/auth/token/refresh/miniapp'];
      let requiresAuth = true;
      if (options.url) {
        requiresAuth = !NO_AUTH_URLS.some(noAuthUrl => options.url!.includes(noAuthUrl));
      }

      if (requiresAuth) {
        const token = uni.getStorageSync('token');
        if (token) {
          if (!options.header) {
            options.header = {};
          }
          options.header['Authorization'] = `Bearer ${token}`;
        } else {
          console.warn(`请求 ${options.url} 需要认证，但未找到token。`);
        }
      }
      return options;
    },
    success(response) {
      return response;
    },
    fail(error) {
      console.error('请求网络失败或执行错误:', error);
      return error; 
    },
    complete(res: any) {
      if (res && res.statusCode === 401) {
        const originalRequestConfig = res.config; 

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            pendingRequests.push({ resolve, reject, config: originalRequestConfig });
          });
        }

        isRefreshing = true;

        return new Promise((resolveRequest, rejectRequest) => {
          apiRefreshToken()
            .then(data => {
              const newToken = data.access_token;
              uni.setStorageSync('token', newToken);
              uni.setStorageSync('refresh_token', data.refresh_token);
              if (data.user) {
                uni.setStorageSync('user', JSON.stringify(data.user));
              }

              uni.$emit('tokenRefreshedByInterceptor');

              processPendingRequests(true, newToken); 

              if (originalRequestConfig && typeof originalRequestConfig === 'object') {
                const newConfig = { ...originalRequestConfig };
                if (!newConfig.header) newConfig.header = {};
                newConfig.header['Authorization'] = `Bearer ${newToken}`;
                uni.request(newConfig)
                    .then(retryResponse => resolveRequest(retryResponse))
                    .catch(retryError => rejectRequest(retryError));
              } else {
                resolveRequest(res);
              }
            })
            .catch(refreshError => {
              console.error('Interceptor: Token刷新失败:', refreshError);
              uni.removeStorageSync('token');
              uni.removeStorageSync('refresh_token');
              uni.removeStorageSync('user');

              uni.$emit('tokenRefreshFailedByInterceptor');

              processPendingRequests(false);
              
              uni.showModal({
                title: '提示',
                content: '登录已过期，请重新登录',
                showCancel: false,
                success: (modalResult) => {
                  if (modalResult.confirm) {
                    uni.reLaunch({ url: '/pages/login/login' });
                  }
                }
              });
              rejectRequest(refreshError); 
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      }
      return res;
    }
  });
  console.log('HTTP拦截器已设置');
};