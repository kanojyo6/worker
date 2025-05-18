const baseUrl = "http://110.42.32.39:45212"

// 辅助方法
const showAlert = () => {
	uni.showModal({
		title: '提示',
		content: '登录已过期，请重新登陆',
		success: (res) => {
			if (res.confirm) {
				uni.switchTab({ url: '/pages/tabbar/myPage' });
			} else {
				uni.navigateBack();
			}
		}
	});
}

export const refreshAccessToken = async () => {
    // 如果已经有一个刷新请求在进行中，直接返回该Promise
    if (refreshPromise) {
        return refreshPromise;
    }
    
    refreshPromise = new Promise((resolve, reject) => {
        const REFRESH_TOKEN = uni.getStorageSync('refresh_token');
        if (!REFRESH_TOKEN) {
            refreshPromise = null;
            reject('没有可用的刷新令牌');
            showAlert();
            return;
        }
        
        uni.request({
            url: baseUrl + `/auth/token/refresh/miniapp`,
            method: 'POST',
            header: {'Content-Type': 'application/json'},
            data: {refresh_token: REFRESH_TOKEN},
            success: (res: any) => {
                if (res.statusCode === 200) {
                    const { access_token, refresh_token } = res.data;
                    uni.setStorageSync('token', access_token);
                    uni.setStorageSync('refresh_token', refresh_token);
                    resolve(res.data);
                } else {
                    reject(res.data?.message || '刷新失败');
                    showAlert();
                }
                refreshPromise = null;
            },
            fail: (error) => {
                console.error('刷新token请求失败:', error);
                reject('网络错误');
                refreshPromise = null;
                showAlert();
            }
        });
    });
    
    return refreshPromise;
};

export const validateAccessToken = async () => {
	return new Promise((resolve, reject) => {
		const ACCESS_TOKEN = uni.getStorageSync('token')
		if (ACCESS_TOKEN === '') {
			console.log('ACCESS_TOKEN为空');
			uni.hideLoading()
			return
		}
		uni.request({
			url: baseUrl + `/auth/token/validate`,
			method: 'GET',
			header: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + ACCESS_TOKEN
			},
			success: (res : any) => {
				if (res.statusCode === 200) {
					console.log('验证token成功: ', res);
					const responseData = res.data;
					resolve(responseData);
					uni.hideLoading();
				} else {
					const errorMsg = res.data?.message || '请求失败，请重试';
					uni.showToast({
						title: errorMsg,
						icon: 'none'
					});
				}
			},
			fail: (error : any) => {
				console.log('刷新token失败: ', error)
				uni.showToast({
					title: '网络错误，请检查网络后重试',
					icon: 'none'
				});
			}
		})
	})
}

// util
let refreshPromise = null;

// 自动刷新token的函数
export const setupTokenRefresh = () => {
    const ACCESS_TOKEN = uni.getStorageSync('token');
    if (!ACCESS_TOKEN) return;
    
    // 设置一个定时器，在token过期前5分钟自动刷新
    // 假设token有效期为30分钟
    const REFRESH_BEFORE_EXPIRY = 5 * 60 * 1000; // 5分钟
    const TOKEN_LIFETIME = 25 * 60 * 1000; // 25分钟 (30-5)
    
    setTimeout(async () => {
        try {
            await refreshAccessToken();
            // 刷新成功后再次设置定时器
            setupTokenRefresh();
        } catch (error) {
            console.error('自动刷新token失败:', error);
        }
    }, TOKEN_LIFETIME);
    
    console.log('已设置token自动刷新');
};