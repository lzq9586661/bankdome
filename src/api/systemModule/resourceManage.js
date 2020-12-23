import { getAction, postAction, putAction, deleteAction } from '@/api/manage'

// 获取菜单列表
export const getPermissionList = (data) => {
  return getAction('/sys/permission/list', data)
}
// 添加菜单
export const addPermission = (data) => {
  return postAction('/sys/permission/add', data)
}
// 修改菜单
export const editPermission = (data) => {
  return putAction('/sys/permission/edit', data)
}
// 删除菜单
export const delPermission = (data) => {
  return deleteAction('/sys/permission/delete', data)
}
