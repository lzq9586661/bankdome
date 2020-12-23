import {
  getDictListByDictCode,
  checkCode,
  getFileList,
  uploadFile,
  deleteFile,
  downloadFile,
  getBigFileList,
  verifyBigFile,
  uploadBigFile,
  mergeBigFile,
  downloadBigFile,
  delBigFile
} from '@/api/common'

export default {
  actions: {
    async GetDictListByDictCode({ commit }, data) {
      return await getDictListByDictCode(data)
    },
    async CheckCode({ commit }, data) {
      return await checkCode(data)
    },
    async GetFileList({ commit }, data) {
      return await getFileList(data)
    },
    async UploadFile({ commit }, data) {
      return await uploadFile(data)
    },
    async DeleteFile({ commit }, data) {
      return await deleteFile(data)
    },
    async DownloadFile({ commit }, data) {
      return await downloadFile(data)
    },
    async GetBigFileList({ commit }, data) {
      return await getBigFileList(data)
    },
    async VerifyBigFile({ commit }, data) {
      return await verifyBigFile(data)
    },
    async UploadBigFile({ commit }, data) {
      return await uploadBigFile(data)
    },
    async MergeBigFile({ commit }, data) {
      return await mergeBigFile(data)
    },
    async DownloadBigFile({ commit }, data) {
      return await downloadBigFile(data)
    },
    async DelBigFile({ commit }, data) {
      return await delBigFile(data)
    }
  }
}
