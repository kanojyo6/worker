import type { UserInfo } from '../model/UserInfo'

const baseUrl = "http://183.136.206.77:45212";

// 登录
export const login = async (code: string, phoneCode?: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${baseUrl}/login/wechat/miniapp`,
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      data: {
        code: code,
        phoneCode: phoneCode || null
      },
      success: (res: any) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error(res.data?.message || '登录失败'));
        }
      },
      fail: (error) => {
        console.error('登录请求失败:', error);
        reject(new Error('网络错误'));
      }
    });
  });
};

// 登出
export const logout = async (): Promise<any> => {
  const token = uni.getStorageSync('token');
  
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${baseUrl}/login/logout/miniapp`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      success: (res: any) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error(res.data?.message || '登出失败'));
        }
      },
      fail: (error) => {
        console.error('登出请求失败:', error);
        reject(new Error('网络错误'));
      }
    });
  });
};

// 刷新令牌
export const refreshToken = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const REFRESH_TOKEN = uni.getStorageSync('refresh_token');
    if (!REFRESH_TOKEN) {
      reject(new Error('没有可用的刷新令牌'));
      return;
    }
    
    uni.request({
      url: `${baseUrl}/auth/token/refresh/miniapp`,
      method: 'POST',
      header: {'Content-Type': 'application/json'},
      data: {refresh_token: REFRESH_TOKEN},
      success: (res: any) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error(res.data?.message || '刷新失败'));
        }
      },
      fail: (error) => {
        console.error('刷新token请求失败:', error);
        reject(new Error('网络错误'));
      }
    });
  });
};

// 验证令牌
export const validateToken = async (): Promise<{valid: boolean}> => {
  return new Promise((resolve, reject) => {
    const ACCESS_TOKEN = uni.getStorageSync('token');
    if (!ACCESS_TOKEN) {
      resolve({ valid: false });
      return;
    }
    
    uni.request({
      url: `${baseUrl}/auth/token/validate`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      },
      success: (res: any) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          resolve({ valid: false });
        }
      },
      fail: (error) => {
        console.error('验证token失败:', error);
        resolve({ valid: false });
      }
    });
  });
};

// 获取用户信息
export const getUserInfo = async (): Promise<UserInfo> => {
  return new Promise((resolve, reject) => {
    const ACCESS_TOKEN = uni.getStorageSync('token');
    if (!ACCESS_TOKEN) {
      reject(new Error('未登录'));
      return;
    }
    
    uni.request({
      url: `${baseUrl}/api/users/me`,
      method: 'GET',
      header: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      },
      success: (res: any) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error(res.data?.message || '获取用户数据失败'));
        }
      },
      fail: (error) => {
        console.error('获取用户信息失败:', error);
        reject(new Error('网络错误'));
      }
    });
  });
};