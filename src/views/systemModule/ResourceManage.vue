<template>
  <div class="app-container">
    <div class="panel-style">
      <el-row :gutter="20">
        <el-col :span="12" class="col">
          <div class="grid-content">
            <div class="panel-heading">
              <div class="button-group">
                <el-button icon="el-icon-plus" type="primary" plain @click="handleCreate">添加一级菜单</el-button>
              </div>
            </div>
            <div class="panel-content">
              <el-input v-model.trim="filterText" placeholder="输入菜单名称进行过滤" />
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
                    <el-button type="success" plain icon="el-icon-plus" title="添加子菜单" @click="() => append(node, data)" />
                    <el-button type="primary" plain icon="el-icon-edit" title="编辑菜单" @click="() => edit(node, data)" />
                    <el-button type="danger" plain icon="el-icon-delete" title="删除菜单" @click="() => remove(node, data)" />
                  </span>
                </span>
              </el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="12" class="col">
          <div class="grid-content">
            <div class="panel-heading">
              <h3 class="panel-title">菜单信息</h3>
            </div>
            <div class="panel-content">
              <el-form ref="formRef" :model="temp" label-width="90px" :rules="resourceRules" @submit.native.prevent>
                <el-form-item label="菜单名称" prop="name">
                  <el-input v-model.trim="temp.name" placeholder="请输入菜单名称" />
                </el-form-item>
                <el-form-item label="菜单编码" prop="url">
                  <el-input v-model.trim="temp.url" :disabled="!!temp.id" placeholder="请输入菜单编码" />
                </el-form-item>
                <el-form-item label="菜单类型" prop="menuType">
                  <el-select v-model="temp.menuType" :disabled="!!temp.id" placeholder="请选择">
                    <el-option v-for="item in menuTypeArr" :key="item.VALUE" :label="item.TEXT" :value="item.VALUE" />
                  </el-select>
                </el-form-item>
                <el-form-item label="上级菜单">
                  <el-input v-model="parentName" disabled />
                </el-form-item>
                <el-form-item label="排序" prop="sortNo">
                  <el-input-number v-model="temp.sortNo" :min="0" controls-position="right" />
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
    name: 'ResourceManage',
    data() {
      return {
        list: [],
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        treeLoading: false,
        temp: {
          name: '', // 菜单名称
          url: '', // 菜单编码
          menuType: '0', // 菜单类型 '0'菜单，'1'子菜单，'2'按钮
          parentId: '', // 上级菜单Id
          sortNo: 0 // 排序
        },
        filterText: '',
        parentName: '',
        menuTypeArr: [],
        resourceRules: {
          name: [{ required: true, message: '菜单名称为必填项', trigger: 'blur' }],
          url: [{ required: true, message: '菜单编码为必填项', trigger: 'blur' }],
          menuType: [{ required: true, message: '菜单类型为必填项', trigger: 'change' }],
          sortNo: [{ required: true, message: '排序为必填项', trigger: 'blur' }]
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
      this.getMenuTypeArr()
    },
    methods: {
      getMenuTypeArr() {
        this.$store
          .dispatch('GetDictListByDictCode', 'menu_type')
          .then((res) => {
            if (res.success) {
              this.menuTypeArr = res.result
            } else {
              this.$handleErr(res)
            }
          })
          .catch((err) => {
            this.$handleErr(err)
          })
      },
      getTreeList() {
        this.treeLoading = true
        this.filterText = ''
        this.resetTemp()
        this.$store
          .dispatch('GetPermissionList')
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
        return data.name.indexOf(value) !== -1
      },
      resetTemp() {
        this.temp = {
          name: '', // 菜单名称
          url: '', // 菜单编码
          menuType: '0', // 菜单类型 '0'菜单，'1'子菜单，'2'按钮
          parentId: '', // 上级菜单Id
          sortNo: 0 // 排序
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
        this.temp.menuType = String(Number(data.menuType) + 1 > 2 ? 2 : Number(data.menuType) + 1)
        this.parentName = data.name
      },
      edit(node, data) {
        this.$refs.formRef.resetFields()
        this.temp = Object.assign(this.temp, data)
        this.temp.parentId = data.parentId
        this.parentName = node.parent.data.name ? node.parent.data.name : ''
      },
      remove(node, data) {
        this.$confirm('将删除该菜单及其子菜单, 确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$store
              .dispatch('DelPermission', { id: data.id })
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
          savePromise = 'EditPermission'
          notifyText = '修改成功'
        } else {
          savePromise = 'AddPermission'
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
