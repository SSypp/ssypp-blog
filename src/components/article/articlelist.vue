<template>
  <div class="wrap">
    <el-card
      class="box-card"
      v-for="item in art_list"
      :key="item.id"
       @click.native="handleToDetail(item)"
    >
      <h2 style="margin-bottom:10px">{{ item.title }}</h2>
      <p>{{ item.title }}</p>
      <el-row class="row-footer">
        <el-col :xs="10" :sm="10" :md="8" :lg="8" :xl="8"
          ><span>发表:{{ item.createdAt }}</span></el-col
        >
        <el-col :xs="10" :sm="10" :md="8" :lg="8" :xl="8">
          <span>更新:{{ item.createdAt }}</span></el-col
        >
        <el-col :xs="4" :sm="4" :md="8" :lg="8" :xl="8"
          ><el-tag size="small">{{ item.category.name }}</el-tag></el-col
        >
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "articlelist",
  data() {
    return {
      art_list: []
    };
  },
  mounted() {
    this.handleGetList();
  },
  methods: {
    handleToDetail(item) {
        this.$router.push({name:'detail',params:{id:item.id}})
    },
    async handleGetList() {
      window.localStorage.removeItem("artlist");
      if (!window.localStorage.getItem("artlist")) {
        let code = 0;
        const artList = [];
        let i = 1;
        let count = 0;
        while (code !== 422) {
          const res = await this.$get(`api/posts/${i}`);
          if (res.code !== 200) {
            i++;
            if (count <= 5) {
              count++;
              continue;
            } else {
              break;
            }
          }
          artList.push(res.result);
          code = res.code;
          i++;
        }
        artList.forEach(item => {
          item.isShow = false;
        });
        window.localStorage.setItem("artlist", JSON.stringify(artList));
        this.art_list = artList.reverse();
      } else {
        this.art_list = JSON.parse(
          window.localStorage.getItem("artlist")
        ).reverse();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  padding: 10px;
  box-sizing: border-box;
}
>>> .el-card__body {
  padding: 10px !important;
}
.box-card {
  margin-bottom: 10px;
  padding: 5px;
  overflow-x: hidden;
  overflow-y: hidden;
  box-sizing: border-box;
  cursor: pointer;
  .row-footer {
    margin-top: 20px;
    span {
      font-size: 12px;
    }
  }
}
</style>
