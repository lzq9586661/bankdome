import { getDepartTreeList, addDepart, editDepart, delDepart } from '@/api/systemModule/departManage'

export default {
  actions: {
    async GetDepartTreeList({ commit }, data) {
      return await getDepartTreeList(data)
    },
    async AddDepart({ commit }, data) {
      return await addDepart(data)
    },
    async EditDepart({ commit }, data) {
      return await editDepart(data)
    },
    async DelDepart({ commit }, data) {
      return await delDepart(data)
    }
  }
}
