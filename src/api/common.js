import { getAction, uploadAction, deleteAction, downloadAction, postAction } from '@/api/manage'

// 根据字典码获取所有的字典数据
export const getDictListByDictCode = (data) => {
  return getAction('/sys/dict/getDictItems/' + data)
}
// 重复校验
export const checkCode = (data) => {
  return getAction('/sys/duplicate/check', data)
}
// 文件列表
export const getFileList = (data) => {
  return getAction('/sys/common/getFileList', data)
}
// 上传文件
export const uploadFile = (data) => {
  return uploadAction('/sys/common/upload', data)
}
// 删除文件
export const deleteFile = (data) => {
  return getAction('/sys/common/delete', data)
}
// 下载文件 by id
export const downloadFile = (data) => {
  return downloadAction('/sys/common/download', data)
}
// 大文件列表
export const getBigFileList = (data) => {
  return getAction('/bigFile/list', data)
}
// 大文件是否已上传，如果没有上传获取断点上传的hash文件
export const verifyBigFile = (data) => {
  return postAction('/bigFile/verify', data)
}
// 大文件上传
export const uploadBigFile = (data) => {
  return postAction('/bigFile/upload', data)
}
// 大文件合并
export const mergeBigFile = (data) => {
  return postAction('/bigFile/merge', data)
}
// 大文件下载
export const downloadBigFile = (data) => {
  return downloadAction('/bigFile/download', data)
}
// 大文件删除
export const delBigFile = (data) => {
  return deleteAction('/bigFile/delete', data)
}
