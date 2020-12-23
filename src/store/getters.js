const getters = {
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  errorLogs: (state) => state.errorLog.logs,
  token: (state) => state.user.token, // token
  username: (state) => state.user.username, // 用户名
  realname: (state) => state.user.realname, // 用户真实姓名
  roles: (state) => state.user.roles, // 角色列表
  menus: (state) => state.user.menus, // 菜单权限列表
  permissions: (state) => state.user.permissions, // 按钮权限列表
  permission_routes: (state) => state.permission.routes, // 递归得到的所有权限路由列表，包含constantRoutes
  addRoutes: (state) => state.permission.addRoutes // 递归得到asyncRoutes里的权限路由列表，不包含constantRoutes
}
export default getters
