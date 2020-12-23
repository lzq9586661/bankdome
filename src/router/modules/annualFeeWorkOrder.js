import Layout from '@/layout'

const annualFeeWorkOrderRouter = {
  path: '/annualFeeWorkOrder',
  component: Layout,
  redirect: 'noRedirect',
  name: 'annualFeeWorkOrder',
  // menus: 'annualFeeWorkOrder',
  meta: {
    title: '年费工单',
    icon: 'list'
  },
  children: [
    {
      path: 'StandardWorkOrder',
      component: () => import('@/views/annualFeeWorkOrder/StandardWorkOrder'),
      name: 'StandardWorkOrder',
      // menus: 'resourceManage',
      meta: { title: '年费标准工单' },
      hidden: false
    },
    {
      path: 'AnnualLaborSingleWorkOrder',
      component: () => import('@/views/annualFeeWorkOrder/AnnualLaborSingleWorkOrder'),
      name: 'AnnualLaborSingleWorkOrder',
      // menus: 'resourceManage',
      meta: { title: '年费人工单笔工单' },
      hidden: false
    },
    {
      path: 'AnnualFeeManualBatchWorkOrder',
      component: () => import('@/views/annualFeeWorkOrder/AnnualFeeManualBatchWorkOrder'),
      name: 'AnnualFeeManualBatchWorkOrder',
      // menus: 'resourceManage',
      meta: { title: '年费人工批量工单' },
      hidden: false
    }
  ]
}

export default annualFeeWorkOrderRouter
