<template>
  <div class="wrap">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-row class="login-title">文章分类:</el-row>
      <el-form-item prop="CategoryId">
        <el-radio-group v-model="ruleForm.CategoryId">
          <el-radio
            style="margin:5px"
            border
            :label="item.id"
            v-for="item of cateId"
            :key="item.id"
            >{{ item.name }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-row class="login-title">文章标题:</el-row>
      <el-form-item prop="Title">
        <el-input
          style="margin:5px"
          maxlength="20"
          size="large"
          placeholder="请输入标题"
          v-model="ruleForm.Title"
        ></el-input>
      </el-form-item>
      <app-edits ref="edits"></app-edits>
      <el-form-item class="flex">
        <el-button
          class="login-btn"
          type="primary"
          @click="handleSubmit('ruleForm')"
          >发表</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Edits from "@/components/comm/Edits";
export default {
  name: "addarticle",
  components: {
    AppEdits: Edits
  },
  mounted() {
    this.handleGetAllCateId();
  },
  methods: {
    handleGetAllCateId() {
      this.cateId = JSON.parse(window.localStorage.getItem("kindlist")) || [];
    },
    handleSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.ruleForm.Content = this.$refs.edits.content;
          const res = await this.$post("api/posts/create", this.ruleForm);
          if (res.code === 200) {
            this.ruleForm.CategoryId = "";
            this.ruleForm.Title = "";
            this.ruleForm.Content = "";
            this.$message({
              message: "发表成功！",
              type: "success"
            });
            this.$router.push({ path: "/" });
          } else {
            this.$message.error(res.message);
          }
        }else{
            return
        }
      });
    }
  },
  data() {
    var validateCategoryId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择分类"));
      }
      callback();
    };
    var validateTitle = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入标题"));
      } else {
        let index = value.indexOf(" ") === 0;
        if (!index) {
          callback();
        } else {
          callback(new Error("请不要以空格开头"));
        }
      }
    };
    return {
      cateId: [],
      ruleForm: {
        CategoryId: "",
        Title: "",
        Content: ""
      },
      rules: {
        CategoryId: [{ validator: validateCategoryId, trigger: "blur" }],
        Title: [{ validator: validateTitle, trigger: "blur" }]
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  margin: 10px 0;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  .flex{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top:10px;
  }
}
</style>
