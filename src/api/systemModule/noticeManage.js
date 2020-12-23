import { getAction, postAction, putAction, deleteAction } from '@/api/manage'

// 获取通告列表
export const getNoticeList = (data) => {
  return getAction('/notice/notice/doList', data)
}
// 添加通告
export const addNotice = (data) => {
  return postAction('/notice/notice/add', data)
}
// 编辑通告
export const editNotice = (data) => {
  return putAction('/notice/notice/edit', data)
}
// 删除通告
export const delNotice = (data) => {
  return deleteAction('/notice/notice/delete', data)
}
// 修改公告状态
export const publishRevokeNotice = (data) => {
  return getAction('/notice/notice/editNoticeLevel', data)
}
