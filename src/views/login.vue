<template>
<div class="login-container">
    <van-nav-bar
      title="登录"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="用户名"
        placeholder="用户名"
        left-icon="manager-o"
        :rules="[{ required: true, message: '' }]"
      >
      </van-field>
      <van-field
        v-model="user.code"
        type="password"
        name="密码"
        placeholder="请输入验证码"
        left-icon="eye-o"
        :rules="[{ required: true, message: '' }]"
      >
        <template #button>
          <van-button round size="small" type="default">发送验证码</van-button>
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
import { login } from '@/api/user'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      const users = this.user
      try {
        const res = await login(users)
        console.log('登陆成功', res)
      } catch (err) {
        console.log('登陆成功', err)
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
