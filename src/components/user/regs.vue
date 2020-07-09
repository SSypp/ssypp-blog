<template>
  <div class="wrap">
    <el-card class="box-card">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-row class="login-title">注册</el-row>
        <el-form-item prop="NickName">
          <el-input
            maxlength="20"
            size="large"
            placeholder="请输入用户名"
            v-model="ruleForm.NickName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="PhoneNumber">
          <el-input
            maxlength="20"
            size="large"
            placeholder="请输入手机号"
            v-model="ruleForm.PhoneNumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="PassWord">
          <el-input
            size="large"
            placeholder="请输入密码，最少6位，至少1个大写，1个小写"
            type="password"
            v-model="ruleForm.PassWord"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            @click="submitForm('ruleForm')"
            >注册并登录</el-button
          >
        </el-form-item>
      </el-form>
      <el-row>
        <el-col class="res"
            
          ><el-link @click="handleGoLogin()" class="res-link" type="primary"
            >已有账号登录</el-link
          ></el-col
        >
      </el-row>
      <el-row class="xieyi">
        注册登录即表示同意用户协议、隐私政策
      </el-row>
      <app-footer/>
    </el-card>
  </div>
</template>
<script>
import store from "@/store/store";
import * as types from "@/store/types"
import footer from "@/components/comm/AppFooter"
export default {
  components:{
    AppFooter:footer
  },
  data() {
    var validateUserName = (rule,value,callback) => {
        if(value === ""){
            callback(new Error("请输入用户名"));
        }else{
            callback()
        }
    }  
    var validatePhoneNumber = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        let reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入有效的手机号"));
        }
      }
    };
    var validatePassWord = (rule, value, callback) => {
      if (value === "") {
           callback(new Error("请输入密码"));
      } else {
        let reg = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])\S*$/;
        if(reg.test(value)){
            callback();
        }else{
           callback(new Error("最少6位，包括至少1个大写字母，1个小写字母")); 
        } 
      }
    };
    return {
      ruleForm: {
        NickName:"",
        PhoneNumber: "",
        PassWord: ""
      },
      rules: {
        NickName:[{validator:validateUserName,trigger:"blur"}],
        PhoneNumber: [{ validator: validatePhoneNumber, trigger: "blur" }],
        PassWord: [{ validator: validatePassWord, trigger: "blur" }]
      }
    };
  },
  methods: {
     submitForm(formName) {
      this.$refs[formName].validate( async valid => {
        if (valid) {
         const res = await this.$post('api/auth/register',this.ruleForm);
         if(res.code === 200){
            store.commit(types.LOGIN,res.result.token)
            store.commit(types.USER,res.result.user)
            this.ruleForm.NickName = ""
            this.ruleForm.PhoneNumber = ""
            this.ruleForm.PassWord = ""
            this.$message({
                message: "注册成功！",
                type: "success"
            });
            this.$router.push({path:'/'})
         }else{
             this.$message.error(res.message);
         }
        } else {
          this.$message.error("检验不通过");
          return false;
        }
      });
    },
    handleGoLogin(){
        this.$router.push({path:"login"})
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/comm/comm.scss";
.wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $bgGloaleColor;
  .box-card {
    width: 400px;
    height: auto;
    overflow: hidden;
    .login-title {
      font-size: 28px;
      font-weight: 600;
      display: block;
      margin-bottom: 20px;
    }
    .login-btn {
      width: 100%;
      font-size: 20px;
      letter-spacing: 4px;
    }
  }
  .res {
    display: flex;
    align-items: center;
    font-size: 18px;
    justify-content: center;
    .res-link {
      font-size: 18px !important;
      text-align: center;
    }
  }
  .xieyi {
    margin-top: 20px;
    font-size: 18px;
  }
}
</style>
