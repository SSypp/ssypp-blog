<template>
  <div>
    <el-breadcrumb separator="/" style="margin-top:10px" >
      <el-breadcrumb-item :to="{ path: '/' }">文章列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{content.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="wrap">
      <header style="border-bottom: 1px solid #000;">
          <el-row style="margin-bottom:10px">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <h3>{{content.title}}</h3>
              </el-col>
          </el-row>
          <el-row class="header">
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"> <i class="el-icon-s-order"></i>{{content.title}}</el-col>
              <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8"><i class="el-icon-message-solid"></i>{{content.createdAt}}</el-col>
              <el-col :xs="4" :sm="4" :md="8" :lg="8" :xl="8"><i class="el-icon-s-flag"></i>{{content.category.name}}</el-col>
          </el-row>
      </header>
      <div class="content" v-html="content.content"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "detail",
  data() {
    return {
        content:{}
    };
  },
  mounted() {
      this.handleGetContent(this.currentId)
  },
  methods:{
      async handleGetContent(id){
         const res = await this.$get(`api/posts/${id}`);
         if(res.code !== 200) {
             this.$message({
                type: "warning",
                message: res.message
             })
             return
         }
         this.content = res.result;
      }
  },
  computed: {
    currentId: function() {
      return this.$route.params.id;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/comm/comm.scss";
.wrap {
  background: #fff;
  box-shadow: 0 0 4px #ccc;
  padding: 10px;
  box-sizing: border-box;
  margin:20px 0;
  .content{
      padding:15px 0;
      box-sizing: border-box;
  }
  .header{
      font-size: 10px;
      color: $bgGloaleColor;
      opacity: 0.8;
      margin-bottom: 20px;
      i{
          margin-right: 5px;
      }

  }
}
</style>
