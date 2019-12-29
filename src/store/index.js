import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store;

// const state = {
//     isLogin: true,
//     name: 'lj'
// };
// const getters = {
//     isShow(state) {
//         return state.isLogin
//     },
//     getMyName(state) {
//         // window.console.log(state)
//         return state.name
//     }
// };
// const mutations = {
//     show(state){
//         state.isLogin = true;
//     },
//     hide(state){
//         state.isLogin = false;
//     },
//     newName(state, newName){
//         state.name +=newName
//     }
// };
// const actions = {
//     showFooter(context){
//         context.commit('show')
//     },
//     hideFooter(context){
//         context.commit('hide')
//     },
//     setNewName(context, newName){
//         context.commit('newName', newName);
//     }
// };
// this.$store.commit('newName','li');
// this.$store.dispatch('setNewName','yue');
