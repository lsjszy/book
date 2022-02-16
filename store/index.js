import { createStore } from "vuex"

const store = createStore({
	state:{
		code:uni.getStorageSync("code")||[]
	},
	mutations:{
		addcode(state,payload){
			var isFind = false;
			state.code.map(item=>{
				if(item === payload.code){
					isFind = true;
				}
			})
			if(isFind === false){
				state.code.push(payload.code)
			}
			uni.setStorageSync("code",state.code)
		}
	}
})

export default store