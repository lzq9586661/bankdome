import { getAction, downloadAction } from '@/api/manage'

// 获取日志列表
export const getLogList = (data) => {
  return getAction('/sys/log/list', data)
}
// 导出日志列表
export const exportLogList = (data) => {
  return downloadAction('/sys/log/exportXls', data)
}
