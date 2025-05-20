import { defineStore } from 'pinia'
import { requestOrderDetailInfo, requestApplicatorsList, requestApplicationStatus } from '../services/orderDetailPageService';

export const useOrderDetailStore = defineStore('orderDetail', {
	state: () => ({
		orderDetailInfo: {
			applicationCount: 0,
			companyName: "",
			contactInfo: "",
			contactType: "",
			contactTypeName: "",
			content: "",
			id: "",
			imageUrl: "",
			location: "",
			publisherId: 0,
			publisherName: "",
			salary: 0,
			salaryPeriod: "",
			status: "",
			statusName: "",
			title: "",
			type: "",
			typeName: ""
		},
		applicationStatus: "",
		isLoading: false,
		error: null
	}),
	
	getters: {
		getOrderDetailInfo: (state) => state.orderDetailInfo,
		getApplicationStatus: (state) => state.applicationStatus
	},

	actions: {
		async fetchOrderDetailInfo(id: string) {
			this.isLoading = true;
			this.error = null;
			try {
				const responseData = await requestOrderDetailInfo(id);
				this.orderDetailInfo = responseData;
				console.log('将responseData存储到pinia中:', this.orderDetailInfo);
			} catch (error) {
				//TODO handle the exception
				this.error = error;
				console.log('发生请求错误：', error);
			} finally {
				this.isLoading = false;
			}
		},
		
		// 追踪申请状态（我的申请专用）
		async fetchApplicationStatus(id: string) {
			this.isLoading = true;
			this.error = null;
			try {
				const responseData = await requestApplicationStatus(id);
				this.applicationStatus = responseData;
				console.log('该需求申请状态为:', this.applicationStatus);
			} catch (error) {
				//TODO handle the exception
				this.error = error;
				console.log('发生请求错误：', error);
			} finally {
				this.isLoading = false;
			}
		}
	}
})

// 获取该订单的申请列表（我的需求专用）
export const useApplicatorsListStore = defineStore('applicatorList', {
	state: () => ({
		applicatorList: [],
		isLoading: false,
		error: null
	}),
	
	getters: {
		getApplicatorList: (state) => state.applicatorList,
	},

	actions: {
		async fetchApplicatorList(id: string, page: number) {
			this.isLoading = true;
			this.error = null;
			try {
				const responseData = await requestApplicatorsList(id, page);
				this.applicatorList = responseData;
				console.log('将responseData存储到pinia中:', this.applicatorList);
			} catch (error) {
				//TODO handle the exception
				this.error = error;
				console.log('发生请求错误：', error);
			} finally {
				this.isLoading = false;
			}
		}
	}
})
