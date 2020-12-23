<template>
  <div class="app-container">
    <div class="panel-style">
      <el-form :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-input v-model.trim="listQuery.noticeTitle" placeholder="标题" clearable @change="handleSearch" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="listQuery.noticeType" placeholder="类型" clearable @change="handleSearch">
            <el-option v-for="item in noticeTypeArr" :key="item.ID" :label="item.TEXT" :value="item.VALUE" />
          </el-select>
        </el-form-item>
        <el-form-item class="el-form--button">
          <el-button type="primary" plain icon="el-icon-plus" @click="handleCreate">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.6)"
        style="width: 100%"
      >
        <el-table-column label="序号" width="60px">
          <template slot-scope="scope">
            {{ (Number(listQuery.pageNo) - 1) * Number(listQuery.pageSize) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="noticeTitle" label="标题" min-width="160px" />
        <el-table-column prop="noticeTerm" label="失效时间" width="160px" />
        <el-table-column prop="noticeType_dictText" label="类型" />
        <el-table-column prop="priority_dictText" label="优先级" />
        <el-table-column prop="noticeLevel_dictText" label="发布状态" />
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button v-show="scope.row.noticeLevel !== '1'" type="primary" icon="el-icon-edit" plain title="编辑" @click="handleEdit(scope.row)" />
            <el-button type="danger" icon="el-icon-delete" plain title="删除" @click="handleDelete(scope.row)" />
            <el-button v-if="scope.row.noticeLevel !== '1'" type="warning" icon="el-icon-edit-outline" plain title="发布" @click="handlePublishRevokeNotice(scope.row, '1')" />
            <el-button v-if="scope.row.noticeLevel === '1'" type="warning" icon="el-icon-circle-close" plain title="撤销" @click="handlePublishRevokeNotice(scope.row, '2')" />
            <el-button type="success" icon="el-icon-view" plain title="查看" @click="handleView(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
    <el-dialog title="通告信息" :visible.sync="dialogFormVisible" :modal-append-to-body="false" width="800px">
      <el-form ref="formRef" :model="temp" :rules="noticeRules" label-width="80px" @submit.native.prevent>
        <el-form-item label="标题" prop="noticeTitle">
          <el-input v-model.trim="temp.noticeTitle" placeholder="标题" />
        </el-form-item>
        <el-form-item label="内容" prop="noticeContent">
          <tinymce ref="tinymce" v-model.trim="temp.noticeContent" :height="200" />
        </el-form-item>
        <el-form-item label="失效时间" prop="noticeTerm">
          <el-date-picker v-model="temp.noticeTerm" :picker-options="pickerOptions" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" />
        </el-form-item>
        <el-form-item label="类型" prop="noticeType">
          <el-select v-model="temp.noticeType" placeholder="请选择">
            <el-option v-for="item in noticeTypeArr" :key="item.ID" :label="item.TEXT" :value="item.VALUE" />
          </el-select>
        </el-form-item>
        <el-form-item label="优先级" prop="priority">
          <el-select v-model="temp.priority" placeholder="请选择">
            <el-option v-for="item in priorityArr" :key="item.ID" :label="item.TEXT" :value="item.VALUE" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="temp.noticeType === '1'" label="通告部门">
          <el-tree ref="tree" :data="departmentTree" :props="defaultProps" :default-checked-keys="checkedKeys" show-checkbox node-key="key" highlight-current />
        </el-form-item>
        <el-form-item v-if="temp.noticeType === '1'" label="指定用户">
          <el-select v-model="temp.userIds" clearable filterable multiple placeholder="全部">
            <el-option v-for="item in userArr" :key="item.id" :label="item.realname" :value="item.id">
              <span class="custom-justify">
                <span>{{ item.realname }}</span>
                <span class="span-set">
                  <span v-if="!!item.ministryName">
                    {{ item.ministryName }}
                  </span>
                  <span v-if="!!item.bureauName">
                    {{ ' - ' + item.bureauName }}
                  </span>
                  <span v-if="!!item.officeName">
                    {{ ' - ' + item.officeName }}
                  </span>
                </span>
              </span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-close" plain @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" icon="el-icon-check" plain @click="handleSave">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog class="notice-dialog" :visible.sync="dialogContentVisible" width="900px" top="30px">
      <notice-detail :notice-info="temp"></notice-detail>
    </el-dialog>
  </div>
</template>

<script>
  import NoticeDetail from '@/views/systemModule/components/NoticeDetail'
  import Pagination from '@/components/Pagination'
  import Tinymce from '@/components/Tinymce'
  import { getNameByType } from '@/utils/tools'

  export default {
    name: 'NoticeManage',
    components: { Pagination, Tinymce, NoticeDetail },
    data() {
      return {
        list: [],
        total: 0,
        listLoading: false,
        listQuery: {
          noticeTitle: '',
          noticeType: '',
          pageNo: 1,
          pageSize: 10
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7 // 如果没有后面的-8.64e7就是不可以选择今天的
          }
        },
        dialogFormVisible: false,
        checkedKeys: [],
        temp: {
          noticeTitle: '', // 标题
          noticeContent: '', // 内容
          noticeTerm: '', // 失效时间
          priority: '0', // 优先级
          noticeType: '0', // 通告类型
          deptIds: [], // 部门
          userIds: [] // 通知的人
        },
        noticeTypeArr: [],
        priorityArr: [],
        departmentTree: [],
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        userArr: [],
        dialogContentVisible: false,
        noticeRules: {
          noticeTitle: [{ required: true, message: '标题为必填项', trigger: 'blur' }],
          noticeContent: [{ required: true, message: '内容为必填项', trigger: 'blur' }],
          noticeTerm: [{ required: true, message: '失效时间为必填项', trigger: 'blur' }],
          noticeType: [{ required: true, message: '类型为必填项', trigger: 'change' }],
          priority: [{ required: true, message: '优先级为必填项', trigger: 'change' }]
        }
      }
    },
    mounted() {
      this.getList()
      this.getPriorityArr()
      this.getNoticeTypeArr()
      this.getAllUserList()
      this.getDepartTreeList()
    },
    methods: {
      getNameByType,
      getList() {
        this.listLoading = true
        this.list = []
        const query = Object.assign({}, this.listQuery)
        if (query.noticeTitle) {
          query.noticeTitle = '*' + query.noticeTitle + '*'
        }
        this.$store
          .dispatch('GetNoticeList', query)
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
      getPriorityArr() {
        this.$store
          .dispatch('GetDictListByDictCode', 'priority')
          .then((res) => {
            if (res.success) {
              this.priorityArr = res.result
            } else {
              this.$handleErr(res)
            }
          })
          .catch((err) => {
            this.$handleErr(err)
          })
      },
      getNoticeTypeArr() {
        this.$store
          .dispatch('GetDictListByDictCode', 'notice_type')
          .then((res) => {
            if (res.success) {
              this.noticeTypeArr = res.result
            } else {
              this.$handleErr(res)
            }
          })
          .catch((err) => {
            this.$handleErr(err)
          })
      },
      getAllUserList() {
        this.$store
          .dispatch('GetAllUserList')
          .then((res) => {
            if (res.success) {
              this.userArr = res.result
            } else {
              this.$handleErr(res)
            }
          })
          .catch((err) => {
            this.$handleErr(err)
          })
      },
      getDepartTreeList() {
        this.$store
          .dispatch('GetDepartTreeList')
          .then((res) => {
            if (res.success) {
              this.departmentTree = res.result
            } else {
              this.$handleErr(res)
            }
          })
          .catch((err) => {
            this.$handleErr(err)
          })
      },
      resetTemp() {
        this.temp = {
          noticeTitle: '', // 标题
          noticeContent: '', // 内容
          noticeTerm: '', // 结束时间
          priority: '0', // 优先级
          noticeType: '0', // 通告类型
          deptIds: [], // 通告对象
          userIds: [] // 通知的人
        }
      },
      handleCreate() {
        this.resetTemp()
        this.checkedKeys = null
        this.flag = true
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.tinymce.setContent(this.temp.noticeContent)
        })
      },
      handleEdit(row) {
        this.temp = row
        this.flag = true
        this.temp.deptIds = row.deptIds ? row.deptIds.split(',') : []
        this.temp.userIds = row.userIds ? row.userIds.split(',') : []
        this.checkedKeys = this.temp.deptIds
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.tinymce.setContent(this.temp.noticeContent)
        })
      },
      handleSave() {
        if (this.temp.noticeType === '1') {
          this.checkedKeys = this.$refs.tree.getCheckedKeys()
          this.temp.deptIds = this.checkedKeys.slice(0)
          if (!(this.temp.deptIds.length > 0 || this.temp.userIds.length > 0)) {
            this.$message({
              showClose: true,
              message: '请填写通告部门或通告对象后再保存',
              type: 'error',
              duration: 1000
            })
            return false
          }
        }
        let savePromise = ''
        if (this.temp.id) {
          savePromise = 'EditNotice'
        } else {
          savePromise = 'AddNotice'
        }
        const query = Object.assign({}, this.temp)
        query.deptIds = query.deptIds.join(',')
        query.userIds = query.userIds.join(',')
        this.$refs.formRef.validate((valid) => {
          if (valid) {
            this.$store
              .dispatch(savePromise, query)
              .then((res) => {
                if (res.success) {
                  const self = this
                  this.$notify({
                    title: '成功',
                    message: '保存成功',
                    type: 'success',
                    duration: 1000,
                    onClose() {
                      self.dialogFormVisible = false
                      self.getList()
                    }
                  })
                } else {
                  this.$handleErr(res)
                }
              })
              .catch((err) => {
                this.$handleErr(err)
              })
          } else {
            this.$message({
              message: '页面有必填项未填写或者填写格式有误，请检查后重新填写',
              type: 'error',
              duration: 2000
            })
            return false
          }
        })
      },
      handleDelete(row) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$store
              .dispatch('DelNotice', { id: row.id })
              .then((res) => {
                if (res.success) {
                  const self = this
                  this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success',
                    duration: 1000,
                    onClose() {
                      self.getList()
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
      },
      handlePublishRevokeNotice(row, index) {
        let confirmText = ''
        let notifyText = ''
        if (index === 2) {
          confirmText = '是否撤销'
          notifyText = '撤销成功'
        } else if (index === 1) {
          confirmText = '是否发布'
          notifyText = '发布成功'
        }
        this.$confirm(confirmText, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$store
              .dispatch('PublishRevokeNotice', {
                id: row.id,
                noticeLevel: index
              })
              .then((res) => {
                if (res.success) {
                  const self = this
                  this.$notify({
                    title: '成功',
                    message: notifyText,
                    type: 'success',
                    duration: 1000,
                    onClose() {
                      self.getList()
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
      },
      handleView(row) {
        this.temp = Object.assign(this.temp, row)
        this.dialogContentVisible = true
      }
    }
  }
</script>
<style lang="scss" scoped></style>
