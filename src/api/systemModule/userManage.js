import { getAction, postAction, putAction, deleteAction, downloadAction } from '@/api/manage'

// 获取用户列表
export const getUserList = (data) => {
  return getAction('/sys/user/list', data)
}
// 获取所有用户列表
export const getAllUserList = (data) => {
  return getAction('/sys/user/queryAll', data)
}
// 获取所有的角色
export const getAllRoleList = (data) => {
  return getAction('/sys/role/queryall', data)
}
// 验证用户名是否存在
export const checkUsername = (data) => {
  return getAction('/sys/user/checkOnlyUser', data)
}
// 添加用户
export const addUser = (data) => {
  return postAction('/sys/user/add', data)
}
// 编辑用户
export const editUser = (data) => {
  return putAction('/sys/user/edit', data)
}
// 删除用户
export const delUser = (data) => {
  return deleteAction('/sys/user/delete', data)
}
// 修改密码
export const changePassword = (data) => {
  return putAction('/sys/user/changePassword', data)
}
// 授权
export const changeUserPower = (data) => {
  return postAction('/sys/user/addRole', data)
}
// 用户导出
export const exportUserList = (data) => {
  return downloadAction('/sys/user/exportXls', data)
}
