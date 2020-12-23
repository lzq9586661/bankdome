import { getAction, postAction } from '@/api/manage'

// 登录
export const login = (data) => {
  return postAction('/sys/login', data)
}
// 获取用户信息
export const getInfo = (data) => {
  return getAction('/sys/permission/queryByUser', data)
}
// 退出登录
export const logout = (data) => {
  return postAction('/sys/logout', data)
}
