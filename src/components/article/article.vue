<template>
<!-- :style="{'min-height':wrapHeight+'px'}" -->
    <div class="wrap" >
        <el-row>
            <el-col class="left" :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <ul>
                    <li :class="{'li-active':cur_index == index + 1}" v-for="(item,index) of kindList"
                        :key="item.name"
                        @click="hanldeSelect(index,item)"
                    >{{item.name}}</li>
                    
                </ul>
            </el-col>
            <el-col class="right" :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:"categories",
    data(){
        return{
            currentIndex:0,
            kindList:[
                {
                    name:"文章列表",
                    path:"/articlelist"
                },
                {
                    name:"新增文章",
                    path:"/addarticle"
                }
            ]
        }
    },
    methods:{
        hanldeSelect(index,item){
            window.localStorage.removeItem("cate_index");
            window.localStorage.setItem("cate_index",index+1);
            this.currentIndex = index + 1;
            this.$router.push({path:"/article" +item.path})
        }
    },
    computed:{
        cur_index:function(){
             let index = this.currentIndex || window.localStorage.getItem("cate_index");
             console.log(this.currentIndex,index);
             
             return index
        }
    },
    mounted(){
    },
}
</script>
<style lang="scss" scoped>
@import "@/assets/comm/comm.scss";
.wrap{
    .left{
        background-color: #fff;
        margin-top:10px;
        ul,li{
            list-style: none;
        }
        li{
            height: 40px;
            line-height: 40px;
            text-align: center;
        }
        .li-active{
            background-color: $bgGloaleColor;
            color: #fff;
        }
    }
    // .right{
    //     background-color: #fff;
    // }
}
</style>