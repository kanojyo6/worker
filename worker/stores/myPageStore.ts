import { defineStore } from 'pinia'
// import { myOrderResponseModel } from '../model/myOrderResponseModel'
import { requestMyOrdersInfo, requestMyOffersInfo } from '../services/myPageService'

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

export const useMyOffersStore = defineStore('myOffers', {
	state: () => ({
		myOffers: [],
		isLoading: false,
		error: null
	}),
	
	getters: {
		getMyOffers: (state) => state.myOffers,
	},
	
	actions: {
		async fetchMyOffers() {
			this.isLoading = true;
			this.error = null;
			try {
				const responseData = await requestMyOffersInfo(0, 3);
				this.myOffers = responseData
				console.log('将responseData存储到pinia中:', this.myOffers)
			} catch (error) {
				//TODO handle the exception
				this.error = error
			} finally {
				this.isLoading = false;
			}
		}
	}
})

export const useMyOffersListStore = defineStore('myOffersList', {
	state: () => ({
		myOffersList: [],
		isLoading: false,
		error: null
	}),
	
	getters: {
		getMyOffersList: (state) => state.myOffersList,
	},
	
	actions: {
		async fetchMyOfffersList(page: number, size: number) {
			this.isLoading = true;
			this.error = null;
			try {
				const responseData = await requestMyOffersInfo(page, size) as any[];
				this.myOffersList.push(...responseData) 
				console.log('将responseData存储到pinia中:', this.myOffersList)
			} catch (error) {
				//TODO handle the exception
				this.error = error
			} finally {
				this.isLoading = false;
			}
		},
		
		// 清楚数据
		clear() {
			this.myOffersList = []
		}
	}
})