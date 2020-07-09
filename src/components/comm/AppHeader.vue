<template>
  <div class="wrap">
    <div class="nav">
      <el-row style="flex" justify="space-between">
        <el-col class="logo" :xs="3" :sm="4" :md="0" :lg="0" :xl="0">
          <el-dropdown trigger="click" @command="handleCommand">
            <el-button plain size="medium" icon="el-icon-menu"></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :icon="item.icon"
                :command="item.name"
                v-for="item of navItem"
                :key="item.name"
                >{{ item.name }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col class="menu" :xs="18" :sm="16" :md="16" :lg="16" :xl="16">
          <div class="menu-list" v-show="isShowMune">
            <ul>
              <li
                :class="{ 'li-active': currentIndex == index + 1 }"
                v-for="(item, index) of navItem"
                :key="item.name"
                @click="handleSelect(index, item)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div v-show="!isShowMune" class="title">
            轻博客-{{ userName.nick_name }}
          </div>
        </el-col>
        <el-col class="user" :xs="3" :sm="4" :md="6" :lg="6" :xl="6">
          <el-dropdown trigger="click" @command="handleCommand1">
            <el-avatar size="medium" :src="circleUrl"></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-s-custom" command="name">{{
                userName.nick_name
              }}</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" command="logout"
                >退出</el-dropdown-item
              >
              <el-dropdown-item icon="el-icon-circle-plus" command="dev">
                开发中</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import store from "@/store/store";
import * as types from "@/store/types";
export default {
  name: "appheader",
  data() {
    return {
      screenWidth: document.body.clientWidth,
      timer: false,
      selectItem: 0,
      circleUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      navItem: [
        {
          name: "文章",
          path: "/article",
          icon: "el-icon-reading"
        },
        {
          name: "分类",
          path: "/categories",
          icon: "el-icon-price-tag"
        },
        {
          name: "用户",
          path: "/user",
          icon: "el-icon-unlock"
        }
      ]
    };
  },
  mounted() {
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth;
    };
  },
  methods: {
    //切换item
    handleSelect(index, item) {
      window.localStorage.removeItem("nav_index");
      window.localStorage.setItem("nav_index",index + 1);
      this.selectItem = index + 1;
      this.$router.push({ path: item.path });
    },
    handleCommand(command) {
      switch (command) {
        case "文章":
          this.$router.push({ path: "/article" });
          break;
        case "分类":
          this.$router.push({ path: "/categories" });
          break;
        case "用户":
          this.$router.push({ path: "/user" });
          break;
        default:
          break;
      }
    },
    handleCommand1(command) {
      switch (command) {
        case "name":
          this.$router.push({ path: "/user" });
          break;
        case "logout":
          this.handleLogout();
          break;
        case "dev":
          this.$alert("更多功能正在开发中...", "开发中", {
            confirmButtonText: "确定",
            callback: action => {
              this.$message({
                type: "info",
                message: `请耐心等待,感谢您的使用`
              });
            }
          });
          break;
        default:
          break;
      }
    },
    // 退出
    handleLogout() {
      store.commit(types.LOGOUT);
      console.log(this.$router.currentRoute);
      this.$router.currentRoute.path !== "login" &&
      this.$router.replace({path:"/login",query:{redirect:this.$router.currentRoute.fullPath}});
      this.$message({
        message: "退出成功！",
        type: "success"
      });
    }
  },
  computed: {
    isShowMune: function() {
      return this.screenWidth >= 768 ? true : false;
    },
    userName: function() {
      return store.state.user || JSON.parse(localStorage.getItem("user"));
    },
    currentIndex:function(){
      let index = this.selectItem || window.localStorage.getItem("nav_index");
      return index
    }
  },
  watch: {
    screenWidth(newValue) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = newValue;
        this.timer = true;
        setTimeout(() => {
          this.timer = false;
        }, 400);
      }
    },
    // selectItem(newValue,oldValue){
    //   console.log(newValue,oldValue)
    //   this.selectItem = parseInt(window.localStorage.getItem("nav_index"));
    //   console.log("watch",this.selectItem)
    // }

  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/comm/comm.scss";
.wrap {
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin-bottom: 8px;
  box-shadow: 0 0 8px #ccc;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  .nav {
    max-width: 1000px;
    height: 100%;
    margin: 0 auto;
    .logo {
      padding: 0 4px;
      box-sizing: border-box;
    }
    .menu {
      .menu-list {
        ul,
        li {
          list-style: none;
        }
        ul {
          display: flex;
        }
        li {
          width: 140px;
          text-align: center;
          font-size: 18px;
          font-weight: 500;
          cursor: pointer;
        }
        .li-active {
          position: relative;
          top: -3px;
          left: 0;
          border-bottom: 3px solid $bgGloaleColor;
        }
      }
    }
    .title {
      color: $bgGloaleColor;
      text-align: center;
    }
    .user {
      //   background-color: darkgoldenrod;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 12px;
      padding: 0 4px;
      box-sizing: border-box;
    }
  }
}
</style>
