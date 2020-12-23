import { getAction, postAction, putAction, deleteAction } from '@/api/manage'

// 获取部门树
export const getDepartTreeList = (data) => {
  return getAction('/sys/sysDepart/queryTreeList', data)
}
// 添加部门
export const addDepart = (data) => {
  return postAction('/sys/sysDepart/add', data)
}
// 修改部门
export const editDepart = (data) => {
  return putAction('/sys/sysDepart/edit', data)
}
// 删除部门
export const delDepart = (data) => {
  return deleteAction('/sys/sysDepart/deleteBatch', data)
}
