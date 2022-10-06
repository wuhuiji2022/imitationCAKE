<template>
	<view class="cu-bar bg-white">
		<view class="action">
			<text class="cuIcon-locationfill text-gray"></text> 
			重庆
		</view>
		<view class="content text-bold">
			MCAKE
		</view>
		<view class="action text-grey">
			<text class="cuIcon-search"></text>
			<u-line direction="col" length="15" margin="20upx"></u-line>
			<text class="cuIcon-sort"></text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"nav-custom",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.cu-bar{
	position: fixed !important;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 2;
}
</style>
