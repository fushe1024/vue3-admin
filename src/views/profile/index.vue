<script setup></script>

<template>
  <div>{{ $t('login.title') }}</div>
  <el-pagination
    :page-sizes="[100, 200, 300, 400]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400"
  />
</template>

<style scoped lang="scss"></style>
