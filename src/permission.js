import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import { handleErr } from '@/utils/tools' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/thirdPartyLogin'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (whiteList.indexOf(to.path) !== -1) {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        store
          .dispatch('GetInfo')
          .then((res) => {
            // 拉取user_info
            const userPermission = res.result.userPermission
            if (!res.result.userPermission.rolesList.length) {
              return false
            } else {
              store.dispatch('GenerateRoutes', { userPermission }).then(() => {
                router.addRoutes(store.getters.addRoutes) // 动态添加可访问路由表
                next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              })
            }
          })
          .catch((err) => {
            handleErr(err)
            store.dispatch('FedLogOut').then(() => {
              if (process.env.NODE_ENV === 'development') {
                next(`/login`)
              } else {
                next(`/login`)
              }
              NProgress.done()
            })
          })
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      if (process.env.NODE_ENV === 'development') {
        next(`/login`)
      } else {
        next(`/login`)
      }
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
