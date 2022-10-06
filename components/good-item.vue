<template>
	<view class="cake-item" @click="handleDetail">
		<image  class="poster" :src="gdata.img" mode=""></image>
		<view class="info-cont">
			<view class="info flex align-center justify-between">
				<view class="">
					<view class="fs-28">
						{{gdata.name}}
					</view>
					<view class="fs-16">
						{{gdata.french}}
					</view>
				</view>
				<view @click.stop="handleCartAdd" class="cart-btn margin-right-sm">
					<text class="iconfont icon-gouwuche"></text>
				</view>
			</view>
			<view class="fs-18">
				<text class="fs-14">￥</text>
				{{gdata.price}}
			</view>

		</view>
	</view>

</template>

<script>
	export default {
		name: "good-item",
		props:['gdata'],
		data() {
			return {

			};
		},
		methods: {
			handleDetail() {
				// console.log(111);
				uni.setStorage({
					key:'detail',
					data:this.gdata,
					success: () => {
						uni.navigateTo({
							url:'/sub_pages/detail/detail'
						})
					}
				})
				
			},
			handleCartAdd(){
				this.$store.commit('cart/cartAddMut',{
					...this.gdata,
					idx:0
				})
			}
		},
	}
</script>

<style lang="scss">
	.cake-item {
		width: 350upx;

		.poster {
			height: 350upx;
			background-color: #f5f5f5;
		}

		.fs-28 {
			margin-top: 24upx;
		}

		.fs-16 {
			margin: 14upx 0;
		}

		.fs-18 {
			margin-bottom: 22upx;
		}

		.cart-btn {
			width: 60upx;
			height: 60upx;
			border-radius: 50%;
			background-color: #ffe32a;
			text-align: center;
			line-height: 60upx;
		}
	}
</style>
