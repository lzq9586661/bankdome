import { getLogList, exportLogList } from '@/api/systemModule/logManage'

export default {
  actions: {
    async GetLogList({ commit }, data) {
      return await getLogList(data)
    },
    async ExportLogList({ commit }, data) {
      return await exportLogList(data)
    }
  }
}
