import { defineStore } from 'pinia'
import { requestOrderDetailInfo } from '../services/orderDetailPageService';

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
		isLoading: false,
		error: null
	}),
	
	getters: {
		getOrderDetailInfo: (state) => state.orderDetailInfo,
	},

	actions: {
		async fetchOrderDetailInfo(id: number) {
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
		}
	}
})