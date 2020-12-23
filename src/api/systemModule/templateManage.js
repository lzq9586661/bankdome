import { getAction, postAction, putAction, deleteAction } from '@/api/manage'

// 模板树
export const getTemplateTreeList = (data) => {
  return getAction('/xs/xsTemplateNode/queryTreeList', data)
}
// 模板列表
export const getTemplateList = (data) => {
  return getAction('/xs/xsTemplateNode/list', data)
}
// 添加模板
export const addTemplate = (data) => {
  return postAction('/xs/xsTemplateNode/add', data)
}
// 修改模板
export const editTemplate = (data) => {
  return putAction('/xs/xsTemplateNode/edit', data)
}
// 删除模板
export const delTemplate = (data) => {
  return deleteAction('/xs/xsTemplateNode/delete', data)
}
