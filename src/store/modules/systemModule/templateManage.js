import { getTemplateTreeList, getTemplateList, addTemplate, editTemplate, delTemplate } from '@/api/systemModule/templateManage'

export default {
  actions: {
    async GetTemplateTreeList({ commit }, data) {
      return await getTemplateTreeList(data)
    },
    async GetTemplateList({ commit }, data) {
      return await getTemplateList(data)
    },
    async AddTemplate({ commit }, data) {
      return await addTemplate(data)
    },
    async EditTemplate({ commit }, data) {
      return await editTemplate(data)
    },
    async DelTemplate({ commit }, data) {
      return await delTemplate(data)
    }
  }
}
