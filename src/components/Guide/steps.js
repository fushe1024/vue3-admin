// 此处不要导入 @/i18n 使用 i18n.global ，因为我们在 router 中 layout 不是按需加载，所以会在 Guide 会在 I18n 初始化完成之前被直接调用。导致 i18n 为 undefined
const steps = ({ t }) => {
  return [
    {
      element: '#guide-start',
      popover: {
        title: t('guide.guideTitle'),
        description: t('guide.guideDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-hamburger',
      popover: {
        title: t('guide.hamburgerTitle'),
        description: t('guide.hamburgerDesc')
      }
    },
    {
      element: '#guide-breadcrumb',
      popover: {
        title: t('guide.breadcrumbTitle'),
        description: t('guide.breadcrumbDesc')
      }
    },
    {
      element: '#guide-search',
      popover: {
        title: t('guide.searchTitle'),
        description: t('guide.searchDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-full',
      popover: {
        title: t('guide.fullTitle'),
        description: t('guide.fullDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-theme',
      popover: {
        title: t('guide.themeTitle'),
        description: t('guide.themeDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-lang',
      popover: {
        title: t('guide.langTitle'),
        description: t('guide.langDesc'),
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-tags',
      popover: {
        title: t('guide.tagTitle'),
        description: t('guide.tagDesc')
      }
    },
    {
      element: '#guide-sidebar',
      popover: {
        title: t('guide.sidebarTitle'),
        description: t('guide.sidebarDesc'),
        position: 'right-center'
      }
    }
  ]
}

export default steps
