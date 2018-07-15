import Vue from 'vue'
import Vuex from 'vuex'
import product_data from '@/mock/product.js'

Vue.use(Vuex);

// console.log(product_data)

const VuexConfig = {
    state:{
        // 商品数据列表
        productList:[],
        // 购物车数据列表
        cartList:[]
    },
    getters:{},
    mutations:{
        addCart(state,id){

        },
        setProductList(state,data){
            state.productList = data
        }
    },
    actions:{
        // 请求商品列表
        getProductList(context){
            // mock请求并返回数据
            setTimeout(() => {
                context.commit('setProductList',product_data)
            }, 500);
        }
    }
}


export default new Vuex.Store(VuexConfig)
