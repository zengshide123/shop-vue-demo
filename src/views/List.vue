<template>
    <div v-show="list.length">
        <div class="list-control">
            <div class="list-control-filter">
                <span>品牌:</span>
                <span
                    class="list-control-filter-item"
                    :class="{on:item===filterBrands}"
                    @click="handleFilterBrand(item)"
                    v-for="(item,index) in brands"
                    :key="index"
                >
                    {{item}}
                </span>
            </div>
            <div class="list-control-filter">
                <span>颜色:</span>
                <span
                    class="list-control-filter-item"
                    :class="{on:item===filterColors}"
                    @click="handleFilterColors(item)"
                    v-for="(item,index) in colors"
                    :key="index"
                >
                    {{item}}
                </span>
            </div>
            <div class="list-control-order">
                <span>排序:</span>
                <span
                     class="list-control-order-item"
                    :class="{on:order===''}"
                    @click="handleOrderDefault"
                >
                    默认
                </span>
                <span
                     class="list-control-order-item"
                    :class="{on:order==='sales'}"
                    @click="handleOrderSales"
                >
                    销量
                    <template v-if="order==='sales'">↓</template>
                </span>
                <span
                     class="list-control-order-item"
                    :class="{on:order.indexOf('cost')>-1}"
                    @click="handleOrderCost"
                >
                    价格
                    <template v-if="order==='cost-asc'">↑</template>
                    <template v-if="order==='cost-desc'">↓</template>
                </span>
            </div>
        </div>
        <Product v-for="item in filteredAndOrderedList" :info="item" :key="item.id"/>
        <div class="product-not-found" v-show="!filteredAndOrderedList.length">暂无相关商品</div>
    </div>
</template>
<script>
 import Product from '@/components/Product'
export default {
    components:{
        Product
    },
    computed:{
        list(){
            return this.$store.state.productList
        },
        filteredAndOrderedList(){
            // 复制list
            let list = [...this.list];
            if(this.filterBrands){
                list = list.filter(item=>item.brand === this.filterBrands)
            }
            if(this.filterColors){
                list = list.filter(item=>item.color === this.filterColors)
            }
            if(this.order!==''){
                if(this.order === 'sales'){
                    list = list.sort((a,b)=>{
                      return  b.sales-a.sales
                    })
                }else if(this.order === 'cost-desc'){
                    list = list.sort((a,b)=>{
                       return b.cost-a.cost
                    })
                }else if(this.order==='cost-asc'){
                    list = list.sort((a,b)=>{
                        return a.cost-b.cost
                    })
                }
            }
            return list
        },
        brands(){
            return this.$store.getters.brands
        },
        colors(){
            return this.$store.getters.colors
        }
    },
    mounted(){
        this.$store.dispatch('getProductList')
    },
    data(){
        return {
            order:'',
            filterBrands:'',
            filterColors:''
        }
    },
    methods:{
        handleOrderDefault(){
            this.order = ''
        },
        handleOrderSales(){
            this.order = 'sales'
        },
        handleOrderCost(){
            this.order=this.order==='cost-desc'?'cost-asc':'cost-desc'
        },
        handleFilterBrand(brand){
            this.filterBrands = this.filterBrands===brand?'':brand
        },
        handleFilterColors(color){
            this.filterColors = this.filterColors===color?'':color
        }
    }
}
</script>
<style scoped>
    .product-not-found{
        text-align: center;
        padding: 32px;
    }
    .list-control{
        background: #fff;
        border-radius: 6px;
        margin: 16px;
        padding: 16px;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2)
    }
    .list-control-filter{
        margin-bottom: 16px;
    }
    .list-control-filter-item,
    .list-control-order-item{
        cursor: pointer;
        display: inline-block;
        border: 1px solid #e9eaec;
        border-radius: 4px;
        margin-right: 6px;
        padding: 2px 6px;
    }
    .list-control-filter-item.on,
    .list-control-order-item.on{
        background: #f2352e;
        border: 1px solid #f2352e;
        color: #fff;
    }
</style>


