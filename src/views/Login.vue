<template>
  <div class="login">
    <div class="container">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="demo-ruleForm"
      >
        <div class="avatar">
          <img
            src="../assets/logo.png"
            alt=""
          >
        </div>
        <el-form-item prop="username">
          <el-input
            prefix-icon="myicon myicon-user"
            v-model="loginForm.username"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="myicon myicon-key"
            type="password"
            v-model="loginForm.password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-button
          type="primary"
          class="login-btn"
          @click = 'login("loginForm")'
        >登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>

import {login} from '@/api/index.js'

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login (formname) {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          login(this.loginForm)
            .then((result) => {
              if (result.meta.status === 200) {
                localStorage.setItem('itcast_token', result.data.token)
                // console.log(result)
                this.$router.push({name: 'Home'})
              } else {
                this.$message.error('登录失败：用户名或密码有误')
                return false
              }
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
