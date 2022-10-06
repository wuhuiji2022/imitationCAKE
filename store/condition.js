export default {
	state(){
		return {
			cond:{ //商品列表查询条件对象
				bcid:1
			},
		}
	},
	mutations:{
		changeCondition(state,obj){ //obj是新的条件对象
			state.cond = obj
		}
	}
}