<template>
  <div class="app-container">
    <div class="panel-style">
      <el-form :inline="true" label-width="90px" @submit.native.prevent>
        <el-form-item>
          <el-input v-model.trim="listQuery.dictName" placeholder="字典名称" clearable @change="handleSearch" />
        </el-form-item>
        <el-form-item>
          <el-input v-model.trim="listQuery.dictCode" placeholder="字典编码" clearable @change="handleSearch" />
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
        fit
        highlight-current-row
      >
        <el-table-column label="序号" width="60px">
          <template slot-scope="scope">
            {{ (Number(listQuery.pageNo) - 1) * Number(listQuery.pageSize) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="字典名称" prop="dictName" />
        <el-table-column label="字典编码" prop="dictCode" />
        <el-table-column label="字典描述" prop="description" min-width="200px" show-overflow-tooltip />
        <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            <el-button type="primary" plain icon="el-icon-edit" title="编辑" @click="handleEdit(scope.row)" />
            <el-button type="danger" plain icon="el-icon-delete" title="删除" @click="handleDelete(scope.row)" />
            <el-button type="warning" plain icon="el-icon-edit-outline" title="字典项配置" @click="handleDialog(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
    <el-dialog title="字典信息" :visible.sync="dialogVisible" width="800px">
      <el-form ref="formRef" label-width="90px" :model="temp" :rules="dictRules" @submit.native.prevent>
        <el-form-item label="字典名称" prop="dictName">
          <el-input v-model.trim="temp.dictName" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item label="字典编码" prop="dictCode">
          <el-input v-model.trim="temp.dictCode" :disabled="!!temp.id" placeholder="请输入字典编码" @change="handleChange(temp)" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="temp.description" type="textarea" autosize resize="none" placeholder="请输入描述" maxlength="50" show-word-limit />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button icon="el-icon-close" plain @click="handleCancel">取消</el-button>
        <el-button v-preventClick type="primary" plain icon="el-icon-check" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible" title="字典项配置" width="800px">
      <dictionary-item-manage ref="dictItemRef" :dict-id="selectItem.dictId" :dict-code="selectItem.dictCode" />
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import dictionaryItemManage from './components/DictionaryItemManage'
  export default {
    name: 'DictionaryManage',
    components: {
      Pagination,
      dictionaryItemManage
    },
    data() {
      return {
        listLoading: false,
        list: [],
        total: 0,
        listQuery: {
          dictName: '',
          dictCode: '',
          pageNo: 1,
          pageSize: 10
        },
        temp: {
          dictName: '',
          dictCode: '',
          description: ''
        },
        dialogFormVisible: false,
        dialogVisible: false,
        selectItem: {
          dictId: '',
          dictCode: ''
        },
        dictRules: {
          dictName: [{ required: true, message: '字典名称为必填项', trigger: 'blur' }],
          dictCode: [{ required: true, message: '字典编码为必填项', trigger: 'blur' }]
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        this.list = []
        const queryObj = Object.assign({}, this.listQuery)
        if (queryObj.dictName) {
          queryObj.dictName = '*' + queryObj.dictName + '*'
        }
        if (queryObj.dictCode) {
          queryObj.dictCode = '*' + queryObj.dictCode + '*'
        }
        this.$store
          .dispatch('GetDictList', queryObj)
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
      resetTemp() {
        this.temp = {
          dictName: '',
          dictCode: '',
          description: ''
        }
      },
      handleCreate() {
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.formRef.resetFields()
          this.resetTemp()
        })
      },
      handleEdit(row) {
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.formRef.resetFields()
          this.temp = Object.assign(this.temp, row)
        })
      },
      handleCancel() {
        this.dialogVisible = false
      },
      handleChange(row) {
        // 输入字典编码，查看后台是否已存在
        this.$store
          .dispatch('CheckCode', {
            tableName: 'sys_dict',
            fieldName: 'dict_code',
            fieldVal: row.dictCode
          })
          .then((res) => {
            if (!res.success) {
              this.$handleErr(res)
              row.dictCode = ''
            }
          })
          .catch((err) => {
            this.$handleErr(err)
          })
      },
      handleSave() {
        let savePromise = ''
        let notifyText = ''
        if (this.temp.id) {
          savePromise = 'EditDict'
          notifyText = '修改成功'
        } else {
          savePromise = 'AddDict'
          notifyText = '添加成功'
        }
        this.$refs['formRef'].validate((valid) => {
          if (valid) {
            this.$store
              .dispatch(savePromise, this.temp)
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
                      self.dialogVisible = false
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
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$store
              .dispatch('DelDict', { id: row.id })
              .then(() => {
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
              })
              .catch((err) => {
                this.$handleErr(err)
              })
          })
          .catch(() => {})
      },
      handleDialog(row) {
        this.dialogFormVisible = true
        this.selectItem.dictId = row.id
        this.selectItem.dictCode = row.dictCode
        this.$nextTick(() => {
          this.$refs.dictItemRef.handleInit()
        })
      }
    }
  }
</script>
<style lang="scss" scoped></style>
