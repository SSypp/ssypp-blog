<template>
  <div class="wrap">
    <el-card class="box-card">
      <el-row>
        <el-col
          style="border-bottom: 1px solid #ccc;"
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
          :xl="12"
          class="dis-flex"
        >
          <el-avatar
            :size="65"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
          <div class="userinfo">
            <p>昵称:{{ user.nick_name }}</p>
            <p>联系方式:{{ user.phone_number }}</p>
            <p>注册时间:{{ user.createdAt }}</p>
          </div>
          <div class="avatar">
            <el-tooltip
              style="margin:0 10px"
               v-for="item of phones"
               :key="item.name"
              effect="dark"
              :content="item.number"
              placement="top-start"
            >
              <el-avatar :icon="item.icon" @click="handlePhone(item)"></el-avatar>
            </el-tooltip>
            
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="dis-flex">
          <p>一个在前行路上不断填坑的小伙子</p>
          <p style="margin:10px 0">个人标签</p>
          <div class="skill">
            <el-tag
              style="margin:5px"
              v-for="item in items"
              :key="item.id"
              effect="dark"
            >
              {{ item.name }}
            </el-tag>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import store from "@/store/store";
export default {
  name: "status",
  data() {
    return {
      phones: [
        {
          name: "QQ",
          icon: "el-icon-user-solid",
          number: "2435884205"
        },
        {
          name: "微信",
          icon: "el-icon-s-help",
          number: "2435884205"
        },
        {
          name: "手机",
          icon: "el-icon-phone",
          number: "15070634344"
        }
      ]
    };
  },
  methods:{
      handlePhone(item){
          switch (item.name) {
              case "QQ":
                  break;
              case "微信":
                  break;
               case "手机":
                   console.log(item.number);
                   window.location.href = `tel:${item.number}`;
                   break;
              default:
                  break;
          }
      }
  },
  computed: {
    user: function() {
      const userinfo =
        store.state.user || JSON.parse(window.localStorage.getItem("user"));
      return userinfo;
    },
    items: function() {
      const skills = JSON.parse(window.localStorage.getItem("kindlist")) || [
        { id: "1", name: "vue" },
        { id: 2, name: "es6" },
        { id: 3, name: "小程序" },
        { id: 4, name: "app" }
      ];
      return skills;
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.dis-flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  box-sizing: border-box;
  .avatar{
      display: flex;

  }
  .userinfo {
    padding: 10px;
    box-sizing: border-box;
    p {
      margin: 5px 0;
    }
  }
  .skill {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
