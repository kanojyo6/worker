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
				const responseData = await requestMyOrdersInfo(0, 3);
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

export const useMyOrdersListStore = defineStore('myOrdersList', {
	state: () => ({
		myOrdersList: [],
		isLoading: false,
		error: null
	}),
	
	getters: {
		getMyOrdersList: (state) => state.myOrdersList,
	},
	
	actions: {
		async fetchMyOrdersList(page: number, size: number) {
			this.isLoading = true;
			this.error = null;
			try {
				const responseData = await requestMyOrdersInfo(page, size) as any[];
				this.myOrdersList.push(...responseData) 
				console.log('将responseData存储到pinia中:', this.myOrdersList)
			} catch (error) {
				//TODO handle the exception
				this.error = error
			} finally {
				this.isLoading = false;
			}
		},
		
		// 清楚数据
		clear() {
			this.myOrdersList = []
		}
	}
})