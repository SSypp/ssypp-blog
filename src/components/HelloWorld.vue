<template>
  <div class="hello">
    <keep-alive><app-header></app-header></keep-alive>
    
    <router-view class="router" />
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "@/components/comm/AppHeader"
import AppFooter from "@/components/comm/AppFooter"
export default {
  name: 'HelloWorld',
  components:{
    AppHeader,
    AppFooter
  },
  data () {
    return {
     
    }
  }
}
</script>
<style scoped lang="scss">
.router{
  max-width: 1000px;
  margin: 68px auto 0;
  padding:5px;
  box-sizing: border-box;
}
</style>
