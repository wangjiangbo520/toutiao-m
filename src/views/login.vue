<template>
<div class="login-container">
    <van-nav-bar
      title="登录"
    />
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="用户名"
        placeholder="用户名"
        left-icon="manager-o"
        :rules="userRules.mobile"
      >
      </van-field>
      <van-field
        v-model="user.code"
        type="password"
        name="密码"
        placeholder="请输入验证码"
        left-icon="eye-o"
        :rules="userRules.code"
      >
        <template #button>
          <van-count-down v-if="isShow" :time="1000*60" format="ss s" @finish="isShow = false" />
          <van-button v-else native-type="button" size="small" type="default" @click="onSend">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      isShow: false,
      userRules: [{
        mobile: [{ required: true, message: '请输入手机号' }],
        code: [{ required: true, message: '请输入验证码' }]
      }]
    }
  },
  methods: {
    async onSubmit () {
      const users = this.user
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await login(users)
        console.log('登陆成功', res)
        this.$toast.success('登陆成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或者验证码错误')
        } else {
          this.$toast.fail('登陆失败，请稍后再试')
        }
      }
    },
    async onSend () {
      try {
        await this.$refs.loginForm.validate()
      } catch (err) {
        return console.log('验证失败', err)
      }
      this.isShow = true
      try {
        const { res } = await sendSms(this.user.mobile)
        this.$store.commit('setUser', res.data)
        this.$toast('发送成功', res)
      } catch (err) {
        this.isShow = false
        if (err.response.status === 429) {
          this.$toast.fail('操作频繁，请稍后再试')
        } else {
          this.$toast.fail('发送失败')
        }
      }
    }
  }
}
</script>

<style>
.van-nav-bar {
  height: 110px;
  background-color: blue;
}
.van-nav-bar__title {
  font-size: 30px;
  color:#fff;
}
</style>
