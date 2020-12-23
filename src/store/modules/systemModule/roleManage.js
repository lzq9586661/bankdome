import { getRoleList, checkRoleCode, addRole, editRole, delRole, getRolePermission, saveRolePermission } from '@/api/systemModule/roleManage'

export default {
  actions: {
    async GetRoleList({ commit }, data) {
      return await getRoleList(data)
    },
    async CheckRoleCode({ commit }, data) {
      return await checkRoleCode(data)
    },
    async AddRole({ commit }, data) {
      return await addRole(data)
    },
    async EditRole({ commit }, data) {
      return await editRole(data)
    },
    async DelRole({ commit }, data) {
      return await delRole(data)
    },
    async GetRolePermission({ commit }, data) {
      return await getRolePermission(data)
    },
    async SaveRolePermission({ commit }, data) {
      return await saveRolePermission(data)
    }
  }
}
