import {$post,$get} from '../utils/request.js'
export default {
	namespaced:true,
	state(){
		return {
			checkedIdx:-1,  //记录用户勾选的地址
			addressList:[
				// {
				// 	username:'张三丰',
				// 	phone:'13844445555',
				// 	city:'上海',
				// 	region:'黄浦区',
				// 	detail:'黄浦江畔',
				// 	isdefault:true
				// },
				// {
				// 	username:'无忌',
				// 	phone:'13844445555',
				// 	city:'上海',
				// 	region:'黄浦区',
				// 	detail:'黄浦江畔',
				// 	isdefault:false
				// },
				// {
				// 	username:'三丰',
				// 	phone:'13844445555',
				// 	city:'上海',
				// 	region:'黄浦区',
				// 	detail:'黄浦江畔',
				// 	isdefault:false
				// }
			]
		}
	},
	getters:{
		orderAddress(state){ //订单中的地址
			//根据checkedIdx与isdefault共同得到一个地址对象
			let {checkedIdx,addressList} = state
			if(checkedIdx!=-1){
				return addressList[checkedIdx]
			}
			let len = addressList.length
			for(let i=0;i<len;i++){
				if(addressList[i].isdefault){
					return addressList[i]
				}
			}
		}
	},
	mutations:{
		initCheckIdxMut(state){ //根据默认地址，设置勾选地址的下标
			state.addressList.forEach((item,i)=>{
				if(item.isdefault){
					state.checkedIdx = i
				}
			})
		},
		addressDefaultMut(state,idx){ //设为默认
			state.addressList.forEach((item,i)=>{
				if(i==idx){
					item.isdefault = true
				}else{
					item.isdefault = false
				}
			})
		},
		addressCheckMut(state,idx){ //选取新地址
			state.checkedIdx = idx
			uni.navigateBack({
				delta:1
			})
		},
		addressAddMut(state,addressObj){ //新增地址
			state.addressList.push(addressObj)
		},
		addressInitMut(state,addressArr){ //初始化地址列表
			state.addressList = addressArr
		}
	},
	actions:{
		addressAddAct(context,addressObj){
			$post('/1.1/classes/address',addressObj).then(({objectId})=>{
				// console.log(res);
				context.commit('addressAddMut',{
					...addressObj,
					objectId
				})
				uni.navigateBack({
					delta:1
				})
			})
		},
		addressInitAct(context,userid){
			let url = `/1.1/classes/address?where={"userid":"${userid}"}`
			$get(url).then(({results})=>{
				// console.log(results);
				context.commit('addressInitMut',results)
			})
		}
	}
}