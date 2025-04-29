<script setup>
import { ref, computed } from 'vue'
import LangSelect from '@/components/LangSelect/index.vue'
import { Avatar, Lock } from '@element-plus/icons-vue'
import { validatePassword } from './rules.js'
import { useStore } from 'vuex'

// 国际化
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 表单引用
const loginRef = ref(null)
// 登录表单数据
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
// 登录表单验证规则
const rules = ref({
  username: [
    {
      required: true,
      message: computed(() => t('login.usernameRule')),
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: computed(() => t('login.passwordRule1')),
      trigger: 'blur'
    },
    {
      validate: validatePassword(),
      trigger: 'blur'
    }
  ]
})

// 登录逻辑
const store = useStore()
const loading = ref(false)
const handleLogin = () => {
  loginRef.value.validate((valid) => {
    // 表单验证失败
    if (!valid) return

    // 开启 loading
    loading.value = true

    store
      .dispatch('user/login', loginForm.value)
      .then(() => {
        loading.value = false
      })
      .catch((err) => {
        // 登录失败提示
        console.error(err)
        loading.value = false
      })
  })
}
</script>

<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="loginRef"
      :model="loginForm"
      :rules="rules"
    >
      <!-- Title -->
      <div class="title-container">
        <div class="title">{{ $t('login.title') }}</div>
      </div>

      <!-- select -->
      <lang-select class="lang-select" effect="light" />

      <!-- username -->
      <el-form-item prop="username">
        <el-input
          :prefix-icon="Avatar"
          v-model="loginForm.username"
          placeholder="username"
          name="username"
          type="text"
        />
      </el-form-item>

      <!-- password -->
      <el-form-item prop="password">
        <el-input
          :prefix-icon="Lock"
          v-model="loginForm.password"
          placeholder="password"
          name="password"
          type="password"
          show-password
        />
      </el-form-item>

      <!-- Login Button -->
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%"
          @click="handleLogin"
          >{{ $t('login.loginBtn') }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

// 登录布局
.login-container {
  height: 100vh;
  background-color: $bg;
  overflow: hidden;
  display: flex;
  justify-content: center;

  .login-form {
    padding: 20px;
    margin-top: 20vh;
    width: 400px;
    max-height: 400px;
    overflow: hidden;
    position: relative;

    // 语言选择器
    .lang-select {
      position: absolute;
      padding: 2px;
      font-size: 24px;
      background-color: $light_gray;
      border-radius: 5px;
      top: 30px;
      right: 20px;
    }

    // 标题
    .title-container {
      margin-bottom: 30px;
      .title {
        font-size: 26px;
        color: $light_gray;
        text-align: center;
        font-weight: bold;
      }
    }

    // 输入框外部盒子
    :deep(.el-input .el-input__wrapper) {
      height: 47px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      box-shadow: none;

      // input元素
      .el-input__inner {
        color: $light_gray;
        caret-color: $cursor;
      }
    }
  }

  // 提示信息
  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
}
</style>
