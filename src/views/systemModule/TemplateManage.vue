<template>
  <div class="app-container">
    <div class="panel-style">
      <el-row :gutter="20">
        <el-col :span="10" class="col">
          <div class="grid-content">
            <div class="panel-heading">
              <div class="button-group">
                <el-button type="primary" plain icon="el-icon-plus" @click="handleCreate">添加模板目录</el-button>
              </div>
            </div>
            <div class="panel-content">
              <el-input v-model.trim="filterText" placeholder="输入模板目录名称进行过滤" />
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
                @node-click="handleNodeClick"
              >
                <span slot-scope="{ node, data }" class="custom-justify">
                  <span class="span-left" :title="node.label">
                    {{ node.label }}
                  </span>
                  <span class="span-right">
                    <!-- <el-button type="success" plain icon="el-icon-plus" title="添加" @click.stop="() => append(node, data)" /> -->
                    <el-button type="primary" plain icon="el-icon-edit" title="编辑" @click.stop="() => edit(node, data)" />
                    <el-button type="danger" plain icon="el-icon-delete" title="删除" @click.stop="() => remove(node, data)" />
                  </span>
                </span>
              </el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content">
            <upload ref="upload" :file-type="0" :file-source-id="selectItem.id" :is-multiple="true" />
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="模板信息" :visible.sync="dialogFormVisible" width="800px">
      <div>
        <el-form ref="formRef" :model="temp" :rules="templateRules" label-width="120px" @submit.native.prevent>
          <el-form-item label="模板目录名称" prop="templateName">
            <el-input v-model="temp.templateName" placeholder="请输入模板目录名称" maxlength="50" show-word-limit />
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="temp.description" type="textarea" autosize resize="none" placeholder="请输入描述" maxlength="50" show-word-limit />
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input-number v-model="temp.sort" :min="0" controls-position="right" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button icon="el-icon-close" plain @click="dialogFormVisible = false">取消</el-button>
        <el-button v-preventClick type="primary" plain icon="el-icon-check" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getNameByType } from '@/utils/tools'
  import Upload from '@/components/Upload'
  export default {
    name: 'TemplateManage',
    components: {
      Upload
    },
    data() {
      return {
        dialogFormVisible: false,
        treeLoading: false,
        list: [],
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'templateName'
        },
        temp: {
          id: '',
          templateName: '',
          description: '',
          sort: '',
          templateType: '0',
          parentId: ''
        },
        templateRules: {
          templateName: [{ required: true, message: '模板目录名称为必填项', trigger: 'change' }],
          sort: [{ required: true, message: '排序为必填项', trigger: 'blur' }]
        },
        selectItem: {
          id: ''
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },
    mounted() {
      this.getTemplateTreeList()
    },
    methods: {
      getNameByType,
      getTemplateTreeList() {
        this.treeLoading = true
        this.filterText = ''
        this.$store
          .dispatch('GetTemplateTreeList', {
            templateType: '0'
          })
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
        return data.templateName.indexOf(value) !== -1
      },
      resetTemp() {
        this.temp = {
          id: '',
          templateName: '',
          description: '',
          sort: '',
          templateType: '0',
          parentId: ''
        }
      },
      handleCreate() {
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.formRef.resetFields()
          this.resetTemp()
        })
      },
      append(node, data) {
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.formRef.resetFields()
          this.resetTemp()
          this.temp.parentId = data.id
        })
      },
      edit(node, data) {
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.formRef.resetFields()
          this.temp = Object.assign(this.temp, data)
        })
      },
      handleSave() {
        let savePromise = ''
        if (this.temp.id) {
          savePromise = 'EditTemplate'
        } else {
          savePromise = 'AddTemplate'
        }
        this.$refs.formRef.validate((valid) => {
          if (valid) {
            this.$store
              .dispatch(savePromise, this.temp)
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
                      self.getTemplateTreeList()
                      self.selectItem.id = ''
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
      remove(node, data) {
        this.$confirm('将删除该模板, 确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$store
              .dispatch('DelTemplate', { id: data.id })
              .then((res) => {
                if (res.success) {
                  const self = this
                  this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success',
                    duration: 1000,
                    onClose() {
                      self.getTemplateTreeList()
                      self.selectItem.id = ''
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
      handleNodeClick(data) {
        this.selectItem = Object.assign(this.selectItem, data)
        this.$nextTick(() => {
          this.$refs.upload.handleInit()
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
