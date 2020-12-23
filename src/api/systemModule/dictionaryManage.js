import { getAction, postAction, putAction, deleteAction } from '@/api/manage'

// 获取字典列表
export const getDictList = (data) => {
  return getAction('/sys/dict/list', data)
}
// 添加字典
export const addDict = (data) => {
  return postAction('/sys/dict/add', data)
}
// 修改字典
export const editDict = (data) => {
  return putAction('/sys/dict/edit', data)
}
// 删除字典
export const delDict = (data) => {
  return deleteAction('/sys/dict/delete', data)
}
// 获取字典配置项列表
export const getDictItemList = (data) => {
  return getAction('/sys/dictItem/list', data)
}
// 添加字典配置项
export const addDictItem = (data) => {
  return postAction('/sys/dictItem/add', data)
}
// 修改字典配置项
export const editDictItem = (data) => {
  return putAction('/sys/dictItem/edit', data)
}
// 字典项的重复判断
export const checkCodeDictItemCode = (data) => {
  return getAction('/sys/dictItem/checkOnly', data)
}
// 删除字典配置项
export const delDictItem = (data) => {
  return deleteAction('/sys/dictItem/delete', data)
}
