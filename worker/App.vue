<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 双token验证
			const ACCESS_TOKEN = uni.getStorageSync('token')
			const REFRESH_TOKEN = uni.getStorageSync('refresh_token')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
