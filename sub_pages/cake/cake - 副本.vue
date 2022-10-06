<template>
	<view>
		<view class="cont">
			<good-item v-for="(item,index) in glist" :gdata="item"></good-item>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				glist:[],
				page:0
			}
		},
		onLoad() {
			let url = `/1.1/classes/goods?where={"bcid":1}&limit=8&skip=0`
			this.$get(url).then(res=>{
				console.log(res);
				this.page++
				this.glist = res.results
			})
		},
		onReachBottom() {
			console.log('触底了');
			let skip = this.page * 8
			let url = `/1.1/classes/goods?where={"bcid":1}&limit=8&skip=${skip}`
			this.$get(url).then(res=>{
				let {results} = res
				if(results.length){
					this.page++
					this.glist = [
						...this.glist,
						...res.results
					]
					return
				}
				uni.showToast({
					title:'这回真没了',
					icon:'none'
				})
			})
		},
		methods: {
			handleDetail(idx){
				console.log(idx);
				uni.navigateTo({
					url:'../detail/detail?idx='+idx
				})
			}
		}
	}
</script>

<style lang="scss">
.cont{
	display: flex;
	flex-wrap: wrap;
	padding: 15upx;
	justify-content: space-between;
}
.cake-item{
	width: 350upx;
	.poster{
		height: 350upx;
		background-color: #f5f5f5;
	}
	.fs-28{
		margin-top: 24upx;
	}
	.fs-16{
		margin: 14upx 0;
	}
	.fs-18{
		margin-bottom: 22upx;
	}
}
</style>
