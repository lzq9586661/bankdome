import { getNoticeList, addNotice, editNotice, delNotice, publishRevokeNotice } from '@/api/systemModule/noticeManage'

export default {
  actions: {
    async GetNoticeList({ commit }, data) {
      return await getNoticeList(data)
    },
    async AddNotice({ commit }, data) {
      return await addNotice(data)
    },
    async EditNotice({ commit }, data) {
      return await editNotice(data)
    },
    async DelNotice({ commit }, data) {
      return await delNotice(data)
    },
    async PublishRevokeNotice({ commit }, data) {
      return await publishRevokeNotice(data)
    }
  }
}
