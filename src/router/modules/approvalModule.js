import Layout from '@/layout'

const approvalModuleRouter = {
  path: '/approvalModule',
  component: Layout,
  redirect: 'noRedirect',
  name: 'approvalModule',
  // menus: 'approvalModule',
  meta: {
    title: '审批模块',
    icon: 'form'
  },
  children: [
    {
      path: 'AutomaticCpprovalOfAnnualFeeSystem',
      component: () => import('@/views/approvalModule/AutomaticCpprovalOfAnnualFeeSystem'),
      name: 'AutomaticCpprovalOfAnnualFeeSystem',
      // menus: 'resourceManage',
      meta: { title: '年费系统自动审批' },
      hidden: false
    },
    {
      path: 'IndividualApprovalOfAnnualFee',
      component: () => import('@/views/approvalModule/IndividualApprovalOfAnnualFee'),
      name: 'IndividualApprovalOfAnnualFee',
      // menus: 'resourceManage',
      meta: { title: '年费人工单笔审批' },
      hidden: false
    },
    {
      path: 'AnnualFeeManualBatchApproval',
      component: () => import('@/views/approvalModule/AnnualFeeManualBatchApproval'),
      name: 'AnnualFeeManualBatchApproval',
      // menus: 'resourceManage',
      meta: { title: '年费人工批量审批' },
      hidden: false
    },
    {
      path: 'AutomaticApprovalOfInterestAndFee',
      component: () => import('@/views/approvalModule/AutomaticApprovalOfInterestAndFee'),
      name: 'AutomaticApprovalOfInterestAndFee',
      // menus: 'resourceManage',
      meta: { title: '息费系统自动审批' },
      hidden: false
    },
    {
      path: 'IndividualApprovalOfInterestExpense',
      component: () => import('@/views/approvalModule/IndividualApprovalOfInterestExpense'),
      name: 'IndividualApprovalOfInterestExpense',
      // menus: 'resourceManage',
      meta: { title: '息费人工单笔审批' },
      hidden: false
    },
    {
      path: 'BatchApprovalOfInterestAndExpense',
      component: () => import('@/views/approvalModule/BatchApprovalOfInterestAndExpense'),
      name: 'BatchApprovalOfInterestAndExpense',
      // menus: 'resourceManage',
      meta: { title: '息费人工批量审批' },
      hidden: false
    },
    {
      path: 'AnnualLimitReview',
      component: () => import('@/views/approvalModule/AnnualLimitReview'),
      name: 'AnnualLimitReview',
      // menus: 'resourceManage',
      meta: { title: '年度限额复核' },
      hidden: false
    }
  ]
}

export default approvalModuleRouter
