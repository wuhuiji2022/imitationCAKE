import {$post} from '../utils/request.js'
import store from './index.js'
export default {
	namespaced:true, //开启命名空间后，访问所有属性都需要带模块名
	state(){
		return {
			userInfo:null
		}
	},
	mutations:{
		initInfo(state,info){
			state.userInfo = info
		}
	},
	actions:{
		userLoginAct(context,info){
			$post('/1.1/login',info).then(res=>{
				console.log(res);
				let {code} = res
				if(code){
					let title = code === 211 ? '账号不存在' : '密码错误'
					uni.showToast({
						title,
						icon:'none'
					})
					return
				}
				context.commit('initInfo',res)
				store.dispatch('address/addressInitAct',res.objectId)
				uni.setStorage({
					key:'userInfo',
					data:res
				})
				uni.navigateBack({
					delta:1
				})
			})
		}
	}
}