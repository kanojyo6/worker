const baseUrl = "http://183.136.206.77:45212";
import type { UserInfo } from '../model/UserInfo'; // If UserInfo model is used

// Login
export const login = async (code: string, phoneCode?: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${baseUrl}/login/wechat/miniapp`,
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      data: { code, phoneCode: phoneCode || null },
      success: (res: any) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error(res.data?.message || res.data?.msg || '登录失败'));
        }
      },
      fail: (error) => {
        console.error('登录请求失败:', error);
        reject(new Error('网络错误或登录服务不可用'));
      }
    });
  });
};

// Logout
export const logout = async (): Promise<any> => {
  const token = uni.getStorageSync('token');
  // Even if no token, try to call backend logout if it's designed to handle it
  // (e.g. server might have session even if client lost token)
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${baseUrl}/login/logout/miniapp`, // Ensure this is your correct logout endpoint
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }) // Add token if available
      },
      success: (res: any) => {
        if (res.statusCode === 200 || res.statusCode === 204) { // 204 No Content is also a valid success
          resolve(res.data);
        } else {
          reject(new Error(res.data?.message || res.data?.msg || '登出失败'));
        }
      },
      fail: (error) => {
        console.error('登出请求失败:', error);
        reject(new Error('网络错误或登出服务不可用'));
      }
    });
  });
};

// Refresh Token (This is the raw API call)
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
      header: { 'Content-Type': 'application/json' },
      data: { refresh_token: REFRESH_TOKEN },
      success: (res: any) => {
        if (res.statusCode === 200 && res.data && res.data.access_token) {
          resolve(res.data); // Expected: { access_token, refresh_token, user }
        } else {
          reject(new Error(res.data?.message || res.data?.msg || '刷新令牌失败'));
        }
      },
      fail: (error) => {
        console.error('刷新token请求失败:', error);
        reject(new Error('网络错误或刷新令牌服务不可用'));
      }
    });
  });
};

// Validate Token
export const validateToken = async (): Promise<{ valid: boolean }> => {
  return new Promise((resolve) => { // Removed reject as per original, always resolves
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
        // Assuming res.data is { "valid": true/false } from backend
        if (res.statusCode === 200 && typeof res.data?.valid === 'boolean') {
          resolve({ valid: res.data.valid });
        } else {
          resolve({ valid: false });
        }
      },
      fail: (error) => {
        console.error('验证token请求失败:', error);
        resolve({ valid: false });
      }
    });
  });
};

// Get User Info
export const getUserInfo = async (): Promise<UserInfo> => { // Return type UserInfo
  return new Promise((resolve, reject) => {
    const ACCESS_TOKEN = uni.getStorageSync('token');
    if (!ACCESS_TOKEN) {
      reject(new Error('未登录或Token无效 (getUserInfo)'));
      return;
    }
    uni.request({
      url: `${baseUrl}/api/users/me`, // Ensure this is your correct user info endpoint
      method: 'GET',
      header: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      },
      success: (res: any) => {
        if (res.statusCode === 200 && res.data) {
          resolve(res.data as UserInfo); // Cast to UserInfo
        } else {
          reject(new Error(res.data?.message || res.data?.msg || '获取用户数据失败'));
        }
      },
      fail: (error) => {
        console.error('获取用户信息请求失败:', error);
        reject(new Error('网络错误或用户服务不可用'));
      }
    });
  });
};