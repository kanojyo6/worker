import { defineStore } from 'pinia'
// import { myOrderResponseModel } from '../model/myOrderResponseModel'
import { requestMyOrdersInfo } from '../services/myPageService'

export const useMyOrdersStore = defineStore('myOrders', {
	state: () => ({
		myOrders: [],
		isLoading: false,
		error: null
	}),
	
	getters: {
		getMyOrders: (state) => state.myOrders,
	},

	actions: {
		async fetchMyOrders() {
			this.isLoading = true;
			this.error = null;
			try {
				const responseData = await requestMyOrdersInfo();
				this.myOrders = responseData
				console.log('将responseData存储到pinia中:', this.myOrders)
			} catch (error) {
				//TODO handle the exception
				this.error = error
			} finally {
				this.isLoading = false;
			}
		}
	}
})