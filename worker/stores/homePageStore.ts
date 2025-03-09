import { defineStore } from 'pinia'
import { requestRecommendedInfo } from '../services/homePageService';

export const useRecommendedStore = defineStore('recommended', {
	state: () => ({
		recommendedOrder: [],
		isLoading: false,
		error: null
	}),
	
	getters: {
		getRecommendedOrder: (state) => state.recommendedOrder,
	},

	actions: {
		async fetchRecommendedOrders(page: number, size: number) {
			this.isLoading = true;
			this.error = null;
			try {
				const responseData = await requestRecommendedInfo(page, size);
				this.recommendedOrder = responseData;
				console.log('将responseData存储到pinia中:', this.recommendedOrder);
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