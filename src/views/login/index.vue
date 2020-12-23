<template>
  <div class="login-container">
    <div class="title">后台管理系统</div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left" @submit.native.prevent>
      <div class="login-title">用户登录</div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="用户名" name="username" type="text" tabindex="-1" autocomplete="on" @keyup.enter.native="handleLogin" />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="大写已开启" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password1" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="-2"
            autocomplete="on"
            maxlength="18"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width: 100%; font-size: 20px" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入用户名！'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能少于6位！'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: process.env.NODE_ENV === 'production' ? '' : 'admin',
          password: process.env.NODE_ENV === 'production' ? '' : '1234567890'
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        passwordType: 'password',
        capsTooltip: false,
        loading: false,
        showDialog: false,
        redirect: undefined,
        otherQuery: {}
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true
      }
    },
    mounted() {
      if (this.loginForm.username === '') {
        this.$refs.username.focus()
      } else if (this.loginForm.password === '') {
        this.$refs.password.focus()
      }
    },
    methods: {
      checkCapslock(e) {
        const { key } = e
        this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$store
              .dispatch('Login', this.loginForm)
              .then(() => {
                this.$router.push({ path: '/dashboard' })
              })
              .catch((err) => {
                this.$handleErr(err)
              })
          } else {
            this.$message({
              message: '用户名或者密码输入错误',
              type: 'error',
              duration: 2000
            })
            return false
          }
        })
      },
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    position: relative;
    width: 100%;
    min-height: 100%;
    overflow: hidden;
    background: linear-gradient(#5dc7d2, #3658c5);
    .title {
      font-size: 48px;
      line-height: 300px;
      color: #fff;
      text-align: center;
      user-select: none;
    }
    .login-form {
      position: absolute;
      top: 56%;
      left: 50%;
      width: 500px;
      max-width: 70%;
      padding: 40px;
      margin: 0 auto;
      overflow: hidden;
      background: #fff;
      border-radius: 10px;
      transform: translate(-50%, -60%);
    }
    .login-title {
      margin-bottom: 22px;
      font-size: 26px;
      text-align: center;
    }
    >>> .el-input {
      display: inline-block;
      width: 85%;
      height: 47px;
      input {
        height: 47px;
        padding: 12px 5px 12px 15px;
        color: #000;
        background: transparent;
        border: 0;
        border-radius: 0;
        -webkit-appearance: none;
      }
    }
    >>> .el-form-item {
      color: #454545;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      &:hover,
      &.focusing {
        border: 1px solid #44d7b6;
      }
    }
    .svg-container {
      display: inline-block;
      width: 30px;
      padding: 6px 5px 6px 15px;
      color: #889aa4;
      vertical-align: middle;
    }
    .show-pwd {
      position: absolute;
      top: 7px;
      right: 10px;
      font-size: 16px;
      color: #889aa4;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
