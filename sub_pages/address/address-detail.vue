<template>
	<view>
		<map class="map"></map>
		<form @submit="handleSubmit">
			<view class="cu-form-group margin-top">
				<view class="title">
					<text class="cuIcon-friendfill"></text>
				</view>
				<input name="username" value="张三丰" class="text-right" placeholder="请输入姓名"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">
					<text class="cuIcon-mobilefill"></text>
				</view>
				<input name="phone" value="13988885555" class="text-right" placeholder="请输入电话"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">
					<text class="cuIcon-locationfill"></text>
				</view>
				<picker :range="regionArr" @change="handleRegion">
					<view class="picker">
						{{regionIdx==-1?'请选择区域':regionArr[regionIdx]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">
					<text class="cuIcon-locationfill"></text>
				</view>
				<input name="detail" value="大西洋国际" class="text-right" placeholder="请输入详细地址"></input>
			</view>
			<view class="padding">
				<button form-type="submit" class="cu-btn bg-brown block">
					确定
				</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				regionArr:[
					'渝中区',
					'渝北区',
					'九龙坡区'
				],
				regionIdx:-1
			}
		},
		computed: {
			...mapState({
				userInfo:state=>state.user.userInfo
			})
		},
		methods: {
			handleRegion(ev){
				console.log(ev);
				let {value} = ev.detail
				this.regionIdx = value
			},
			handleSubmit(ev){
				// console.log(ev);
				let {value} = ev.detail
				let {regionArr,regionIdx} = this
				value.city = '重庆市'
				value.region = regionArr[regionIdx]
				value.isdefault = false
				value.userid = this.userInfo.objectId
				// console.log(value);
				this.$store.dispatch('address/addressAddAct',value)
				
			}
		}
	}
</script>

<style lang="scss">
.map{
	height: 400upx;
	width: 100%;
}
</style>
