<template>
	<view>
		<view class="my-fixed flex justify-center bg-fff padding-sm">
			<view v-for="(item,index) in tabArr" :key="index" @click="handleTab(item)" class="flex justify-around align-center padding-tb-sm">
				<view class="">{{item.name}}</view>
				<view class="padding-lr" v-if="index<tabArr.length-1">
					<u-line  direction="col" length="15"></u-line>
				</view>
			</view>
		</view>
		<u-popup :show="show" mode="left"  @close="handleClose">
			<view class="pop-cont">
				<view v-for="(item,index) in cfylist" >
					<view @click="handleList(item,0)" class="padding-sm u-border-bottom">
						{{item.bname}}
						<view class="cu-tag round bg-yellow color-fff margin-left-xs">
							{{item.num}}
						</view>
					</view>
					<view v-if="index==0">
						<view 
							@tap="listShow=!listShow" 
							class="padding-sm"
							:class="{'u-border-bottom':!listShow}"
						>
							口味筛选
						</view>
						<u-cell-group v-if="listShow">
							<u-cell 
								v-for="(itm,idx) in item.list" 
								:title="itm.tname"
								:name="itm.tname"
								isLink
								@click="handleList(itm,1)"
							></u-cell>
						</u-cell-group>
						<view 
							@click="sceneShow=!sceneShow" 
							class="padding-sm"
							:class="{'u-border-bottom':!sceneShow}"
						>
							场景筛选
						</view>
						<u-cell-group v-if="sceneShow">
							<u-cell 
								v-for="(itm,idx) in item.scene" 
								:title="itm.tname" 
								isLink
								@click="handleList(itm,2)"
							></u-cell>
						</u-cell-group>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:"tab-custom",
		data() {
			return {
				tabArr:[
					{name:'分类',bcid:'',target:''},
					{name:'蛋糕',bcid:'1',target:'/sub_pages/cake/cake'},
					{name:'面包',bcid:'11',target:'/sub_pages/cake/cake'},
					{name:'小食',bcid:'6',target:'/sub_pages/cake/cake'},
					{name:'购物车',bcid:'',target:'/sub_pages/cart/cart'},
				],
				show:false,
				cfylist:[],
				listShow:false,
				sceneShow:false,
			};
		},
		created() {
			this.$get('/1.1/classes/classify').then(res=>{
				console.log(res);
				this.cfylist = res.results
			})
		},
		methods: {
			handleTab(item){
				// console.log(1111);
				// uni.navigateTo({
				// 	url:'/sub_pages/cake/cake'
				// })
				let {bcid,target} = item
				// console.log(typeof bcid);
				if(bcid){  //商品列表数据更新
					// this.condition.bcid = Number(bcid)
					this.$store.commit('changeCondition',{
						bcid:Number(bcid)
					})
					uni.navigateTo({
						url:target
					})
				}
				if(!bcid&&!target){ //侧边分类
					this.show = true
				}
				if(!bcid&&target){
					uni.navigateTo({
						url:target
					})
				}
			},
			handleClose(){
				this.show = false
			},
			handleList({bid,tid},type){ //口味、场景筛选
				// console.log(typeof bid);
				// console.log(typeof tid);
				let obj = {bcid:bid}
				if(type===1){obj.fid=tid}
				if(type===2){obj.sid=tid}
				this.$store.commit('changeCondition',obj)
				this.show = false
				uni.navigateTo({
					url:'/sub_pages/cake/cake'
				})
			}
		},
	}
</script>

<style lang="scss">
.pop-cont{
	width: 400upx;
	margin-top: 200upx;
}
</style>
