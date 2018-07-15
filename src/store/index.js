import Vue from 'vue'
import Vuex from 'vuex'
import product_data from '@/mock/product.js'
import getFilterArray from '@/utils'

Vue.use(Vuex);


const VuexConfig = {
    state:{
        // 商品数据列表
        productList:[],
        // 购物车数据列表
        cartList:[]
    },
    getters:{
        brands:state=>{
            const brands = state.productList.map(item=>item.brand)
            return getFilterArray(brands)
        },
        colors:state=>{
            const colors = state.productList.map(item=>item.color)
            return getFilterArray(colors)
        }
    },
    mutations:{
        addCart(state,id){
            const isAdded = state.cartList.find(item=>item.id === id);
            if(isAdded){
                isAdded.count++;
            }else{
                state.cartList.push({
                    id:id,
                    count:1
                })
            }
        },
        setProductList(state,data){
            state.productList = data
        },
        editCarCount(state,payload){
             const product = state.cartList.find(item=>item.id===payload.id);
                   product.count +=payload.count;
        },
        deleteCart(state,id){
             const index = state.cartList.findIndex(item=>item.id===id);
                   state.cartList.splice(index,1) 
        },
        emptyCart(state){
            state.cartList = [];
        }
    },
    actions:{
        // 请求商品列表
        getProductList(context){
            // mock请求并返回数据
            setTimeout(() => {
                context.commit('setProductList',product_data)
            }, 500);
        },
        buy(context){
            return new Promise((resolve)=>{
                setTimeout(() => {
                     context.commit('emptyCart');
                     resolve()   
                }, 500);
            })
        }
    }
}


export default new Vuex.Store(VuexConfig)
