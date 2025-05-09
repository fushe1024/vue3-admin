<script setup>
import { ref, defineProps } from 'vue'
import { userDetail } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { formatTime } from '@/utils/format'

// 接收路由数据
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

// 获取用户详情
const details = ref({})
const getUserDetail = async () => {
  const res = await userDetail(props.id)
  details.value = res
}
getUserDetail()

// 监听语言变化
watchSwitchLang(getUserDetail)

// 打印 loading
const printLoading = ref(false)
// 打印对象
const printObj = {
  id: 'user-info-box',
  popTitle: 'vue3-imooc-admin',
  // 打印前
  beforeOpenCallback() {
    printLoading.value = true
  },
  // 执行打印
  openCallback(vue) {
    printLoading.value = false
  }
}
</script>

<template>
  <div class="user-info-container">
    <div class="box-top">
      <el-card class="btns">
        <el-button type="primary" v-print="printObj" :loading="printLoading">
          {{ $t('userInfo.print') }}
        </el-button>
      </el-card>
    </div>
    <el-card>
      <div id="user-info-box" class="user-info-box">
        <h2 class="title">{{ $t('userInfo.title') }}</h2>
        <div class="header">
          <!-- 头部渲染表格 -->
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('userInfo.name')">
              {{ details?.username }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.sex')">
              {{ details?.gender }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.nation')">
              {{ details?.nationality }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.mobile')">
              {{ details?.mobile }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.province')">
              {{ details?.province }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.date')">
              {{ formatTime(details?.openTime) }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.remark')" :span="2">
              <el-tag
                class="remark"
                size="small"
                v-for="(item, index) in details?.remark"
                :key="index"
                >{{ item }}</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.address')" :span="2">
              {{ details?.address }}
            </el-descriptions-item>
          </el-descriptions>
          <!-- 头像渲染 -->
          <el-image
            class="avatar"
            :src="details?.avatar"
            :preview-src-list="[details?.avatar]"
          ></el-image>
        </div>
        <div class="body">
          <el-descriptions direction="vertical" :column="1" border>
            <el-descriptions-item :label="$t('userInfo.experience')">
              <ul>
                <li v-for="(item, index) in details?.experience" :key="index">
                  <span>
                    {{ formatTime(item.startTime, 'YYYY/MM') }}
                    ----
                    {{ formatTime(item.endTime, 'YYYY/MM') }}</span
                  >
                  <span>{{ item.title }}</span>
                  <span>{{ item.desc }}</span>
                </li>
              </ul>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.major')">
              {{ details?.major }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.glory')">
              {{ details?.glory }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="signature">{{ $t('userInfo.foot') }}</div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.user-info-container {
  // 顶部按钮
  .box-top {
    margin-bottom: 20px;
    .btns {
      display: flex;
      justify-content: end;
    }
  }

  // 用户信息卡片
  .user-info-box {
    width: 1024px;
    margin: 0 auto;

    .title {
      text-align: center;
      margin-bottom: 10px;
    }

    .header {
      display: flex;

      :deep(.el-descriptions) {
        flex-grow: 1;
      }
      .avatar {
        width: 187px;
        box-sizing: border-box;
        padding: 30px 20px;
        border: 1px solid #ebeef5;
        border-left: none;
      }
      .remark {
        margin-right: 12px;
      }
    }

    .body {
      ul {
        list-style: none;
        li {
          span {
            margin-right: 62px;
          }
        }
      }
    }

    // 签名
    .signature {
      margin-top: 20px;
      text-align: right;
    }
  }
}
</style>
