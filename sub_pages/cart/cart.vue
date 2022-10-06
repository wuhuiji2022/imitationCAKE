<template>
	<view>
		<view class="flex padding" v-for="(item,index) in cartList" :key="index">
			<view class="flex align-center">
				<text 
					class="iconfont icon-gouxuan margin-right"
					:class="item.ischeck?'color-yellow':''"
					@click="handleCheck(index)"
				></text>
				<image class="poster margin-right" :src="item.img" mode=""></image>
			</view>
			<view class="flex justify-between info">
				<view class="">
					{{item.name}}
					<view class="margin-tb-xs">{{item.french}}</view>
					￥{{item.list[item.idx].price}}
				</view>
				<view class="flex flex-direction align-end">
					<view @click="handleEdit(index)" class="edit margin-bottom-xs">
						<text class="iconfont icon-bianji"></text>
					</view>
					{{item.list[item.idx].spec}}
					 X 
					{{item.num}}
				</view>
			</view>
		</view>
		<!-- 弹窗 -->
		<u-overlay :show="show" @click="show = false">
			<view class="bg-fff margin cover-cont" @click.stop>
				<view class="padding">
					<view class="flex justify-between info">
						<image class="poster margin-right" src="" mode=""></image>
						<view class="">
							{{cartList[cartIdx].name}}
							<view class="margin-tb-xs">{{cartList[cartIdx].french}}</view>
							￥{{checkedCartInfo.price}} 
						</view>
					</view>
					<view class="flex justify-between padding-tb u-border-bottom">
						<view class="">
							规格选择
						</view>
						<view class="drop">
							<view @click="dropShow=true">
								{{checkedCartInfo.spec}} 
								-
								{{checkedCartInfo.edible}}
								<text class="iconfont icon-xiala"></text>
							</view>
							<view class="drop-list bg-fff" v-if="dropShow">
								<view 
									v-for="(item,index) in cartList[cartIdx].list" 
									:key="index"
									class="padding-sm"
									@click="handleDropList(index)"
								>
									{{item.spec}} - {{item.edible}}
								</view>
							</view>
						</view>
					</view>
					<view class="flex justify-between align-center padding-tb-sm u-border-bottom">
						<view class="">
							数量选择
						</view>
						<u-number-box button-size="26" @change="handleNum"></u-number-box>
					</view>
				</view>
				<view class="flex margin-top">
					<button @click="show=false" type="default" class="cu-btn lg bg-brown">取消</button>
					<button @click="handleOk" type="default" class="cu-btn lg bg-yellow">确认</button>
				</view>
			</view>
		</u-overlay>
		
		<view class="my-fixed bg-fff flex">
			<view class="flex flex-sub padding align-center">
				<text 
					class="iconfont icon-gouxuan margin-right-xs"
					:class="allInfo.allCheck?'color-yellow':''"
					@click="handleAllCheck(allInfo.allCheck)"
				></text>全选
				<view class="margin-left">
					共计:{{allInfo.allPrice}}
				</view>
			</view>
			<view @click="handleOrder" class="bg-yellow padding text-center color-fff">
				立即结算
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				show:false,
				dropShow:false,
				cartIdx:0, //主商品序号
				dropIdx:0 ,//子商品序号
				num:1  //当前弹窗商品数量
			}
		},
		computed: {
			...mapState({
				cartList:state=>state.cart.cartList,
				userInfo:state=>state.user.userInfo
			}),
			...mapGetters({
				allInfo:'cart/allInfo'
			}),
			checkedCartInfo(){ //过滤下拉选中的商品对象
				let {cartIdx,cartList,dropIdx} = this
				return cartList[cartIdx].list[dropIdx]
			}
		},
		methods: {
			...mapMutations({
				handleCheck:'cart/cartCheckMut',
				handleAllCheck:'cart/cartAllCheckMut'
			}),
			handleEdit(idx){ //弹窗
				this.cartIdx = idx
				this.dropIdx = this.cartList[idx].idx  //解决子商品数量不同，导致的弹窗渲染问题
				this.show=true
			},
			handleDropList(dropIdx){ //子商品下拉列表
				this.dropShow = false
				this.dropIdx = dropIdx
			},
			handleOk(){ //弹窗确定
				this.show = false
				let {cartIdx,dropIdx,num} = this
				console.log(cartIdx,dropIdx,num);
				this.$store.commit('cart/cartListCheckMut',{cartIdx,dropIdx,num})
			},
			handleNum({value}){
				this.num = value
			},
			handleOrder(){
				uni.navigateTo({
					url:'../order/order'
				})
			}
		},
		onShow() {
			if(this.userInfo){
				return
			}
			uni.showModal({
				title:'温馨提示',
				content:'您需要先登录才能进行您的操作',
				cancelText:'稍后再说',
				confirmText:'立即登录',
				success: ({cancel}) => {
					if(cancel){
						uni.navigateBack({
							delta:1
						})
						return
					}
					uni.navigateTo({
						url:'../user/login'
					})
				}
			})
		}
	}
</script>

<style lang="scss">
page{
	padding-bottom: 100upx;
}
.poster{
	width: 180upx;
	height: 180upx;
	background-color: #d8d8d8;
}
.info{
	width: 60%;
	.edit{
		width: 80upx;
		height: 80upx;
		text-align: center;
		line-height: 80upx;
		background-color: #e6e6e6;
		border-radius: 50%;
		
	}
}
.flex.align-end{
	min-width: 210upx;
}
.icon-gouxuan{
	color: #e7e7e7;
}
.cu-btn.lg{
	width: 50%;
}
.cover-cont{
	position: absolute;
	top: 50%;
	left: 0;
	width: 690upx;
	transform: translateY(-50%);
	border-radius: 10upx;
}
.drop{
	position: relative;
	.drop-list{
		width: 300upx;
		position: absolute;
		top: 60upx;
		right: 0;
		box-shadow: 0 0 10upx 2upx rgba(0,0,0,0.2);
		z-index: 10;
		view:hover{
			background-color: #e6e6e6;
		}
	}
}
</style>
