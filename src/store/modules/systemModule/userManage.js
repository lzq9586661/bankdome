import {
  getUserList,
  getAllUserList,
  getAllRoleList,
  checkUsername,
  addUser,
  editUser,
  delUser,
  exportUserList,
  changePassword,
  changeUserPower
} from '@/api/systemModule/userManage'

export default {
  actions: {
    async GetUserList({ commit }, data) {
      return await getUserList(data)
    },
    async GetAllUserList({ commit }, data) {
      return await getAllUserList(data)
    },
    async GetAllRoleList({ commit }, data) {
      return await getAllRoleList(data)
    },
    async CheckUsername({ commit }, data) {
      return await checkUsername(data)
    },
    async AddUser({ commit }, data) {
      return await addUser(data)
    },
    async EditUser({ commit }, data) {
      return await editUser(data)
    },
    async DelUser({ commit }, data) {
      return await delUser(data)
    },
    async ExportUserList({ commit }, data) {
      return await exportUserList(data)
    },
    async ChangePassword({ commit }, data) {
      return await changePassword(data)
    },
    async ChangeUserPower({ commit }, data) {
      return await changeUserPower(data)
    }
  }
}
