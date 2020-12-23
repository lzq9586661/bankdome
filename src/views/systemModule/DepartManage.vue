<template>
  <div class="app-container">
    <div class="panel-style">
      <el-row :gutter="20">
        <el-col :span="12" class="col">
          <div class="grid-content">
            <div class="panel-heading">
              <div class="button-group">
                <el-button icon="el-icon-plus" type="primary" plain @click="handleCreate">添加一级部门</el-button>
              </div>
            </div>
            <div class="panel-content">
              <el-input v-model.trim="filterText" placeholder="输入部门名称进行过滤" />
              <el-tree
                ref="tree"
                v-loading="treeLoading"
                :data="list"
                :props="defaultProps"
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.6)"
                class="filter-tree"
                default-expand-all
                highlight-current
              >
                <span slot-scope="{ node, data }" class="custom-justify">
                  <span class="span-left" :title="node.label">
                    {{ node.label }}
                  </span>
                  <span class="span-right">
                    <el-button type="success" plain icon="el-icon-plus" title="添加子部门" @click="() => append(node, data)" />
                    <el-button type="primary" plain icon="el-icon-edit" title="编辑部门" @click="() => edit(node, data)" />
                    <el-button type="danger" plain icon="el-icon-delete" title="删除部门" @click="() => remove(node, data)" />
                  </span>
                </span>
              </el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="12" class="col">
          <div class="grid-content">
            <div class="panel-heading">
              <h3 class="panel-title">部门信息</h3>
            </div>
            <div class="panel-content">
              <el-form ref="formRef" :model="temp" label-width="90px" :rules="resourceRules" @submit.native.prevent>
                <el-form-item label="部门名称" prop="departName">
                  <el-input v-model.trim="temp.departName" placeholder="请输入部门名称" />
                </el-form-item>
                <el-form-item label="上级部门">
                  <el-input v-model="parentName" disabled />
                </el-form-item>
                <el-form-item label="排序" prop="departOrder">
                  <el-input-number v-model="temp.departOrder" :min="0" controls-position="right" />
                </el-form-item>
                <div class="operate-content">
                  <el-button v-preventClick icon="el-icon-check" type="primary" plain @click="handleSave">保存</el-button>
                </div>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DepartManage',
    data() {
      return {
        list: [],
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        treeLoading: false,
        temp: {
          departName: '', // 部门名称
          parentId: '', // 上级部门Id
          departOrder: 0 // 排序
        },
        filterText: '',
        parentName: '',
        resourceRules: {
          departName: [{ required: true, message: '部门名称为必填项', trigger: 'blur' }],
          departOrder: [{ required: true, message: '排序为必填项', trigger: 'blur' }]
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },
    mounted() {
      this.getTreeList()
    },
    methods: {
      getTreeList() {
        this.treeLoading = true
        this.filterText = ''
        this.resetTemp()
        this.$store
          .dispatch('GetDepartTreeList')
          .then((res) => {
            if (res.success) {
              this.list = res.result
            } else {
              this.$handleErr(res)
            }
            this.treeLoading = false
          })
          .catch((err) => {
            this.$handleErr(err)
            this.treeLoading = false
          })
      },
      filterNode(value, data) {
        if (!value) return true
        return data.departName.indexOf(value) !== -1
      },
      resetTemp() {
        this.temp = {
          departName: '', // 部门名称
          parentId: '', // 上级部门Id
          departOrder: 0 // 排序
        }
        this.parentName = ''
      },
      handleCreate() {
        this.$refs.formRef.resetFields()
        this.resetTemp()
      },
      append(node, data) {
        this.$refs.formRef.resetFields()
        this.resetTemp()
        this.temp.parentId = data.id
        this.parentName = data.departName
      },
      edit(node, data) {
        this.$refs.formRef.resetFields()
        this.temp = Object.assign(this.temp, data)
        this.temp.parentId = data.parentId
        this.parentName = node.parent.data.departName ? node.parent.data.departName : ''
      },
      remove(node, data) {
        this.$confirm('将删除该部门及其子部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$store
              .dispatch('DelDepart', { ids: data.id })
              .then((res) => {
                if (res.success) {
                  const self = this
                  this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success',
                    duration: 1000,
                    onClose() {
                      self.getTreeList()
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
      handleSave() {
        let savePromise = ''
        let notifyText = ''
        if (this.temp.id) {
          savePromise = 'EditDepart'
          notifyText = '修改成功'
        } else {
          savePromise = 'AddDepart'
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
                      self.getTreeList()
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
      }
    }
  }
</script>
<style lang="scss" scoped>
  .grid-content {
    height: calc(100vh - 250px);
    overflow: auto;
    border: 1px solid #f0f2f5;
    .filter-tree {
      height: calc(100vh - 370px);
      overflow: auto;
    }
  }
</style>
