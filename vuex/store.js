import Vue from 'vue';
import Vuex from 'vuex';
// import { STATUS_CODES } from 'http';

Vue.use(Vuex);
// 状态
const state = {
    recomLx: "", //推荐路线id
    recomLxT: "", ////推荐路线标题
    wid: "", //作品id
    wtype: "", //作品类型
    idx: "" //tabbar下标
        // userId:null
}

// 过滤  加工
const getters = {
    // count:state=> state.count +=100
}


// 同步修改状态
const mutations = {
    // 设置推荐路线id
    setRecomLx(state, obj) {
        state.recomLx = obj
    },
    // 设置推荐路线标题
    setRecomLxT(state, obj) {
        state.recomLxT = obj
    },
    // 设置作品id
    setWid(state, obj) {
        state.wid = obj
    },
    // 设置作品类型
    setWtype(state, obj) {
        state.wtype = obj
    },
    // 设置bar下标
    setIdx(state, obj) {
        state.idx = obj
    },
    add(state) {
        state.count = true;
    }
    // add(state,n){
    //     state.count+=n;
    //     setTimeout(()=>{
    //         state.count--
    //     },3000)
    //     console.log("111");
    //     state.uu--;
    // },
    // reduce(state){
    //     state.count--;
    //     state.uu++;
    // },
    // step(state){
    //     state.count +=2;
    //     // state.uu +=3;
    // }
}

// 异步修改状态
const actions = {
    // addNum(context){
    //     context.commit('add',10)
    // },
    // addNum({commit}){
    //     commit('add',10)
    // }
    // ,
    // reduceNum({commit}){
    //     commit('reduce')
    // }
    // ,
    // stepNum({commit}){
    //     commit('step')
    // }
}

// // 模块组
// const moduleA={
//     state,
//     mutations
//     // getters,
//     // actions
// }



// export default new Vuex.Store({
//     modules:{a:moduleA}
// })

export default new Vuex.Store({
    state,
    mutations,
    //  getters,
    //  actions
})