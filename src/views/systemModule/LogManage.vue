<template>
  <div class="app-container">
    <div class="panel-style">
      <el-form :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-input v-model.trim="listQuery.logContent" placeholder="日志内容" clearable @change="handleSearch" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="listQuery.logType" placeholder="日志类型" @change="handleSearch">
            <el-option v-for="item in logTypeArr" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="dateRange"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="handleSearch"
          />
        </el-form-item>
        <el-form-item class="el-form--button">
          <el-button icon="el-icon-download" plain type="primary" @click="handleExport">导出</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.6)"
        style="width: 100%"
        fit
        highlight-current-row
      >
        <el-table-column prop="logType_dictText" label="日志类型" />
        <el-table-column prop="logContent" label="日志内容" min-width="180px" show-overflow-tooltip />
        <el-table-column prop="createBy" label="用户" />
        <el-table-column prop="ip" label="Ip" />
        <el-table-column prop="createTime" label="操作时间" width="180px" />
      </el-table>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'

  export default {
    name: 'LogManage',
    components: { Pagination },
    data() {
      return {
        list: [],
        total: 0,
        listLoading: false,
        dateRange: [],
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          createTime_begin: '',
          createTime_end: '',
          logContent: '',
          logType: '1'
        },
        logTypeArr: [
          {
            label: '登录日志',
            value: '1'
          },
          {
            label: '业务操作日志',
            value: '2'
          }
        ]
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        this.list = []
        if (this.dateRange && this.dateRange.length > 0) {
          this.listQuery.createTime_begin = this.dateRange[0]
          this.listQuery.createTime_end = this.dateRange[1]
        } else {
          this.listQuery.createTime_begin = ''
          this.listQuery.createTime_end = ''
        }
        const queryObj = Object.assign({}, this.listQuery)
        if (queryObj.logContent) {
          queryObj.logContent = '*' + queryObj.logContent + '*'
        }
        this.$store
          .dispatch('GetLogList', queryObj)
          .then((res) => {
            if (res.success) {
              if (res.result.pages > 0 && res.result.pages < this.listQuery.pageNo) {
                this.listQuery.pageNo = res.result.pages
                this.getList()
              } else {
                this.list = res.result.records
                this.total = res.result.total
              }
            } else {
              this.$handleErr(res)
            }
            this.listLoading = false
          })
          .catch((err) => {
            this.$handleErr(err)
            this.listLoading = false
          })
      },
      handleSearch() {
        this.listQuery.pageNo = 1
        this.getList()
      },
      handleExport() {
        if (this.dateRange && this.dateRange.length > 0) {
          this.listQuery.createTime_begin = this.dateRange[0]
          this.listQuery.createTime_end = this.dateRange[1]
        } else {
          this.listQuery.createTime_begin = ''
          this.listQuery.createTime_end = ''
        }
        const queryObj = Object.assign({}, this.listQuery)
        if (queryObj.logContent) {
          queryObj.logContent = '*' + queryObj.logContent + '*'
        }
        this.$store
          .dispatch('ExportLogList', queryObj)
          .then((res) => {
            if (res.data && res.headers['content-disposition']) {
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
              this.$handleErr(res)
            }
          })
          .catch((err) => {
            this.$handleErr(err)
          })
      }
    }
  }
</script>
<style lang="scss" scoped></style>
