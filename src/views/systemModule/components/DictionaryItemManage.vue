<template>
  <div>
    <div>
      <el-form :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-input v-model.trim="listQuery.itemText" placeholder="名称" clearable @change="handleSearch" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="listQuery.status" placeholder="状态" clearable @change="handleSearch">
            <el-option v-for="item in statusArr" :key="item.ID" :label="item.TEXT" :value="item.VALUE" />
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
        fit
        highlight-current-row
      >
        <el-table-column label="序号" width="60px">
          <template slot-scope="scope">
            {{ (Number(listQuery.pageNo) - 1) * Number(listQuery.pageSize) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="itemText" />
        <el-table-column label="值" prop="itemValue" />
        <el-table-column label="描述" prop="description" show-overflow-tooltip />
        <el-table-column label="排序" prop="sortOrder" />
        <el-table-column label="状态" prop="status_dictText" />
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <el-button type="primary" plain icon="el-icon-edit" title="编辑" @click="handleEdit(scope.row)" />
            <el-button type="danger" plain icon="el-icon-delete" title="删除" @click="handleDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
    <el-dialog title="字典项信息" :visible.sync="dialogVisible" width="800px" append-to-body>
      <el-form ref="formRef" label-width="90px" :model="temp" :rules="dictItemRules" @submit.native.prevent>
        <el-form-item label="名称" prop="itemText">
          <el-input v-model.trim="temp.itemText" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="值" prop="itemValue">
          <el-input v-model.trim="temp.itemValue" placeholder="请输入值" :disabled="!!temp.id" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="temp.description" placeholder="请输入描述" maxlength="50" show-word-limit />
        </el-form-item>
        <el-form-item label="排序" prop="sortOrder">
          <el-input-number v-model="temp.sortOrder" :min="0" controls-position="right" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="temp.status" placeholder="请选择">
            <el-option v-for="item in statusArr" :key="item.ID" :label="item.TEXT" :value="item.VALUE" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button icon="el-icon-close" plain @click="handleCancel">取消</el-button>
        <el-button v-preventClick type="primary" plain icon="el-icon-check" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'

  export default {
    name: 'DictionaryItemManage',
    components: { Pagination },
    props: {
      dictId: {
        type: String,
        default: '',
        required: true
      },
      dictCode: {
        type: String,
        default: '',
        required: true
      }
    },
    data() {
      return {
        listLoading: false,
        list: [],
        total: 0,
        listQuery: {
          itemText: '',
          status: '',
          dictId: '',
          pageNo: 1,
          pageSize: 10
        },
        temp: {
          dictId: '',
          dictCode: '',
          itemText: '',
          itemValue: '',
          description: '',
          sortOrder: 0,
          status: '1'
        },
        statusArr: [],
        dialogVisible: false,
        dictItemRules: {
          itemText: [{ required: true, message: '名称为必填项', trigger: 'blur' }],
          itemValue: [{ required: true, message: '值为必填项', trigger: 'blur' }],
          sortOrder: [{ required: true, message: '排序为必填项', trigger: 'blur' }]
        }
      }
    },
    methods: {
      handleInit() {
        this.getStatusArr()
        this.getList()
      },
      getStatusArr() {
        this.$store
          .dispatch('GetDictListByDictCode', 'dict_item_status')
          .then((res) => {
            if (res.success) {
              this.statusArr = res.result
            } else {
              this.$handleErr(res)
            }
          })
          .catch((err) => {
            this.$handleErr(err)
          })
      },
      getList() {
        this.listLoading = true
        this.list = []
        this.listQuery.dictId = this.dictId
        const queryObj = Object.assign({}, this.listQuery)
        if (queryObj.itemText) {
          queryObj.itemText = '*' + queryObj.itemText + '*'
        }
        this.$store
          .dispatch('GetDictItemList', queryObj)
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
          dictId: this.dictId,
          dictCode: this.dictCode,
          itemText: '',
          itemValue: '',
          description: '',
          sortOrder: 0,
          status: '1'
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
          this.temp.dictCode = this.dictCode
        })
      },
      handleChangeText(row) {
        this.$store
          .dispatch('CheckCodeDictItemCode', {
            dictId: this.dictId,
            itemText: row.itemText
          })
          .then((res) => {
            if (!res.success) {
              this.$handleErr(res)
              row.itemText = ''
            }
          })
          .catch((err) => {
            this.$handleErr(err)
          })
      },
      handleChangeValue(row) {
        this.$store
          .dispatch('CheckCodeDictItemCode', {
            dictId: this.dictId,
            itemValue: row.itemValue
          })
          .then((res) => {
            if (!res.success) {
              this.$handleErr(res)
              row.itemValue = ''
            }
          })
          .catch((err) => {
            this.$handleErr(err)
          })
      },
      handleCancel() {
        this.dialogVisible = false
      },
      handleSave() {
        let savePromise = ''
        let notifyText = ''
        if (this.temp.id) {
          savePromise = 'EditDictItem'
          notifyText = '修改成功'
        } else {
          savePromise = 'AddDictItem'
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
              .dispatch('DelDictItem', { id: row.id })
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
      }
    }
  }
</script>
<style lang="scss" scoped></style>
