import { getAction, postAction, putAction, deleteAction } from '@/api/manage'

// 获取角色列表
export const getRoleList = (data) => {
  return getAction('/sys/role/list', data)
}
// 验证角色编码是否存在
export const checkRoleCode = (data) => {
  return getAction('/sys/role/checkRoleCode', data)
}
// 添加角色
export const addRole = (data) => {
  return postAction('/sys/role/add', data)
}
// 编辑角色
export const editRole = (data) => {
  return putAction('/sys/role/edit', data)
}
// 删除角色
export const delRole = (data) => {
  return deleteAction('/sys/role/delete', data)
}
// 获取角色对应的菜单
export const getRolePermission = (data) => {
  return getAction('/sys/permission/queryRolePermission', data)
}
// 保存角色对应的菜单
export const saveRolePermission = (data) => {
  return postAction('/sys/permission/saveRolePermission', data)
}
