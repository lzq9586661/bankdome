<template>
  <div class="app-container">
    <div class="panel-style">
      <el-form :inline="true" label-width="90px" @submit.native.prevent>
        <el-form-item>
          <el-input v-model.trim="listQuery.roleName" placeholder="角色名称" clearable @change="handleSearch" />
        </el-form-item>
        <el-form-item>
          <el-input v-model.trim="listQuery.roleCode" placeholder="角色编码" clearable @change="handleSearch" />
        </el-form-item>
        <el-form-item class="el-form--button">
          <el-button v-if="checkPermission(['roleManage:option'])" type="primary" plain icon="el-icon-plus" @click="handleCreate">新增</el-button>
        </el-form-item>
      </el-form>
      <el-row :gutter="20">
        <el-col :span="16" class="col">
          <div class="grid-content">
            <div class="table-pagination">
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
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色编码" prop="roleCode"></el-table-column>
                <el-table-column label="角色描述" prop="description" min-width="160px"></el-table-column>
                <el-table-column label="操作" width="140px">
                  <template slot-scope="scope">
                    <el-button v-if="checkPermission(['roleManage:option'])" type="primary" plain icon="el-icon-edit" title="编辑" @click.stop="handleEdit(scope.row)" />
                    <el-button
                      v-if="scope.row.roleCode !== 'xtgl' && scope.row.roleCode !== 'aqbmgl' && scope.row.roleCode !== 'aqsjgl' && checkPermission(['roleManage:option'])"
                      type="danger"
                      plain
                      icon="el-icon-delete"
                      title="删除"
                      @click.stop="handleDelete(scope.row)"
                    />
                    <el-button
                      v-if="checkPermission(['roleManage:option'])"
                      type="warning"
                      plain
                      icon="el-icon-edit-outline"
                      title="授权"
                      @click.stop="handlePermission(scope.row)"
                    />
                  </template>
                </el-table-column>
              </el-table>
              <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="col" style="border: 1px solid #dcdfe6">
          <div class="panel-heading">
            <h3 class="panel-title">当前角色：{{ selectItem.roleName }}</h3>
            <div class="button-group">
              <el-button v-if="checkPermission(['roleManage:option'])" v-preventClick type="primary" plain icon="el-icon-check" @click="handleSavePermission">保存</el-button>
            </div>
          </div>
          <div class="panel-content">
            <div class="grid-content">
              <el-tree
                ref="tree"
                v-loading="treeLoading"
                :data="permissionTree"
                :props="defaultProps"
                class="filter-tree"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.6)"
                show-checkbox
                node-key="key"
                default-expand-all
                highlight-current
                check-strictly
              >
                <span slot-scope="{ node }" class="custom-justify">
                  <span :title="node.label">{{ node.label }}</span>
                </span>
              </el-tree>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="角色信息" :visible.sync="dialogVisible" width="800px">
      <el-form ref="formRef" label-width="120px" :model="temp" :rules="roleRules" @submit.native.prevent>
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model.trim="temp.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色编码" prop="roleCode">
          <el-input v-model.trim="temp.roleCode" placeholder="请输入角色编码" :disabled="!!temp.id" @change="handleChange" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="temp.description" placeholder="请输入角色描述" maxlength="50" show-word-limit />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button icon="el-icon-close" plain @click="dialogVisible = false">取消</el-button>
        <el-button v-preventClick type="primary" plain icon="el-icon-check" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { checkPermission } from '@/utils/permission'
  export default {
    name: 'RoleManage',
    components: { Pagination },
    data() {
      return {
        listLoading: false,
        treeLoading: false,
        selectItem: {
          id: '',
          roleName: ''
        },
        list: [],
        total: 0,
        listQuery: {
          roleName: '',
          roleCode: '',
          pageNo: 1,
          pageSize: 10
        },
        temp: {
          roleName: '',
          roleCode: '',
          description: ''
        },
        permissionTree: [],
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        dialogVisible: false,
        roleRules: {
          roleName: [{ required: true, message: '角色名称为必填项', trigger: 'blur' }],
          roleCode: [{ required: true, message: '角色编码为必填项', trigger: 'blur' }]
        }
      }
    },
    mounted() {
      this.getList()
      this.getPermissionList()
    },
    methods: {
      checkPermission,
      getList() {
        this.listLoading = true
        this.list = []
        const queryObj = Object.assign({}, this.listQuery)
        if (queryObj.roleName) {
          queryObj.roleName = '*' + queryObj.roleName + '*'
        }
        if (queryObj.roleCode) {
          queryObj.roleCode = '*' + queryObj.roleCode + '*'
        }
        this.$store
          .dispatch('GetRoleList', queryObj)
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
          roleName: '',
          roleCode: '',
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
      handleChange() {
        // 输入角色编码，查看后台是否已存在
        this.$store
          .dispatch('CheckRoleCode', { roleCode: this.temp.roleCode })
          .then((res) => {
            if (!res.success) {
              this.$handleErr(res)
              this.temp.roleCode = ''
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
          savePromise = 'EditRole'
          notifyText = '修改成功'
        } else {
          savePromise = 'AddRole'
          notifyText = '添加成功'
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
                    message: notifyText,
                    type: 'success',
                    duration: 1000,
                    onClose() {
                      self.getList()
                      self.dialogVisible = false
                      self.selectItem = {
                        id: '',
                        roleName: ''
                      }
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
              .dispatch('DelRole', { id: row.id })
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
                      self.selectItem = {
                        id: '',
                        roleName: ''
                      }
                      self.$refs.tree.setCheckedKeys([])
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
      getPermissionList() {
        this.treeLoading = true
        this.$store
          .dispatch('GetPermissionList')
          .then((res) => {
            if (res.success) {
              this.permissionTree = res.result
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
      getRolePermission() {
        this.$store
          .dispatch('GetRolePermission', { roleId: this.selectItem.id })
          .then((res) => {
            if (res.success) {
              this.$refs.tree.setCheckedKeys(res.result)
            } else {
              this.$handleErr(res)
            }
          })
          .catch((err) => {
            this.$handleErr(err)
          })
      },
      handlePermission(row) {
        this.selectItem = Object.assign({}, row)
        this.getRolePermission()
      },
      handleSavePermission() {
        if (!this.selectItem.id) {
          this.$message({
            message: '请先选择角色后再授权！',
            type: 'error',
            duration: 1000
          })
          return false
        }
        const data = {
          permissionIds: this.$refs.tree.getCheckedKeys().join(','),
          roleId: this.selectItem.id
        }
        this.$store
          .dispatch('SaveRolePermission', data, 20000)
          .then((res) => {
            if (res.success) {
              const self = this
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                duration: 1000,
                onClose() {
                  self.$refs.tree.setCheckedKeys([])
                  self.selectItem = {
                    id: '',
                    roleName: ''
                  }
                }
              })
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
<style lang="scss" scoped>
  .filter-tree {
    height: calc(100vh - 380px);
    overflow: auto;
  }
</style>
