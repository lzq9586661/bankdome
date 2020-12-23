import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getUsername, setUsername, removeUsername, getRealName, setRealName, removeRealName } from '@/utils/auth'
import { resetRouter } from '@/router'
import { Message } from 'element-ui'

const state = {
  token: getToken(),
  username: getUsername(),
  realname: getRealName(),
  roles: [],
  menus: [],
  permissions: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_NAME: (state, username) => {
    state.username = username
  },
  SET_REAL_NAME: (state, realname) => {
    state.realname = realname
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  }
}

const actions = {
  // user login
  async Login({ commit }, data) {
    const [res, err] = await login(data)
      .then((res) => [res, null])
      .catch((err) => [null, err])
    if (err && err.response && err.response.statusText === 'Internal Server Error') {
      Message({ type: 'error', message: '服务连接失败！', duration: 2000 })
      return Promise.reject()
    }
    if (res && res.success) {
      const result = res.result
      commit('SET_TOKEN', result.token)
      commit('SET_USER_NAME', result.userInfo.username)
      commit('SET_REAL_NAME', result.userInfo.realname)
      setToken(result.token)
      setUsername(result.userInfo.username)
      setRealName(result.userInfo.realname)
      return Promise.resolve()
    } else {
      Message({ type: 'error', message: res.message, duration: 2000 })
      return Promise.reject()
    }
  },

  // get user info
  async GetInfo({ commit, state }) {
    const res = await getInfo({ username: state.username })
    if (res && res.success && res.result.userPermission) {
      const data = res.result.userPermission
      if (data.rolesList && data.rolesList.length > 0) {
        // 验证返回的roleList是否是一个非空数组
        commit('SET_ROLES', data.rolesList)
      } else {
        return Promise.reject({
          message: ' 该用户未配置角色，请联系管理员配置角色！'
        })
      }
      // 通过设置是否非空来进行开发和生产开启路由验证
      if (data.menuList && data.menuList.length >= 0) {
        // 验证返回的menuList是否是一个非空数组
        commit('SET_MENUS', data.menuList)
      } else {
        return Promise.reject({
          message: '该用户所处角色未进行授权，请联系管理员进行角色授权！'
        })
      }
      if (data.permissionList && data.permissionList.length >= 0) {
        // 验证返回的permissionList是否是一个数组
        commit('SET_PERMISSIONS', data.permissionList)
      } else {
        return Promise.reject({
          message: '返回的数据permissionList必须是一个数组！'
        })
      }
      return Promise.resolve(res)
    } else {
      if (res.success && !res.result.userPermission) {
        return Promise.reject({
          message: '返回的数据缺失 userPermission！'
        })
      } else {
        return Promise.reject({
          message: '请求失败！'
        })
      }
    }
  },

  // user logout
  async Logout({ commit, state }) {
    const res = await logout()
    if (res && res.success) {
      commit('SET_TOKEN', '')
      commit('SET_USER_NAME', '')
      commit('SET_REAL_NAME', '')
      commit('SET_ROLES', [])
      commit('SET_MENUS', [])
      commit('SET_PERMISSIONS', [])
      removeToken()
      removeUsername()
      removeRealName()
      resetRouter()
      return Promise.resolve()
    } else {
      Message({ type: 'error', message: '退出登录失败', duration: 2000 })
      return Promise.reject()
    }
  },

  // remove token
  FedLogOut({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_USER_NAME', '')
      commit('SET_REAL_NAME', '')
      commit('SET_ROLES', [])
      commit('SET_MENUS', [])
      commit('SET_PERMISSIONS', [])
      removeToken()
      removeUsername()
      removeRealName()
      resetRouter()
      resolve()
    })
  }
}

export default {
  state,
  mutations,
  actions
}
