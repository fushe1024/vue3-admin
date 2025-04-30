export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复bug
        'docs', // 文档变更
        'style', // 代码格式（不影响代码运行的变更）
        'refactor', // 重构（既不是新增功能，也不是修复bug）
        'perf', // 性能优化
        'test', // 测试用例变更
        'chore', // 其他改动（构建、依赖、工具等）
        'revert' // 回滚
      ]
    ],
    'subject-case': [0, 'never', []]
  }
}
