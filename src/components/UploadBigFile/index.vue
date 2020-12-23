<template>
  <div class="panel-content">
    <el-upload
      ref="upload"
      :before-upload="beforeUpload"
      :on-change="handleFileChange"
      :on-exceed="handleExceed"
      :limit="1"
      :auto-upload="false"
      :http-request="handleUpload"
      :file-list="fileList"
      :disabled="!moduleId || status !== uploadStatus.wait"
      action
    >
      <el-button slot="trigger" type="primary" icon="el-icon-s-order" plain :disabled="!moduleId || status !== uploadStatus.wait">选择文件</el-button>
      <el-button style="margin-left: 10px" type="success" icon="el-icon-upload" plain :disabled="!moduleId || uploadDisabled" @click="submitUpload">上传</el-button>
      <el-button v-if="status === uploadStatus.pause" type="primary" plain icon="el-icon-video-play" @click="handleResume">恢复</el-button>
      <el-button v-else type="warning" plain icon="el-icon-video-pause" :disabled="status !== uploadStatus.uploading || !container.hash" @click="handlePause">暂停</el-button>
    </el-upload>
    <div class="flex-content">
      <div class="flex-left">文件上传准备</div>
      <div class="flex-right">
        <el-progress :text-inside="true" :stroke-width="16" :percentage="hashPercentage" status="success"></el-progress>
      </div>
    </div>
    <div class="flex-content">
      <div class="flex-left">文件上传进度</div>
      <div class="flex-right">
        <el-progress :text-inside="true" :stroke-width="16" :percentage="fakeUploadPercentage" status="success"></el-progress>
      </div>
    </div>
    <el-table :data="softFileList" style="width: 100%">
      <el-table-column label="序号" width="60px">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="name" label="文件名称" min-width="120px" />
      <el-table-column prop="createBy" label="创建人" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作" width="140px">
        <template slot-scope="scope">
          <el-button
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="下载中，请耐心等待！"
            element-loading-background="rgba(0, 0, 0, 0.4)"
            type="primary"
            icon="el-icon-download"
            title="下载"
            plain
            @click="handleDownFile(scope.row)"
          />
          <el-button type="danger" icon="el-icon-delete" title="删除" plain @click="handleRemove(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import SparkMD5 from 'spark-md5'
  import { mapGetters } from 'vuex'
  const SIZE = 5 * 1024 * 1024 // 切片大小

  export default {
    name: 'UploadBigFile',
    filters: {
      transformByte(val) {
        return Number((val / 1024).toFixed(0))
      }
    },
    props: {
      // 通过该id获取文件列表
      moduleId: {
        type: String,
        default: ''
      },
      // 文件类型
      acceptType: {
        type: Array,
        default() {
          return []
        }
      },
      // 不接受文件类型
      unAcceptType: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data: () => ({
      uploadStatus: {
        wait: 'wait',
        pause: 'pause',
        uploading: 'uploading',
        error: 'error',
        done: 'done'
      },
      container: {
        file: null,
        hash: '',
        worker: null
      },
      hashPercentage: 0,
      data: [],
      requestList: [],
      status: 'wait',
      // 当暂停时会取消 xhr 导致进度条后退
      // 为了避免这种情况，需要定义一个假的进度条
      fakeUploadPercentage: 0,
      fileList: [],
      softFileList: [],
      fullscreenLoading: false
    }),
    computed: {
      ...mapGetters(['token']),
      uploadDisabled() {
        return !this.container.file || [this.uploadStatus.pause, this.uploadStatus.uploading].includes(this.status)
      },
      uploadPercentage() {
        if (!this.container.file || !this.data.length) return 0
        const loaded = this.data.map((item) => item.size * item.percentage).reduce((acc, cur) => acc + cur)
        return parseInt((loaded / this.container.file.size).toFixed(2))
      }
    },
    watch: {
      uploadPercentage(now) {
        if (now > this.fakeUploadPercentage) {
          this.fakeUploadPercentage = now
        }
      }
    },
    methods: {
      handleInit() {
        this.softFileList = []
        this.fileList = []
        this.hashPercentage = 0
        this.fakeUploadPercentage = 0
        this.getFileList()
      },
      // 获取上传文件列表
      getFileList() {
        this.$store
          .dispatch('GetBigFileList', {
            moduleId: this.moduleId
          })
          .then((res) => {
            if (res.success) {
              this.softFileList = res.result
            } else {
              this.$handleErr(res)
            }
          })
          .catch((err) => {
            this.$handleErr(err)
          })
      },
      // 取消请求
      resetData() {
        this.requestList.forEach((xhr) => xhr?.abort())
        this.requestList = []
        if (this.container.worker) {
          this.container.worker.onmessage = null
        }
      },
      // 暂停
      handlePause() {
        this.status = this.uploadStatus.pause
        this.resetData()
      },
      // 恢复上传
      async handleResume() {
        this.status = this.uploadStatus.uploading
        const { uploadedList } = await this.verifyUpload(this.container.file.name, this.container.hash)
        await this.uploadChunks(uploadedList)
      },
      // xhr请求
      request({ url, method = 'post', data, headers = {}, onProgress = (e) => e, requestList }) {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest()
          xhr.upload.onprogress = onProgress
          xhr.open(method, url)
          Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]))
          xhr.send(data)
          xhr.onreadystatechange = (e) => {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                if (requestList) {
                  // 成功后删除列表
                  const xhrIndex = requestList.findIndex((item) => item === xhr)
                  requestList.splice(xhrIndex, 1)
                }
                resolve({
                  data: e.target.response
                })
              } else {
                reject('报错了')
              }
            }
          }
          // 暴露当前 xhr 给外部
          requestList?.push(xhr)
        })
      },
      // 控制并发以及失败重试
      async sendRequest(urls, max = 4, retrys = 3) {
        return new Promise((resolve, reject) => {
          const len = urls.length
          let counter = 0
          const retryArr = []
          const start = async () => {
            // 有请求，有通道
            while (counter < len && max > 0) {
              max-- // 占用通道
              const i = urls.findIndex((v) => v.status === this.uploadStatus.wait || v.status === this.uploadStatus.error) // 等待或者error
              if (i === -1) {
                return false
              }
              urls[i].status = this.uploadStatus.uploading
              const formData = urls[i].formData
              const index = urls[i].index
              if (typeof retryArr[index] === 'number') {
                console.log(index, '开始重试')
              }
              const res = await this.request({
                url: '/bigFile/upload',
                data: formData,
                onProgress: this.createProgressHandler(this.data[index]),
                requestList: this.requestList,
                headers: {
                  'X-Access-Token': this.token
                }
              })
              const response = JSON.parse(res.data)
              if (response.success) {
                urls[i].status = this.uploadStatus.done
                max++ // 释放通道
                urls[counter].done = true
                counter++
                if (counter === len) {
                  resolve()
                } else {
                  start()
                }
              } else {
                // 初始值
                urls[i].status = this.uploadStatus.error
                if (typeof retryArr[index] !== 'number') {
                  retryArr[index] = 0
                }
                // 次数累加
                retryArr[index]++
                // 一个请求报错3次的
                if (retryArr[index] >= 2) {
                  this.status = this.uploadStatus.wait
                  this.$message({
                    message: '文件上传失败，请重新上传！',
                    type: 'error',
                    duration: 2000
                  })
                  return reject() // 考虑abort所有别的
                }
                // 3次报错以内的 重启
                this.data[index].progress = -1 // 报错的进度条
                max++ // 释放当前占用的通道，但是counter不累加
                start()
              }
            }
          }
          start()
        })
      },
      // 生成文件切片
      createFileChunk(file, size = SIZE) {
        const fileChunkList = []
        let cur = 0
        while (cur < file.size) {
          fileChunkList.push({ file: file.slice(cur, cur + size) })
          cur += size
        }
        return fileChunkList
      },
      // 生成文件 hash（web-worker）
      calculateHash(fileChunkList) {
        return new Promise((resolve) => {
          const spark = new SparkMD5.ArrayBuffer()
          let percentage = 0
          let count = 0
          let hash = ''
          const loadNext = (index) => {
            const reader = new FileReader()
            reader.readAsArrayBuffer(fileChunkList[index].file)
            reader.onload = (e) => {
              count++
              spark.append(e.target.result)
              if (count === fileChunkList.length) {
                percentage = 100
                this.hashPercentage = percentage
                hash = spark.end()
                resolve(hash)
              } else {
                percentage = Number((percentage + 100 / fileChunkList.length).toFixed(2))
                loadNext(count)
              }
            }
          }
          loadNext(0)
        })
      },
      // 根据 hash 验证文件是否曾经已经被上传过
      // 没有才进行上传
      async verifyUpload(filename, fileHash) {
        const { data } = await this.request({
          url: '/bigFile/verify',
          headers: {
            'content-type': 'application/json',
            'X-Access-Token': this.token
          },
          data: JSON.stringify({
            filename,
            fileHash,
            moduleId: this.moduleId
          })
        })
        return JSON.parse(data).result
      },
      // 上传切片，同时过滤已上传的切片
      async uploadChunks(uploadedList = []) {
        const requestList = this.data
          .filter(({ hash }) => !uploadedList.includes(hash))
          .map(({ chunk, hash, index }) => {
            const formData = new FormData()
            formData.append('chunk', chunk)
            formData.append('hash', hash)
            formData.append('filename', this.container.file.name)
            formData.append('fileHash', this.container.hash)
            return { formData, index, status: this.uploadStatus.wait }
          })
        try {
          await this.sendRequest(requestList, 4)
          if (uploadedList.length + requestList.length === this.data.length) {
            // 上传和已经存在之和 等于全部的再合并
            await this.mergeRequest()
          }
        } catch (e) {
          // 上传有被reject的
          this.$message({
            message: '文件上传失败,请重新上传！',
            type: 'error',
            duration: 2000
          })
        }
      },
      // 通知服务端合并切片
      async mergeRequest() {
        await this.request({
          url: '/bigFile/merge',
          headers: {
            'content-type': 'application/json',
            'X-Access-Token': this.token
          },
          data: JSON.stringify({
            size: this.container.file.size,
            fileHash: this.container.hash,
            filename: this.container.file.name,
            moduleId: this.moduleId
          })
        })
        this.$notify({
          title: '成功',
          message: '文件上传成功！',
          type: 'success',
          duration: 1000
        })
        this.status = this.uploadStatus.wait
        this.$refs.upload.clearFiles()
        this.getFileList()
      },
      // 用闭包保存每个 chunk 的进度数据
      createProgressHandler(item) {
        return (e) => {
          item.percentage = parseInt(String((e.loaded / e.total) * 100))
        }
      },
      beforeUpload(file) {
        const uploadType = file.name.substring(file.name.lastIndexOf('.') + 1)
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
        return true
      },
      // 选择文件
      handleFileChange(file, fileList) {
        this.resetData()
        this.hashPercentage = 0
        this.fakeUploadPercentage = 0
        this.data = []
        this.requestList = []
        this.status = 'wait'
        this.container.hash = ''
        this.container.worker = null
        this.container.file = file.raw
        this.fileList = fileList
      },
      handleExceed(files, fileList) {
        if (files.length + fileList.length > 1) {
          this.$message({
            message: '一次只能上传一个文件！',
            type: 'error',
            duration: 2000
          })
          return false
        } else {
          return true
        }
      },
      // 上传文件
      async handleUpload() {
        this.hashPercentage = 0
        this.fakeUploadPercentage = 0
        if (!this.container.file) return
        const fileChunkList = this.createFileChunk(this.container.file)
        if (fileChunkList.length > 0) {
          this.container.hash = await this.calculateHash(fileChunkList)
          const { shouldUpload, uploadedList } = await this.verifyUpload(this.container.file.name, this.container.hash)
          if (!shouldUpload) {
            this.$notify({
              title: '成功',
              message: '文件秒传成功！',
              type: 'success',
              duration: 1000
            })
            this.status = this.uploadStatus.wait
            this.fakeUploadPercentage = 100
            this.$refs.upload.clearFiles()
            this.getFileList()
            return
          }
          this.status = this.uploadStatus.uploading
          this.data = fileChunkList.map(({ file }, index) => {
            return {
              fileHash: this.container.hash,
              index,
              hash: this.container.hash + '-' + index,
              chunk: file,
              size: file.size,
              percentage: uploadedList.indexOf(this.container.hash + '-' + index) > -1 ? 100 : 0
            }
          })
          await this.uploadChunks(uploadedList)
        } else {
          this.$message({
            message: '该文件内容为空，请重新选择文件上传！',
            type: 'error',
            duration: 1000
          })
          this.fileList = []
          return false
        }
      },
      submitUpload() {
        if (!this.moduleId) {
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
      handleRemove(file) {
        if (file.id) {
          this.$confirm('确定删除？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.$store
                .dispatch('DelBigFile', {
                  id: file.id,
                  moduleId: this.moduleId
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
        this.fullscreenLoading = true
        this.$store
          .dispatch('DownloadBigFile', { id: file.id })
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
            this.fullscreenLoading = false
          })
          .catch((err) => {
            this.$handleErr(err)
            this.fullscreenLoading = false
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  // flex 左侧固定，右侧自适应布局
  .flex-content {
    display: flex;
    margin: 15px 0;
    .flex-left {
      width: 120px;
    }
    .flex-right {
      flex: 1;
    }
  }
</style>
