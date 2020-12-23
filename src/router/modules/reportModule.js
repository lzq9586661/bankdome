import Layout from '@/layout'

const reportModuleRouter = {
  path: '/reportModule',
  component: Layout,
  redirect: 'noRedirect',
  name: 'reportModule',
  // menus: 'reportModule',
  meta: {
    title: '报表模块',
    icon: 'table'
  },
  children: [
    {
      path: 'TaskSearch',
      component: () => import('@/views/reportModule/TaskSearch'),
      name: 'TaskSearch',
      // menus: 'resourceManage',
      meta: { title: '任务搜索' },
      hidden: false
    },
    {
      path: 'DataStatistics',
      component: () => import('@/views/reportModule/DataStatistics'),
      name: 'DataStatistics',
      // menus: 'resourceManage',
      meta: { title: '数据统计' },
      hidden: false
    },
    {
      path: 'ForeignNortReconciliation',
      component: () => import('@/views/reportModule/ForeignNortReconciliation'),
      name: 'ForeignNortReconciliation',
      // menus: 'resourceManage',
      meta: { title: '外埠对账' },
      hidden: false
    }
    // {
    //   path: 'AutomaticApprovalOfInterestAndFee',
    //   component: () => import('@/views/reportModule/AutomaticApprovalOfInterestAndFee'),
    //   name: 'AutomaticApprovalOfInterestAndFee',
    //   // menus: 'resourceManage',
    //   meta: { title: '息费系统自动审批' },
    //   hidden: false
    // },
    // {
    //   path: 'IndividualApprovalOfInterestExpense',
    //   component: () => import('@/views/reportModule/IndividualApprovalOfInterestExpense'),
    //   name: 'IndividualApprovalOfInterestExpense',
    //   // menus: 'resourceManage',
    //   meta: { title: '息费人工单笔审批' },
    //   hidden: false
    // },
    // {
    //   path: 'BatchApprovalOfInterestAndExpense',
    //   component: () => import('@/views/reportModule/BatchApprovalOfInterestAndExpense'),
    //   name: 'BatchApprovalOfInterestAndExpense',
    //   // menus: 'resourceManage',
    //   meta: { title: '息费人工批量审批' },
    //   hidden: false
    // },
    // {
    //   path: 'AnnualLimitReview',
    //   component: () => import('@/views/reportModule/AnnualLimitReview'),
    //   name: 'AnnualLimitReview',
    //   // menus: 'resourceManage',
    //   meta: { title: '年度限额复核' },
    //   hidden: false
    // }
  ]
}

export default reportModuleRouter
