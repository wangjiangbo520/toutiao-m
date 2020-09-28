<template>
<div class="index-container">
  <!-- <van-nav-bar
    title="标题"
    left-text="返回"
    right-text="按钮"
    left-arrow
  /> -->
  <router-view />
  <van-tabbar v-model="active" router>
    <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="search" to="/ask">问答</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/video">视频</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="/my">{{ $store.state.user ? '我的' : '未登录' }}</van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 3
    }
  }
}
</script>

<style scoped lang="less">
</style>
