<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 尝试提取本地存储用户信息
			try {
			    const value = uni.getStorageSync('userInfo');
			    if (value) {
			        this.$store.commit('user/initInfo',value)
					this.$store.dispatch('address/addressInitAct',value.objectId)
			    }
			} catch (e) {
			    // error
				console.log('提取用户信息失败',e);
			}
			// 设置默认勾选地址
			this.$store.commit('address/initCheckIdxMut')
			
			// 处理手机顶部状态栏兼容问题
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			
			// Vue.prototype.ColorList = [{
			// 		title: '嫣红',
			// 		name: 'red',
			// 		color: '#e54d42'
			// 	},
			// 	{
			// 		title: '桔橙',
			// 		name: 'orange',
			// 		color: '#f37b1d'
			// 	},
			// 	{
			// 		title: '明黄',
			// 		name: 'yellow',
			// 		color: '#fbbd08'
			// 	},
			// 	{
			// 		title: '橄榄',
			// 		name: 'olive',
			// 		color: '#8dc63f'
			// 	},
			// 	{
			// 		title: '森绿',
			// 		name: 'green',
			// 		color: '#39b54a'
			// 	},
			// 	{
			// 		title: '天青',
			// 		name: 'cyan',
			// 		color: '#1cbbb4'
			// 	},
			// 	{
			// 		title: '海蓝',
			// 		name: 'blue',
			// 		color: '#0081ff'
			// 	},
			// 	{
			// 		title: '姹紫',
			// 		name: 'purple',
			// 		color: '#6739b6'
			// 	},
			// 	{
			// 		title: '木槿',
			// 		name: 'mauve',
			// 		color: '#9c26b0'
			// 	},
			// 	{
			// 		title: '桃粉',
			// 		name: 'pink',
			// 		color: '#e03997'
			// 	},
			// 	{
			// 		title: '棕褐',
			// 		name: 'brown',
			// 		color: '#a5673f'
			// 	},
			// 	{
			// 		title: '玄灰',
			// 		name: 'grey',
			// 		color: '#8799a3'
			// 	},
			// 	{
			// 		title: '草灰',
			// 		name: 'gray',
			// 		color: '#aaaaaa'
			// 	},
			// 	{
			// 		title: '墨黑',
			// 		name: 'black',
			// 		color: '#333333'
			// 	},
			// 	{
			// 		title: '雅白',
			// 		name: 'white',
			// 		color: '#ffffff'
			// 	}
			// ]
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	@import '/colorui/main.css';
	@import '/colorui/icon.css';
	@import '/static/css/iconfont.css';
</style>
