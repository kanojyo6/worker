
const baseUrl = "http://110.42.32.39:45212"

// 获取订单详情 (招聘详情)
export const requestOrderDetailInfo = async (id: number | string): Promise<any> => {
  return new Promise((resolve, reject) => {
    // Token and Authorization header are now handled by HttpInterceptor.ts
    uni.request({
      url: `${baseUrl}/api/recruitments/${id}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + token // REMOVED - Handled by interceptor
      },
      success: (res: any) => {
        if (res.statusCode === 200) {
          console.log('请求招聘详情成功: ', res.data);
          resolve(res.data);
        } else {
          // Interceptor should handle 401 (token expiry).
          // Other errors (403 for different reasons, 404, 500) are handled here.
          const errorMsg = res.data?.message || res.data?.msg || `获取招聘详情失败 (${res.statusCode})`;
          console.error('获取招聘详情失败:', errorMsg, res);
          reject(new Error(errorMsg));
        }
      },
      fail: (error: any) => {
        console.error('获取招聘详情网络请求失败:', error);
        reject(new Error(error.errMsg || '网络错误，请检查网络后重试'));
      }
    });
  });
};

// 获取该订单的申请列表（我的需求专用）
export const requestApplicatorsList = async (requirementId: string, page: number): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    // Token and Authorization header are now handled by HttpInterceptor.ts
    uni.request({
      url: `${baseUrl}/api/applications/requirement/${requirementId}/not-ignored`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + token // REMOVED - Handled by interceptor
      },
      data: {
        page: page,
        size: 20
      },
      success: (res: any) => {
        if (res.statusCode === 200) {
          const data = res.data as { content: any[] }; // Assuming backend returns paginated data with a 'content' array
          console.log('请求申请列表成功: ', data.content);
          resolve(data.content || []); // Ensure to return an array
        } else {
          // Interceptor should handle 401.
          const errorMsg = res.data?.message || res.data?.msg || `获取申请列表失败 (${res.statusCode})`;
          console.error('获取申请列表失败:', errorMsg, res);
          reject(new Error(errorMsg));
        }
      },
      fail: (error: any) => {
        console.error('获取申请列表网络请求失败:', error);
        reject(new Error(error.errMsg || '网络错误，请检查网络后重试'));
      }
    });
  });
};

// 同意申请（我的需求专用）
export const agreeApplicator = async (applicationId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    // Token and Authorization header are now handled by HttpInterceptor.ts
    uni.request({
      url: `${baseUrl}/api/applications/${applicationId}/accept`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + token // REMOVED - Handled by interceptor
      },
      success: (res: any) => {
        if (res.statusCode === 200 || res.statusCode === 204) { // 204 No Content is also a success
          console.log('同意申请成功: ', res.data);
          resolve(res.data);
        } else {
          // Interceptor should handle 401.
          const errorMsg = res.data?.message || res.data?.msg || `同意申请失败 (${res.statusCode})`;
          console.error('同意申请失败:', errorMsg, res);
          reject(new Error(errorMsg));
        }
      },
      fail: (error: any) => {
        console.error('同意申请网络请求失败:', error);
        reject(new Error(error.errMsg || '网络错误，请检查网络后重试'));
      }
    });
  });
};

// 忽略申请（我的需求专用）
export const ignoreApplicator = async (applicationId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    // Token and Authorization header are now handled by HttpInterceptor.ts
    uni.request({
      url: `${baseUrl}/api/applications/${applicationId}/ignore`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + token // REMOVED - Handled by interceptor
      },
      success: (res: any) => {
        if (res.statusCode === 200 || res.statusCode === 204) {
          console.log('忽略申请成功: ', res.data);
          resolve(res.data);
        } else {
          // Interceptor should handle 401.
          const errorMsg = res.data?.message || res.data?.msg || `忽略申请失败 (${res.statusCode})`;
          console.error('忽略申请失败:', errorMsg, res);
          reject(new Error(errorMsg));
        }
      },
      fail: (error: any) => {
        console.error('忽略申请网络请求失败:', error);
        reject(new Error(error.errMsg || '网络错误，请检查网络后重试'));
      }
    });
  });
};

// 获取该需求的申请状态
export const requestApplicationStatus = async(id: string) => {
	return new Promise((resolve, reject) => {
		const token = uni.getStorageSync('token')
		if (token === '') {
			console.log('token无效');
			uni.hideLoading()
			uni.showToast({
				title: 'token无效',
				icon: 'none'
			})
			return
		}
		uni.request({
			url: baseUrl + `/api/applications/${id}`,
			method: 'GET',
			header: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			success: (res: any) => {
			  if (res.statusCode === 200 || res.statusCode === 204) {
			    console.log('请求申请状态成功: ', res);
			    const responseData = res.data;
			    resolve(responseData.currentStatus);
			    uni.hideLoading();
			  } else {
			    // Interceptor should handle 401.
			    const errorMsg = res.data?.message || res.data?.msg || `失败 (${res.statusCode})`;
			    console.error('失败:', errorMsg, res);
			    reject(new Error(errorMsg));
			  }
			},
			fail: (error: any) => {
			  console.error('失败:', error);
			  reject(new Error(error.errMsg || '网络错误，请检查网络后重试'));
			}
		})
	})
}