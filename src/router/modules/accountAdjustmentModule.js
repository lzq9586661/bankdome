import Layout from '@/layout'

const accountAdjustmentModuleRouter = {
  path: '/accountAdjustmentModule',
  component: Layout,
  redirect: 'noRedirect',
  name: 'accountAdjustmentModule',
  // menus: 'accountAdjustmentModule',
  meta: {
    title: '调账模块',
    icon: 'component'
  },
  children: [
    {
      path: 'AnnualFeeAdjustment',
      component: () => import('@/views/accountAdjustmentModule/AnnualFeeAdjustment'),
      name: 'AnnualFeeAdjustment',
      // menus: 'resourceManage',
      meta: { title: '年费单笔调账' },
      hidden: false
    },
    {
      path: 'BatchAdjustmentOfAnnualFee',
      component: () => import('@/views/accountAdjustmentModule/BatchAdjustmentOfAnnualFee'),
      name: 'BatchAdjustmentOfAnnualFee',
      // menus: 'resourceManage',
      meta: { title: '年费批量调账' },
      hidden: false
    },
    {
      path: 'InterestExpenseAdjustment',
      component: () => import('@/views/accountAdjustmentModule/InterestExpenseAdjustment'),
      name: 'InterestExpenseAdjustment',
      // menus: 'resourceManage',
      meta: { title: '息费单笔调账' },
      hidden: false
    },
    {
      path: 'BatchAdjustmentOfInterestAndExpense',
      component: () => import('@/views/accountAdjustmentModule/BatchAdjustmentOfInterestAndExpense'),
      name: 'BatchAdjustmentOfInterestAndExpense',
      // menus: 'resourceManage',
      meta: { title: '息费批量调账' },
      hidden: false
    }
  ]
}

export default accountAdjustmentModuleRouter
