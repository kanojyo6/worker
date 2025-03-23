// utils/HttpInterceptor.ts
import { refreshToken } from '../services/AuthService';

// 创建请求拦截器
export const setupHttpInterceptor = () => {
  let isRefreshing = false;
  let pendingRequests: Array<{
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
  }> = [];

  // 处理所有等待的请求
  const processPendingRequests = (isSuccess: boolean, token?: string) => {
    pendingRequests.forEach(request => {
      if (isSuccess && token) {
        request.resolve(token);
      } else {
        request.reject(new Error('Token刷新失败'));
      }
    });
    pendingRequests = [];
  };

  // 添加请求拦截器
  uni.addInterceptor('request', {
    invoke(options) {
      // 检查是否需要添加token
      if (options.url && !options.url.includes('/login/') && !options.url.includes('/auth/token/refresh/')) {
        const token = uni.getStorageSync('token');
        if (token) {
          if (!options.header) {
            options.header = {};
          }
          options.header['Authorization'] = `Bearer ${token}`;
        }
      }
      return options;
    },
    success(response) {
      return response;
    },
    fail(error) {
      console.error('请求失败:', error);
      return error;
    },
    complete(res) {
      // 检查是否是token过期（401错误）
      if (res.statusCode === 401) {
        // 创建刷新token的Promise
        const refreshTokenPromise = new Promise((resolve, reject) => {
          // 如果已经在刷新，则加入等待队列
          if (isRefreshing) {
            pendingRequests.push({ resolve, reject });
            return;
          }
          
          isRefreshing = true;
          
          // 尝试刷新token
          refreshToken()
            .then(data => {
              const newToken = data.access_token;
              uni.setStorageSync('token', newToken);
              uni.setStorageSync('refresh_token', data.refresh_token);
              // 处理等待的请求
              processPendingRequests(true, newToken);
              resolve(newToken);
            })
            .catch(error => {
              processPendingRequests(false);
              // 如果刷新失败，跳转到登录页
              uni.showModal({
                title: '提示',
                content: '登录已过期，请重新登陆',
                success: (result) => {
                  if (result.confirm) {
                    uni.switchTab({ url: '/pages/tabbar/myPage' });
                  } else {
                    uni.navigateBack();
                  }
                }
              });
              reject(error);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });

        // 返回一个带有刷新token的新请求
        if (res.config && typeof res.config === 'object') {
          return refreshTokenPromise.then(newToken => {
            // 使用新token重新发起请求
            const newConfig = { ...res.config };
            if (!newConfig.header) newConfig.header = {};
            newConfig.header['Authorization'] = `Bearer ${newToken}`;
            return uni.request(newConfig);
          });
        }
      }
      return res;
    }
  });
};