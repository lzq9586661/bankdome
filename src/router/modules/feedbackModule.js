import Layout from '@/layout'

const feedbackModuleRouter = {
  path: '/feedbackModule',
  component: Layout,
  redirect: 'noRedirect',
  name: 'feedbackModule',
  // menus: 'feedbackModule',
  meta: {
    title: '反馈模块',
    icon: 'edit'
  },
  children: [
    {
      path: 'AnnualFeeSingleFeedback',
      component: () => import('@/views/feedbackModule/AnnualFeeSingleFeedback'),
      name: 'AnnualFeeSingleFeedback',
      // menus: 'resourceManage',
      meta: { title: '年费单笔反馈' },
      hidden: false
    },
    {
      path: 'AnnualFeeBatchFeedback',
      component: () => import('@/views/feedbackModule/AnnualFeeBatchFeedback'),
      name: 'AnnualFeeBatchFeedback',
      // menus: 'resourceManage',
      meta: { title: '年费批量反馈' },
      hidden: false
    },
    {
      path: 'InterestFeeSingleFeedback',
      component: () => import('@/views/feedbackModule/InterestFeeSingleFeedback'),
      name: 'InterestFeeSingleFeedback',
      // menus: 'resourceManage',
      meta: { title: '息费单笔反馈' },
      hidden: false
    },
    {
      path: 'BatchFeedbackOfInterestAndFee',
      component: () => import('@/views/feedbackModule/BatchFeedbackOfInterestAndFee'),
      name: 'BatchFeedbackOfInterestAndFee',
      // menus: 'resourceManage',
      meta: { title: '息费批量反馈' },
      hidden: false
    }
    // {
    //   path: 'IndividualApprovalOfInterestExpense',
    //   component: () => import('@/views/feedbackModule/IndividualApprovalOfInterestExpense'),
    //   name: 'IndividualApprovalOfInterestExpense',
    //   // menus: 'resourceManage',
    //   meta: { title: '息费人工单笔审批' },
    //   hidden: false
    // },
    // {
    //   path: 'BatchApprovalOfInterestAndExpense',
    //   component: () => import('@/views/feedbackModule/BatchApprovalOfInterestAndExpense'),
    //   name: 'BatchApprovalOfInterestAndExpense',
    //   // menus: 'resourceManage',
    //   meta: { title: '息费人工批量审批' },
    //   hidden: false
    // },
    // {
    //   path: 'AnnualLimitReview',
    //   component: () => import('@/views/feedbackModule/AnnualLimitReview'),
    //   name: 'AnnualLimitReview',
    //   // menus: 'resourceManage',
    //   meta: { title: '年度限额复核' },
    //   hidden: false
    // }
  ]
}

export default feedbackModuleRouter
