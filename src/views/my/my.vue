<template>
<div class="my-container">
  <div v-if="user" style="height: 200px; background-color: aqua;">
    <div>已经登录</div>
  </div>
  <div v-else style="height: 200px; background-color: aqua;">
    <van-button type="primary" @click="$router.push('/login')">登录|注册</van-button>
  </div>
  <van-button type="primary" v-if="user" @click="quit()">退出登录</van-button>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    quit () {
      this.$dialog.confirm({
        title: '确认退出吗？'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadUserInfo () {
      try {
        const { data: res } = await getUserInfo()
        console.log(res)
        this.userInfo = res.data
      } catch (e) {
        // TODO handle the exception
        this.$toast('获取用户信息失败')
      }
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>
</style>
