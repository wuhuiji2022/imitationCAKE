<template>
	<view>
		<view class="cont"></view>
		<view class="margin bg-fff">
			<view class="text-center" @click="handleUser">
				<image class="avatar" src="https://file2105.h5project.cn/DBUgRi7HPYRNDnXW5ooQfgaK32mm5jWu/mcake-logo.png" mode=""></image>
			</view>
			<view class="fs-28 text-center">
				{{username}}
			</view>
			<view class="text-center margin">
				<text class="iconfont icon-jiantou_zuoyouqiehuan"></text>
				账号切换
			</view>
			<view class="flex grid u-border-top u-border-left">
				<view v-for="(item,index) in gridArr" class="flex flex-direction align-center padding-tb u-border-right u-border-bottom">
					<text :class="['iconfont margin-bottom-xs',item.icon]"></text>
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gridArr:[
					{
						icon:'icon-danju',
						name:'我的订单'
					},
					{
						icon:'icon-tijikongjian',
						name:'待收货'
					},
					{
						icon:'icon-ziliaoshouce',
						name:'待付款'
					},
					{
						icon:'icon-vip-fill',
						name:'会员等级'
					},
					{
						icon:'icon-jifen',
						name:'积分'
					},
					{
						icon:'icon-caiwu',
						name:'余额'
					},
					{
						icon:'icon-youhuijuan',
						name:'红包/优惠券'
					},
					{
						icon:'icon-yinhangqia',
						name:'现金卡'
					}
				]
			}
		},
		computed: {
			username() {
				let {userInfo} = this.$store.state.user
				let name = userInfo ? userInfo.username : '尚未登陆'
				return name
			}
		},
		methods: {
			handleUser(){
				uni.navigateTo({
					url:'../user/login'
				})
			}
		}
	}
</script>

<style lang="scss">
.cont{
	background-color: #f6f6f6;
	height: 400upx;
}
.grid {
	font-size: 20upx;
	.iconfont{
		font-size: 50upx;
		color: #888;
	}
	view{
		width: 25%;
	}
}
.avatar{
	width: 150upx;
	height: 150upx;
	border-radius: 50%;
	margin-top: -75upx;
}
.margin.bg-fff{
	margin-top: -200upx;
}
</style>
