import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'


Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        token:null,
        user:undefined
    },
    mutations:{
        [types.LOGIN]:(state,data) => {
            localStorage.token = data;
            state.token = data;
        },
        [types.LOGOUT]:(state) => {
            localStorage.removeItem('token');
            state.token = null;
        },
        [types.USER]:(state,data) => {
            localStorage.getItem('user') && localStorage.removeItem('user');
            localStorage.user = JSON.stringify(data);
            state.user = data
        }
        
    }
})