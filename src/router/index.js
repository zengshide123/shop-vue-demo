import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const Routers=[
    {
        path:'/list',
        meta:{
            title:'商品列表'
        },
        component: (resolve) => require(['@/views/List.vue'], resolve)
    },
    {
        path:'*',
        redirect:'/list'
    }
]
const RouterConfig = {
    mode:'history',
    routes:Routers
}
const router = new VueRouter(RouterConfig)

router.beforeEach((to,from,next)=>{
    window.document.title = to.meta.title;
    next()
})
router.afterEach((to,from,next)=>{
    window.scrollTo(0,0)
})
export default router