import Vue from "vue";
import Vuex from "vuex";
import router from '../router';

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token: localStorage.getItem("token"),
		authList: localStorage.getItem("authList") || "[]",
		userName: localStorage.getItem("userName") || "未知用户",
		timer:null
	},
	getters: {
		getToken(state) {
			if (!state.token) {
				return false;
			} else {
				return state.token;
			}
		},
		getAuthList(state) {
			return typeof (state.authList) == 'string' ? JSON.parse(state.authList) : state.authList;
		},
		getUserName(state) {
			return state.userName;
		}
	},
	mutations: {
		setToken(state, token) {
			if (!token) {
				localStorage.removeItem('token');
				localStorage.removeItem('authList');
				localStorage.removeItem('userName');
				state.token = undefined;
				state.authList = [];
				state.userName = '未知用户';
				router.replace({
					path: '/login'
				});
			} else {
				localStorage.setItem('token', token);
				state.token = token;
			}
		},
		setAuthList(state, authList) {
			localStorage.setItem('authList', JSON.stringify(authList));
			state.authList = authList;
		},
		setUserName(state, userName) {
			localStorage.setItem('userName', userName);
			state.userName = userName;
		}
	},
	actions: {
		setToken(ctx, token) {
			ctx.commit('setToken', token);
		},
		setAuthList(ctx, authList) {
			ctx.commit('setAuthList', authList);
		},
		setUserName(ctx, userName) {
			ctx.commit('setUserName', userName);
		}
	}
})

export default store
