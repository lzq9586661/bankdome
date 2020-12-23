<template>
  <div class="app-container">
    <div class="panel-style">
      <el-form :inline="true" label-width="90px" @submit.native.prevent>
        <el-form-item>
          <el-input v-model.trim="listQuery.username" placeholder="用户名" clearable @change="handleSearch" />
        </el-form-item>
        <el-form-item>
          <el-input v-model.trim="listQuery.realname" placeholder="真实姓名" clearable @change="handleSearch" />
        </el-form-item>
        <el-form-item>
          <el-input v-model.trim="listQuery.workNumber" placeholder="工号" clearable @change="handleSearch" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="listQuery.status" placeholder="状态" @change="handleSearch">
            <el-option v-for="item in statusArr" :key="item.VALUE" :label="item.TEXT" :value="item.VALUE" />
          </el-select>
        </el-form-item>
        <el-form-item class="el-form--button">
          <el-button v-if="checkPermission(['userManage:option'])" type="primary" plain icon="el-icon-plus" @click="handleCreate">新增</el-button>
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
          <template slot-scope="scope">{{ (Number(listQuery.pageNo) - 1) * Number(listQuery.pageSize) + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="realname" label="真实姓名" />
        <el-table-column prop="sex_dictText" label="性别" />
        <el-table-column prop="departNames" label="部门" />
        <el-table-column prop="workNumber" label="工号" />
        <el-table-column prop="phone" label="联系方式" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="roleNames" label="角色" />
        <el-table-column prop="status_dictText" label="状态" />
        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
            <el-button
              v-if="checkPermission(['userManage:option']) && scope.row.username !== 'admin'"
              type="primary"
              plain
              icon="el-icon-edit"
              title="编辑"
              @click="handleEdit(scope.row)"
            />
            <el-button
              v-if="checkPermission(['userManage:option']) && scope.row.username !== 'admin'"
              type="danger"
              plain
              icon="el-icon-delete"
              title="删除"
              @click="handleDelete(scope.row)"
            />
            <el-button
              v-if="checkPermission(['userManage:option']) && scope.row.username !== 'admin'"
              type="warning"
              plain
              icon="el-icon-edit-outline"
              title="修改密码"
              @click="handleChangePassword(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :before-close="handleCancel" width="900px" top="30px">
      <el-form v-if="flag" ref="userForm" :model="temp" :rules="userRules" label-width="90px" @submit.native.prevent>
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="temp.username" :disabled="!!temp.id" placeholder="请输入用户名" @change="handleChange('username')" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model.trim="temp.realname" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item v-if="!temp.id" label="密码" prop="password">
          <el-input v-model.trim="temp.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="temp.sex" placeholder="请选择">
            <el-option v-for="item in sexArr" :key="item.VALUE" :label="item.TEXT" :value="item.VALUE" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="departmentNames" required>
          <div class="part-content" :class="{ 'part-required': partRequired }" @click="handleShowTree">{{ temp.departmentNames }}</div>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input v-model.trim="temp.workNumber" placeholder="请输入工号" @change="handleChange('workNumber')" />
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model.trim="temp.phone" placeholder="请输入电话号码或者手机号码" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="temp.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="temp.status" placeholder="请选择">
            <el-option v-for="item in statusArr" :key="item.VALUE" :label="item.TEXT" :value="item.VALUE" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="selectedroles">
          <el-select v-model="temp.selectedroles" multiple placeholder="请选择" filterable>
            <el-option v-for="item in roleArr" :key="item.value" :label="item.roleName" :value="item.id" :disabled="!item.status" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button icon="el-icon-close" plain @click="handleCancel">取消</el-button>
        <el-button v-preventClick icon="el-icon-check" plain type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="部门选择" :visible.sync="dialogTreeFormVisible" :before-close="handleCancel2" append-to-body width="900px">
      <el-tree
        ref="tree"
        :data="departmentArr"
        show-checkbox
        default-expand-all
        node-key="id"
        highlight-current
        :props="defaultProps"
        :default-checked-keys="checkedKeys"
        check-strictly
      ></el-tree>
      <div slot="footer">
        <el-button icon="el-icon-close" plain @click="handleCancel2">取消</el-button>
        <el-button v-preventClick icon="el-icon-check" plain type="primary" @click="handleSave2">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { validateUsername, validateRealname, validatePassword, validEmail, validateTelephone } from '@/utils/validate'
  import { deepClone } from '@/utils/index'
  import { checkPermission } from '@/utils/permission'

  export default {
    name: 'UserManage',
    components: {
      Pagination
    },
    data() {
      const inspectUsername = (rule, value, callback) => {
        if (!value || !validateUsername(value)) {
          callback(new Error('用户名为必填项'))
        } else {
          callback()
        }
      }
      const inspectRealname = (rule, value, callback) => {
        if (!value || !validateRealname(value)) {
          callback(new Error('真实姓名为必填项'))
        } else {
          callback()
        }
      }
      const inspectPassword = (rule, value, callback) => {
        if (!validatePassword(value)) {
          callback(new Error('密码由小写字母数字或下划线的组成，长度在6-18位之间'))
        } else {
          callback()
        }
      }
      const inspectDepartNames = (rule, value, callback) => {
        if (value && value === '选择部门') {
          this.partRequired = true
          callback(new Error('部门为必填项'))
        } else {
          this.partRequired = false
          callback()
        }
      }
      const inspectTelephone = (rule, value, callback) => {
        if (value && !validateTelephone(value)) {
          callback(new Error('请输入区号-号码段形式的电话'))
        } else {
          callback()
        }
      }
      const inspectEmail = (rule, value, callback) => {
        if (value && !validEmail(value)) {
          callback(new Error('请正确格式的邮箱'))
        } else {
          callback()
        }
      }
      return {
        list: [],
        showFlag: false,
        showTree: false,
        total: 0,
        listLoading: false,
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          username: '',
          realname: '',
          workNumber: '',
          status: '1'
        },
        dialogFormVisible: false,
        dialogTreeFormVisible: false,
        flag: false,
        temp: {
          username: '',
          realname: '',
          password: '',
          sex: '',
          departIds: '',
          departmentNames: '选择部门',
          workNumber: '',
          phone: '',
          email: '',
          status: '1',
          selectedroles: [],
          roleIds: ''
        },
        departmentArr: [],
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        checkedKeys: [],
        roleArr: [],
        statusArr: [],
        sexArr: [],
        userRules: {
          username: [{ required: true, trigger: 'blur', validator: inspectUsername }],
          realname: [{ required: true, trigger: 'blur', validator: inspectRealname }],
          password: [{ required: true, trigger: 'blur', validator: inspectPassword }],
          departmentNames: [{ required: false, trigger: 'blur', validator: inspectDepartNames }],
          phone: [{ required: false, trigger: 'blur', validator: inspectTelephone }],
          email: [{ required: false, trigger: 'blur', validator: inspectEmail }],
          status: [{ required: true, message: '状态为必填项', trigger: 'change' }],
          workNumber: [{ required: false, message: '工号为必填项', trigger: 'blur' }],
          selectedroles: [{ required: true, message: '角色为必填项', trigger: 'change' }]
        },
        partRequired: false
      }
    },
    mounted() {
      this.getList()
      this.getDepartTreeList()
      this.getRoleList()
      this.getUserStatusArr()
      this.getSexArr()
    },
    methods: {
      checkPermission,
      getUserStatusArr() {
        this.$store
          .dispatch('GetDictListByDictCode', 'user_status')
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
      getSexArr() {
        this.$store
          .dispatch('GetDictListByDictCode', 'sex')
          .then((res) => {
            if (res.success) {
              this.sexArr = res.result
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
        const queryObj = Object.assign({}, this.listQuery)
        if (queryObj.username) {
          queryObj.username = '*' + queryObj.username + '*'
        }
        if (queryObj.realname) {
          queryObj.realname = '*' + queryObj.realname + '*'
        }
        if (queryObj.workNumber) {
          queryObj.workNumber = '*' + queryObj.workNumber + '*'
        }
        this.$store
          .dispatch('GetUserList', queryObj)
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
      getDepartTreeList() {
        this.$store
          .dispatch('GetDepartTreeList')
          .then((res) => {
            if (res.success) {
              this.departmentArr = res.result
            } else {
              this.$handleErr(res)
            }
          })
          .catch((err) => {
            this.$handleErr(err)
          })
      },
      getRoleList() {
        this.$store
          .dispatch('GetAllRoleList')
          .then((res) => {
            if (res.success) {
              this.roleArr = res.result
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
          username: '',
          realname: '',
          password: '',
          sex: '',
          departIds: '',
          departmentNames: '选择部门',
          workNumber: '',
          phone: '',
          email: '',
          status: '1',
          selectedroles: [],
          roleIds: ''
        }
        this.partRequired = false
      },
      handleCreate() {
        this.dialogFormVisible = true
        this.flag = true
        setTimeout(() => {
          this.$refs.userForm.resetFields()
          this.resetTemp()
        }, 300)
      },
      handleEdit(row) {
        this.getRoleList()
        this.dialogFormVisible = true
        this.flag = true
        setTimeout(() => {
          this.$refs.userForm.resetFields()
          this.temp = Object.assign(this.temp, row)
          this.temp.selectedroles = this.temp.roleIds ? this.temp.roleIds.split(',') : []
          this.temp.departmentNames = this.temp.departNames ? this.temp.departNames : '选择部门'
        }, 300)
      },
      handleShowTree() {
        this.dialogTreeFormVisible = true
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(this.temp.departIds ? this.temp.departIds.split(',') : [])
        })
      },
      handleChange(name) {
        if (this.temp.username && name === 'username') {
          // 输入用户名，查看后台是否已存在
          this.$store
            .dispatch('CheckUsername', { username: this.temp.username })
            .then((res) => {
              if (!res.success) {
                this.temp.username = ''
                this.$handleErr(res)
              }
            })
            .catch((err) => {
              this.$handleErr(err)
            })
        } else if (this.temp.workNumber && name === 'workNumber') {
          // 输入用户名，查看后台是否已存在
          this.$store
            .dispatch('CheckUsername', { workNumber: this.temp.workNumber })
            .then((res) => {
              if (!res.success) {
                this.temp.workNumber = ''
                this.$handleErr(res)
              }
            })
            .catch((err) => {
              this.$handleErr(err)
            })
        }
      },
      handleCancel() {
        this.dialogFormVisible = false
      },
      handleSave() {
        let savePromise = ''
        let notifyText = ''
        let data = ''
        if (this.flag) {
          if (this.temp.id) {
            savePromise = 'EditUser'
            notifyText = '修改成功'
          } else {
            savePromise = 'AddUser'
            notifyText = '保存成功'
          }
          data = deepClone(this.temp)
          data.roleIds = data.selectedroles.join()
          data.selectedroles = data.selectedroles.join()
          data.departmentNames = data.departmentNames === '选择部门' ? '' : data.departmentNames
        }
        this.$refs.userForm.validate((valid) => {
          if (valid) {
            this.$store
              .dispatch(savePromise, data)
              .then((res) => {
                if (res.success) {
                  const self = this
                  this.$notify({
                    title: '成功',
                    message: notifyText,
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

      handleCancel2() {
        this.dialogTreeFormVisible = false
      },
      handleSave2() {
        if (!this.$refs.tree.getCheckedKeys().length) {
          this.$message({
            message: '至少选择一个选择部门！',
            type: 'error',
            duration: 2000
          })
          return false
        }
        this.temp.departIds = this.$refs.tree.getCheckedKeys().join()
        const arr = this.$refs.tree.getCheckedNodes()
        const data = []
        for (const item of arr) {
          data.push(item.title)
        }
        this.temp.departmentNames = data.join()
        this.dialogTreeFormVisible = false
      },
      handleDelete(row) {
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$store
              .dispatch('DelUser', { id: row.id })
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
      handleChangePassword(row) {
        this.$prompt('请输入密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: 'password',
          inputPattern: /^[a-zA-Z0-9]\w{5,17}$/,
          inputErrorMessage: '密码由小写字母数字或下划线的组成，长度在6-18位之间',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              this.$store
                .dispatch('ChangePassword', {
                  username: row.username,
                  confirmpassword: instance.inputValue,
                  password: instance.inputValue
                })
                .then((res) => {
                  const self = this
                  if (res.success) {
                    self.$notify({
                      message: '修改密码成功',
                      type: 'success',
                      duration: 1000
                    })
                  } else {
                    self.$handleErr(res)
                  }
                  done()
                  instance.confirmButtonLoading = false
                })
                .catch((err) => {
                  this.$handleErr(err)
                  done()
                  instance.confirmButtonLoading = false
                })
            } else {
              done()
            }
          }
        })
          .then(({ value }) => {})
          .catch(() => {})
      }
    }
  }
</script>
<style lang="scss" scoped></style>
