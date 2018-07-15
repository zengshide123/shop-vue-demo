import Vue from 'vue'
import App from '@/App'
import './index.css'
import router from './router'
import store from './store'


new Vue({
    el:'#app',
    render:h=>{
        return h(App)
    },
    store,
    router
})