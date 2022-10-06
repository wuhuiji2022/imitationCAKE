<template>
	<view>
		<view 
			class="margin-sm u-border padding" 
			v-for="(item,index) in addressList"
			:key="index"
			:class="{'default':item.isdefault}"
		>
			<view class="default-cont">
				默
			</view>
			<view class="flex justify-between">
				<view class="flex align-center">
					<text
						class="iconfont icon-gouxuan margin-right"
						:class="checkedIdx==index?'color-yellow':''"
						@click="handleCheckAddress(index)"
					></text>
					<view class="">
						{{item.username}},{{item.phone}}
						<view class="">
							{{item.city}}
							{{item.region}}
							{{item.detail}}
						</view>
					</view>
				</view>
				<view @click="handleEdit(index)" class="edit margin-bottom-xs">
					<text class="iconfont icon-bianji"></text>
				</view>
			</view>
			<view class="flex justify-around align-center margin-top">
				<view class="" v-if="item.isdefault">
					默认地址
				</view>
				<view class="" v-else @click="handleDefault(index)">
					设为默认
				</view>
				
				<u-line length="15" direction="col"></u-line>
				<view class="">
					删除地址
				</view>
			</view>
		</view>
		<view class="text-center">
			<button class="cu-btn bg-brown" @click="handleAddAddress">
				新增地址
			</button>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapState({
				addressList:state=>state.address.addressList,
				checkedIdx:state=>state.address.checkedIdx,
				userInfo:state=>state.user.userInfo
			})
		},
		methods: {
			...mapMutations({
				// 'handleDefault':'address/addressDefaultMut',
				'handleCheckAddress':'address/addressCheckMut'
			}),
			handleAddAddress(){
				uni.navigateTo({
					url:'address-detail'
				})
			},
			handleDefault(idx){ //设为默认
				// {
				// 	"requests": [
				// 	  {
				// 		"method": "PUT",
				// 		"path": `/1.1/classes/address/${objectId}`,
				// 		"body": {
				// 		  "isdefault": true
				// 		}
				// 	  }
				// 	]
				//   }
				let obj = {"requests":[]}
				this.addressList.forEach((item,i)=>{
					let bool = i===idx
					obj.requests.push({
						"method": "PUT",
						"path": `/1.1/classes/address/${item.objectId}`,
						"body": {
						  "isdefault": bool
						}
					})
				})
				this.$post('/1.1/batch',obj).then(res=>{ //批量操作在线数据
					this.$store.commit('address/addressDefaultMut',idx)
				})
				
			}
		}
	}
</script>

<style lang="scss">
.edit{
	width: 80upx;
	height: 80upx;
	text-align: center;
	line-height: 80upx;
	background-color: #e6e6e6;
	border-radius: 50%;
	
}
.default-cont{
	display: none;
}
.default{
	position: relative;
	overflow: hidden;
	.default-cont{
		padding: 40upx 10upx 10upx;
		width: 150upx;
		background-color: #FAE456;
		font-size: 12upx;
		text-align: center;
		position: absolute;
		top: -30upx;
		right: -65upx;
		transform: rotate(45deg);
		display: block;
	}
}

</style>
