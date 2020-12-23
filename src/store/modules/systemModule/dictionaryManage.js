import { getDictList, addDict, editDict, delDict, getDictItemList, addDictItem, editDictItem, checkCodeDictItemCode, delDictItem } from '@/api/systemModule/dictionaryManage'

export default {
  actions: {
    async GetDictList({ commit }, data) {
      return await getDictList(data)
    },
    async AddDict({ commit }, data) {
      return await addDict(data)
    },
    async EditDict({ commit }, data) {
      return await editDict(data)
    },
    async DelDict({ commit }, data) {
      return await delDict(data)
    },
    async GetDictItemList({ commit }, data) {
      return await getDictItemList(data)
    },
    async AddDictItem({ commit }, data) {
      return await addDictItem(data)
    },
    async EditDictItem({ commit }, data) {
      return await editDictItem(data)
    },
    async CheckCodeDictItemCode({ commit }, data) {
      return await checkCodeDictItemCode(data)
    },
    async DelDictItem({ commit }, data) {
      return await delDictItem(data)
    }
  }
}
