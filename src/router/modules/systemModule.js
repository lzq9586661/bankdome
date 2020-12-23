import Layout from '@/layout'

const systemModuleRouter = {
  path: '/systemModule',
  component: Layout,
  redirect: 'noRedirect',
  name: 'SystemModule',
  menus: 'systemModule',
  meta: {
    title: '系统管理',
    icon: 'system'
  },
  children: [
    {
      path: 'resourceManage',
      component: () => import('@/views/systemModule/ResourceManage'),
      name: 'ResourceManage',
      menus: 'resourceManage',
      meta: { title: '菜单管理' },
      hidden: false
    },
    {
      path: 'roleManage',
      component: () => import('@/views/systemModule/RoleManage'),
      name: 'RoleManage',
      menus: 'roleManage',
      meta: { title: '角色管理' }
    },
    {
      path: 'userManage',
      component: () => import('@/views/systemModule/UserManage'),
      name: 'UserManage',
      menus: 'userManage',
      meta: { title: '用户管理' }
    },
    {
      path: 'departManage',
      component: () => import('@/views/systemModule/DepartManage'),
      name: 'DepartManage',
      menus: 'departManage',
      meta: { title: '部门管理' }
    },
    {
      path: 'noticeManage',
      component: () => import('@/views/systemModule/NoticeManage'),
      name: 'NoticeManage',
      menus: 'noticeManage',
      meta: { title: '通告管理' }
    },
    {
      path: 'dictionaryManage',
      component: () => import('@/views/systemModule/DictionaryManage'),
      name: 'DictionaryManage',
      menus: 'dictionaryManage',
      meta: { title: '字典管理' }
    },
    {
      path: 'templateManage',
      component: () => import('@/views/systemModule/TemplateManage'),
      name: 'TemplateManage',
      menus: 'templateManage',
      meta: { title: '模板管理' }
    },
    {
      path: 'logManage',
      component: () => import('@/views/systemModule/LogManage'),
      name: 'LogManage',
      menus: 'logManage',
      meta: { title: '日志管理' }
    }
  ]
}

export default systemModuleRouter
