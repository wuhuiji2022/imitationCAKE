import Vue from 'vue'
export default {
	namespaced:true,
	state() {
		return {
			cartList: [{
					id: "10090",
					twoId: 10089,
					name: "拿破仑莓恋",
					french: "Napoléon aux fraises",
					price: "218.00",
					img: "https://static.mcake.com/new_goods/napolunmeilian/N0201/list/1.jpg",
					list:[
						{id: 10090, sku: "n0201", ahead: "提前5小时预定", edible: "2-3人食", spec: "1磅", price: "218.00"},
						{id: 10091, sku: "n0202", ahead: "提前5小时预定", edible: "4-7人食", spec: "2磅", price: "318.00"},
						{id: 10092, sku: "n0203", ahead: "提前5小时预定", edible: "8-12人食", spec: "3磅", price: "458.00"},
						{id: 10093, sku: "n0205", ahead: "提前5小时预定", edible: "12-20人食", spec: "5磅", price: "750.00"}
					],
					ischeck:false,
					num:1, //商品数量
					idx:0 //标志选中的子商品信息
					
				},
				{
					id: "11547",
					twoId: 11540,
					name: "白色恋人",
					french: "Blanc Amant",
					price: "218.00",
					tid: 11,
					ischeck:true,
					num:2, //商品数量
					idx:0,  //标志选中的子商品信息
					tname: "限定",
					list:[
						{id: 10090, sku: "n0201", ahead: "提前5小时预定", edible: "2-3人食", spec: "1磅", price: "218.00"},
						{id: 10091, sku: "n0202", ahead: "提前5小时预定", edible: "4-7人食", spec: "2磅", price: "318.00"},
						{id: 10092, sku: "n0203", ahead: "提前5小时预定", edible: "8-12人食", spec: "3磅", price: "458.00"},
					],
					img: "https://static.mcake.com/new_goods/napolunmeilian/N0201/list/1.jpg"
				}
			]
		}
	},
	getters:{
		allInfo(state){ //统计信息
			let allCheck = true
			let allPrice = 0 //总价
			state.cartList.forEach(item=>{
				if(!item.ischeck){
					allCheck = false
				}
				if(item.ischeck){
					allPrice += item.list[item.idx].price * item.num
				}
			})
			return {allCheck,allPrice}
		}
	},
	mutations:{
		cartCheckMut(state,idx){ //单选
			state.cartList[idx].ischeck = !state.cartList[idx].ischeck
		},
		cartAllCheckMut(state,bool){ //全选，bool为原本的全选状态
			state.cartList.forEach(item=>{
				item.ischeck = !bool
			})
		},
		cartListCheckMut(state,{cartIdx,dropIdx,num}){ //子商品下拉确认处理
			state.cartList[cartIdx].idx = dropIdx
			state.cartList[cartIdx].num = num
		},
		cartAddMut(state,goodObj){  //新增商品
			console.log(goodObj);
			let {cartList} = state
			let len = cartList.length
			for(let i=0;i<len;i++){
				let {id,idx} = goodObj
				if(cartList[i].id==id&&cartList[i].idx==idx){ //购物车已经有相同商品
					state.cartList[i].num++
					return
				}
			}
			// 非响应式数据数据挂载
			// goodObj.ischeck = false
			// goodObj.num = 1
			// goodObj.idx = 0
			// 响应式数据挂载
			Vue.set(goodObj,'ischeck',true)
			Vue.set(goodObj,'num',1)
			// Vue.set(goodObj,'idx',0)
			state.cartList.push(goodObj) //新增新商品
		}
	}
}
