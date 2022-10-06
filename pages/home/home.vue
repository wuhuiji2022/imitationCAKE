<template>
	<view class="">
		<cu-custom></cu-custom>
		<scroll-view :scroll-into-view="topItem" scroll-with-animation class="scroll-cont" scroll-y="true"
			@scroll="handleScroll" :enable-back-to-top="true">
			<view>
				<view id="top"></view>
				<!-- <nav-custom></nav-custom> -->
				<swiper class="banner" :indicator-dots="true" :autoplay="true" indicator-active-color="#ffe32a">
					<swiper-item v-for="(item,index) in banner" :key="item.objectId" @click="handleBanner(item.link)">
						<view class="swiper-item">
							<image :src="item.img"></image>
						</view>
					</swiper-item>
				</swiper>
				<!-- #ifdef MP-WEIXIN -->
				<view class="flex justify-around home-grid padding-tb u-border-bottom">
					<view 
						class="text-center" 
						v-for="(item,index) in list" 
						:key="index"
						@click="handleJump(item.target)"
					>
						<image :src="item.img" mode=""></image>
						<view>{{item.title}}</view>
					</view>
				</view>
				<!-- #endif -->
				<home-title title="本季推荐" en-title="Seasonal Recommend" en-tit="Seasonal"></home-title>
				<scroll-view scroll-x="true">
					<view class="scroll-inner">
						<image src="https://file2105.h5project.cn/VbjYkBJC4mbDVE0HH2x4pDqyjTo6uiY4/recommend1.jpeg" mode="heightFix"></image>
						<image src="https://file2105.h5project.cn/jbrV7sKVfYuch1xOfh28vFlF2U3ImNDI/recommend2.jpg" mode="heightFix"></image>
						<image src="https://file2105.h5project.cn/L5cOBJGXugoQhjKMzv7Njvsw6IT3pQWA/recommend3.jpg" mode="heightFix"></image>
					</view>
				</scroll-view>
				<home-title title="法式经典" en-title="French Classics" en-tit="French"></home-title>
				<image class="classify" src="https://file2105.h5project.cn/vUxadHwFcLQjF8NQQsPcKp0ntLdbz3Hv/french.jpg" mode=""></image>
				<view class="flex flex-wrap padding-sm justify-between">
					<good-item v-for="(item,index) in glist" :gdata="item"></good-item>
				</view>
				<view class="back-top" v-if="isShow" @click="handleBackTop">
					<text class="iconfont icon-tubiao_fanhuidingbu"></text>
				</view>
			</view>

			<tab-custom></tab-custom>
		</scroll-view>
	</view>
</template>

<script>
	import {
		$http
	} from '../../utils/request.js'
	export default {
		data() {
			return {
				isShow: false,
				topItem: '', //返回顶部的标记点
				banner: [],
				glist: [],
				list: [{
						img: 'https://file2105.h5project.cn/tjtx2a3xx8vzeP8CisP9pOmsnpYBUbPS/home_icon1.png',
						title: '最新活动',
						target:''
					},
					{
						img: 'https://file2105.h5project.cn/6GbkBdFvCe3apcl1zuSVOrnJ8sfPoAvK/home_icon2.png',
						title: '个人中心',
						target:'/sub_pages/my/my'
					},
					{
						img: 'https://file2105.h5project.cn/iU35SRTpe19CSKDrQ4h3BvNMh2sbLpwn/home_icon3.png',
						title: '关于我们',
						target:''
					},
					{
						img: 'https://file2105.h5project.cn/3udWeh91Q1PB0QN0PR8t5rUvfr0Pz5FL/home_icon4.png',
						title: '配送范围',
						target:''
					}
				],
			}
		},
		methods: {
			handleScroll(ev) {
				// console.log(ev);
				let {
					scrollTop
				} = ev.detail
				this.isShow = scrollTop > 500
				this.topItem = ''
			},
			handleBackTop() {
				this.topItem = 'top'
			},
			handleBanner(link) {
				// console.log(1111);
				uni.navigateTo({
					url: `./banner-ad?link=${link}`
				})
			},
			handleJump(url){
				if(!url){
					uni.showToast({
						title:'敬请期待',
						icon:'none'
					})
					return
				}
				uni.navigateTo({
					url
				})
			}

		},
		onLoad() {
			// 方法1:
			// uni.request({
			// 	url:'https://api2105.h5project.cn/1.1/classes/classify',
			// 	method:'GET',
			// 	header:{
			// 		"X-LC-Id": "7yoqQxyLBNN9MW5rsgTGXbHL-gzGzoHsz",
			// 		"X-LC-Key": "hA8yGYuHjnXWRui1rzTe0C3P",
			// 		"Content-Type": "application/json"
			// 	},
			// 	success: (res) => {
			// 		console.log(res);
			// 	}
			// })
			// 方法2:
			// $http('/1.1/classes/classify').then(res=>{
			// 	console.log(res);
			// })
			// 方法3:
			// this.$get('/1.1/classes/classify').then(res=>{
			// 	console.log(res);
			// })
			this.$get('/1.1/classes/banner').then(res => {
				console.log(res);
				this.banner = res.results
			})
			let url = `/1.1/classes/goods?where={"bcid":1}&limit=8&skip=0`
			this.$get(url).then(res => {
				console.log(res);
				this.glist = res.results
			})
		}
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 200upx;
	}
	.home-grid{
		image{
			width: 80upx;
			height: 80upx;
		}
	}

	.banner {
		height: 1000upx;

		swiper-item {
			height: 1000upx;
		}

		image {
			width: 100%;
			height: 1000upx;
		}
	}

	.scroll-inner {
		white-space: nowrap;

		image {
			height: 290upx;
		}
	}

	.classify {
		height: 380upx;
		width: 100%;
	}

	.back-top {
		height: 100upx;
		width: 100upx;
		background-color: #fff;
		border-radius: 50%;
		box-shadow: 0 0 30upx 4upx rgba(0, 0, 0, 0.4);
		position: fixed;
		bottom: 150upx;
		right: 20upx;
		text-align: center;
		line-height: 100upx;
	}

	.scroll-cont {
		// border: 1px solid red;
		height: 100vh;
	}
</style>
