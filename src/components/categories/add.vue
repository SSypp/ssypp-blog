<template>
  <div class="wrap">
    <div class="btn">
      <el-button
        @click="handleShowInput"
        style="margin-right:10px"
        round
        icon="el-icon-circle-plus-outline"
        >新建分类</el-button
      >
      <el-input
        v-if="isShowInput"
        placeholder="请输入内容"
        v-model="input_kind"
        clearable
        style="width:200px"
        @blur="handleAddItem(input_kind)"
        @change="handleAddItem(input_kind)"
      >
      </el-input>
    </div>
    <div class="kind-list">
      <el-button
        style="margin:5px"
        size="small"
        type="primary"
        v-for="item of kind_list"
        :key="item.id"
        >{{ item.name }}</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "add",
  data() {
    return {
      input_kind: "",
      isShowInput: false,
      kind_list: []
    };
  },
  mounted() {
    this.handleGetKindList();
  },
  methods: {
    handleShowInput() {
      this.isShowInput = !this.isShowInput;
    },
    async handleGetKindList() {
      if (!window.localStorage.getItem("kindlist")) {
        let code = 0;
        const kindList = [];
        let i = 1;
        let count = 0
        while (code !== 422) {
          const res = await this.$get(`api/categories/${i}`);
          if (res.code !== 200) {
            i++;
            if(count <= 5 ){
                count++;
                continue;
            }else{
                break
            }
          }
          kindList.push(res.result);
          code = res.code;
          i++;
        }
        kindList.forEach((item)=>{
            item.isShow = false
        })
        window.localStorage.setItem("kindlist", JSON.stringify(kindList));
        this.kind_list = kindList;
      } else {
        this.kind_list = JSON.parse(window.localStorage.getItem("kindlist"));
      }
    },
    async handleAddItem(name) {
      if (name) {
        if (name.indexOf(" ") === 0) {
          return;
        }
        const form_name = {
          Name: name
        };
        const res = await this.$post("api/categories/create", form_name);
        if (res.code === 200) {
          window.localStorage.removeItem("kindlist");
          //   this.kind_list.push(res.result);
          this.handleGetKindList();
          this.input_kind = "";
          this.isShowInput = false;
        }
      }
    }
  }
};
</script>
<style lang="scss">
.wrap {
  padding: 0 10px;
  box-sizing: border-box;
  .btn {
    display: flex;
    margin: 10px 0 0;
  }
  .kind-list {
    display: flex;
    padding: 10px 6px;
    box-sizing: border-box;
    flex-wrap: wrap;
    //   width: 500px;
    height: auto;
  }
}
</style>
