import { defineStore } from 'pinia'
import { requestTypeDetailInfo } from '../services/typeDetailPageService';

export const useTypeDetailStore = defineStore('typeDetail', {
	state: () => ({
		typeDetailInfo: [],
		isLoading: false,
		error: null
	}),
	
	getters: {
		getTypeDetailInfo: (state) => state.typeDetailInfo,
	},

	actions: {
		async fetchTyperDetailInfo(type: string, page: number, size: number) {
			this.isLoading = true;
			this.error = null;
			try {
				const responseData = await requestTypeDetailInfo(type, page, size);
				this.typeDetailInfo = responseData;
				console.log('将responseData存储到pinia中:', this.typeDetailInfo);
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