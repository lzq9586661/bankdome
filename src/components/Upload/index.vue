<template>
  <div>
    <div class="panel-content">
      <div>
        <el-upload
          ref="upload"
          :before-upload="beforeUpload"
          :on-exceed="handleExceed"
          :on-remove="handleRemove"
          :auto-upload="isAuto ? true : false"
          :show-file-list="!isAuto ? true : false"
          :http-request="uploadFileMethod"
          :multiple="isMultiple"
          :limit="limit"
          :disabled="!fileSourceId"
          action
        >
          <template v-if="!isAuto">
            <!-- <el-select v-model="security" placeholder="请选择保密等级">
              <el-option v-for="item in securityArr" :key="item.VALUE" :label="item.TEXT" :value="item.VALUE" />
            </el-select>
            <el-select v-model="share" placeholder="请选择是否共享">
              <el-option v-for="item in shareArr" :key="item.VALUE" :label="item.TEXT" :value="item.VALUE" />
            </el-select> -->
            <el-button slot="trigger" type="primary" icon="el-icon-s-order" plain :disabled="!fileSourceId">选择文件</el-button>
            <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              element-loading-background="rgba(0, 0, 0, 0.6)"
              style="margin-left: 10px"
              type="success"
              icon="el-icon-upload"
              plain
              :disabled="!fileSourceId"
              @click="submitUpload"
            >
              上传到服务器
            </el-button>
          </template>
          <template v-else>
            <!-- <el-select v-model="security" placeholder="请选择保密等级">
              <el-option v-for="item in securityArr" :key="item.VALUE" :label="item.TEXT" :value="item.VALUE" />
            </el-select>
            <el-select v-model="share" placeholder="请选择是否共享">
              <el-option v-for="item in shareArr" :key="item.VALUE" :label="item.TEXT" :value="item.VALUE" />
            </el-select> -->
            <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              element-loading-background="rgba(0, 0, 0, 0.6)"
              type="primary"
              icon="el-icon-upload"
              plain
              :disabled="!fileSourceId"
            >
              上传文件
            </el-button>
          </template>
          <div slot="tip" class="el-upload__tip">
            <p v-if="acceptType.length > 0">
              只能上传{{ acceptType.join('、') }}等格式的文件
              <template v-if="limitSize">,且大小不超过{{ limitSize }}Mb</template>
              ！
            </p>
            <!-- <p v-if="unAcceptType.length > 0">不能上传{{ unAcceptType.join('、') }}等格式的文件<template v-if="limitSize">，且大小不超过{{limitSize}}Mb</template>！</p>-->
          </div>
        </el-upload>
      </div>
      <el-table :data="fileList" style="width: 100%">
        <el-table-column label="序号" width="60px">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="fileName" label="文件名称" min-width="120px" />
        <el-table-column prop="createBy" label="创建人" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-download" title="下载" plain @click="handleDownFile(scope.row)" />
            <el-button type="danger" icon="el-icon-delete" title="删除" plain @click="handleRemove(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Upload',
    props: {
      // 是否自动上传
      isAuto: {
        type: Boolean,
        default: true
      },
      // 是否多个文件上传
      isMultiple: {
        type: Boolean,
        default: false
      },
      // 通过id获取文件列表
      fileSourceId: {
        type: String,
        default: ''
      },
      // 接受文件类型
      acceptType: {
        type: Array,
        default() {
          return ['doc', 'docx', 'xsl', 'xlsx']
        }
      },
      // 不接受文件类型
      unAcceptType: {
        type: Array,
        default() {
          return []
        }
      },
      // 上传文件大小，0不限制
      limitSize: {
        type: Number,
        default: 0
      },
      // 最大允许上传个数
      limit: {
        type: Number,
        default: 100
      },
      // 类型 0/模板，1/附件
      fileType: {
        type: [String, Number],
        default: '1'
      }
    },
    data() {
      return {
        fileList: [],
        fullscreenLoading: false,
        securityArr: [],
        security: '',
        shareArr: [],
        share: ''
      }
    },
    methods: {
      handleInit() {
        this.getShareArr()
        this.getSecurityArr()
        this.fileList = []
        if (this.fileSourceId) {
          this.getFileList()
        }
      },
      getShareArr() {
        this.$store
          .dispatch('GetDictListByDictCode', 'yes_or_no')
          .then((res) => {
            if (res.success) {
              this.shareArr = res.result
            } else {
              this.$handleErr(res)
            }
          })
          .catch((err) => {
            this.$handleErr(err)
          })
      },
      getSecurityArr() {
        this.$store
          .dispatch('GetDictListByDictCode', 'file_security')
          .then((res) => {
            if (res.success) {
              this.securityArr = res.result
            } else {
              this.$handleErr(res)
            }
          })
          .catch((err) => {
            this.$handleErr(err)
          })
      },
      // 获取上传文件列表
      getFileList() {
        this.$store
          .dispatch('GetFileList', {
            fileSourceId: this.fileSourceId,
            fileType: this.fileType
          })
          .then((res) => {
            if (res.success) {
              this.fileList = res.result
            } else {
              this.$handleErr(res)
            }
          })
          .catch((err) => {
            this.$handleErr(err)
          })
      },
      beforeUpload(file) {
        if (this.security === '' || this.share === '') {
          this.$message({
            type: 'error',
            message: '请选择保密等级和是否共享！'
          })
          return false
        }
        const uploadType = file.name.substring(file.name.lastIndexOf('.') + 1)
        const uploadSize = file.size / 1024 / 1024 < this.limitSize
        if (this.acceptType.length > 0 && this.acceptType.indexOf(uploadType) === -1) {
          this.$message({
            message: '上传文件只能是' + this.acceptType.join('、') + '格式!',
            type: 'error',
            duration: 1500
          })
          return false
        }
        if (this.unAcceptType.length > 0 && this.unAcceptType.indexOf(uploadType) > -1) {
          this.$message({
            message: '不能上传' + this.unAcceptType.join('、') + '格式的文件！',
            type: 'error',
            duration: 1500
          })
          return false
        }
        if (this.limitSize > 0 && !uploadSize) {
          this.$message({
            message: `上传文件大小不能超过${this.limitSize}MB!`,
            type: 'error',
            duration: 1500
          })
          return false
        }
        this.fullscreenLoading = true
        return true
      },
      handleExceed(files, fileList) {
        this.$message({
          message: `每次最多只能上传${this.limit}个文件`,
          type: 'error',
          duration: 2000
        })
      },
      // 上传二进制流文件
      uploadFileMethod(param) {
        const files = param.file
        const formData = new FormData()
        formData.append('file', files)
        formData.append('fileType', this.fileType)
        formData.append('fileSourceId', this.fileSourceId)
        this.$store
          .dispatch('UploadFile', formData)
          .then((res) => {
            if (res.success) {
              const self = this
              this.$notify({
                title: '成功',
                message: '上传成功',
                type: 'success',
                duration: 1000,
                onClose() {
                  self.getFileList()
                  self.fullscreenLoading = false
                }
              })
            } else {
              this.$handleErr(res)
              this.fullscreenLoading = false
            }
          })
          .catch((err) => {
            this.$handleErr(err)
            this.fullscreenLoading = false
          })
      },
      submitUpload() {
        if (!this.fileSourceId) {
          this.$message({
            message: '请先选择树节点再选择上传的文件！',
            type: 'error',
            duration: 1000
          })
          return false
        }

        const list = document.getElementsByClassName('el-upload-list__item is-ready')
        if (!list.length) {
          this.$message({
            type: 'error',
            message: '请选择需要上传的文件！'
          })
          return false
        }
        this.$refs.upload.submit()
      },
      // 删除已上传的文件
      handleRemove(file, fileList) {
        if (file.id) {
          this.$confirm('确定删除？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.$store
                .dispatch('DeleteFile', {
                  id: file.id,
                  fileType: this.fileType
                })
                .then((res) => {
                  if (res.success) {
                    const self = this
                    this.$notify({
                      title: '成功',
                      message: '删除成功',
                      type: 'success',
                      duration: 1000,
                      onClose() {
                        self.getFileList()
                      }
                    })
                  } else {
                    this.$handleErr(res)
                  }
                })
                .catch((err) => {
                  this.$handleErr(err)
                })
            })
            .catch(() => {})
        }
      },
      // 在文件列表里面下载二进制流文件
      handleDownFile(file) {
        this.$store
          .dispatch('DownloadFile', { id: file.id, fileType: this.fileType })
          .then((res) => {
            if (res.data) {
              const content = res.data
              const fileName = decodeURI(res.headers['content-disposition'].split('fileName=')[1])
              const blob = new Blob([content])
              if ('download' in document.createElement('a')) {
                // 非IE下载
                const elink = document.createElement('a')
                elink.download = fileName
                elink.style.display = 'none'
                elink.href = URL.createObjectURL(blob)
                document.body.appendChild(elink)
                elink.click()
                URL.revokeObjectURL(elink.href) // 释放URL 对象
                document.body.removeChild(elink)
              } else {
                // IE10+下载
                navigator.msSaveBlob(blob, fileName)
              }
            } else {
              this.$message({
                message: '文件内容格式错误或者文件不存在',
                type: 'error',
                duration: 2000
              })
            }
          })
          .catch((err) => {
            this.$handleErr(err)
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  >>> .el-upload {
    margin-bottom: 15px;
    text-align: left;
    .el-select,
    .el-button {
      width: auto;
      margin: 5px;
    }
  }
  >>> .el-upload__tip {
    font-size: 14px;
    color: red;
    > p {
      margin-top: 0;
    }
  }
</style>
