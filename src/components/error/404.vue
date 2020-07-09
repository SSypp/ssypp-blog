<template>
    <div class="wrap">
        <el-row type="flex"  justify="center" align="middle">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="flex">
                <el-image 
                    :src="iamge_url"
                    :fit="cover"
                ></el-image>
                <span class="text">啊哦~你想找的内容离你而去了哦</span>
                <el-button @click="handleBackHome()" type="primary" icon="el-icon-back">返回首页</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            iamge_url:"https://wx2.sbimg.cn/2020/07/06/CkWEO.png",
            cover:'cover'
        }
    },
    methods:{
        handleBackHome(){
            this.$router.push({path:'/'})
        }
    }
    
}
</script>
<style lang="scss" scoped>
.flex{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-top:50px;
    .text{
        margin-top:20px;
        margin-bottom: 20px;
    }
}
</style>