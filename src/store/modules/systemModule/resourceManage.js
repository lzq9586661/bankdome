import { getPermissionList, addPermission, editPermission, delPermission } from '@/api/systemModule/resourceManage'

export default {
  actions: {
    async GetPermissionList({ commit }, data) {
      return await getPermissionList(data)
    },
    async AddPermission({ commit }, data) {
      return await addPermission(data)
    },
    async EditPermission({ commit }, data) {
      return await editPermission(data)
    },
    async DelPermission({ commit }, data) {
      return await delPermission(data)
    }
  }
}
