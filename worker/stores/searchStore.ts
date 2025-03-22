import { defineStore } from 'pinia'
import { requestSearchResult } from '../services/searchService';

// 从全部订单中搜索
export const useSearchStore = defineStore('search', {
	state: () => ({
		searchInfo: [],
		isLoading: false,
		error: null
	}),
	
	getters: {
		getSearchResult: (state) => state.searchInfo,
	},

	actions: {
		async fetchSearchResult(keyword: string, page: number, size: number) {
			this.isLoading = true;
			this.error = null;
			try {
				const responseData = await requestSearchResult(keyword, page, size) as any[];
				this.searchInfo.push(...responseData) 
				console.log('将responseData存储到pinia中:', this.searchInfo)
			} catch (error) {
				//TODO handle the exception
				this.error = error
			} finally {
				this.isLoading = false;
			}
		},
		
		// 清除数据
		clear() {
			this.searchInfo = []
		}
	}
})