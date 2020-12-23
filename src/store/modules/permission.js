import { asyncRoutes, constantRoutes } from '@/router'
import { deepClone } from '@/utils/index'

/**
 * 通过route.menus判断是否与当前用户权限匹配
 * @param menus
 * @param route
 */
function hasPermission(menus, route) {
  // 路由是否有menus属性以及是否可见
  if (route.menus && !route.hidden) {
    /*
     * 如果这个路由有menu属性并且可见,就需要判断用户是否拥有此menu权限
     */
    return menus.indexOf(route.menus) > -1
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouteArr
 * @param menus
 */
function filterAsyncRouter(asyncRouteArr, menus) {
  const accessedRouters = asyncRouteArr.filter((route) => {
    // filter,js语法里数组的过滤筛选方法
    if (hasPermission(menus, route)) {
      if (route.children && route.children.length) {
        // 如果这个路由下面还有下一级的话,就递归调用
        route.children = filterAsyncRouter(route.children, menus)
        // 如果过滤一圈后,没有子元素了,这个父级菜单就也不显示了
        return route.children && route.children.length
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  GenerateRoutes({ commit }, data) {
    return new Promise((resolve) => {
      const menus = data.userPermission.menuList
      // 声明 该角色可用的路由
      let accessedRouters
      // 后台没有返回
      if (!menus.length) {
        accessedRouters = deepClone(asyncRoutes)
      } else {
        accessedRouters = filterAsyncRouter(deepClone(asyncRoutes), menus)
      }
      // 执行设置路由的方法
      commit('SET_ROUTES', accessedRouters)
      resolve()
    })
  }
}

export default {
  state,
  mutations,
  actions
}
