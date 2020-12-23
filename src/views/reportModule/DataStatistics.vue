<template>
  <div class="app-container">
    <div class="panel-style">
      <el-form :inline="true" label-width="120px" @submit.native.prevent>
        <el-form-item class="timeDatePicker" label="工单申请时间">
          <el-date-picker v-model="dateRange" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="申请开始时间" end-placeholder="申请截止时间" />
        </el-form-item>
        <el-form-item label="工单渠道">
          <el-select v-model="listQuery.gdqd" placeholder="请选择工单渠道" filterable clearable>
            <el-option label="客服" value="0" />
            <el-option label="电销" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="业务类型">
          <el-select v-model="listQuery.tzfx" placeholder="请选择业务类型" filterable clearable>
            <el-option label="年费" value="0" />
            <el-option label="息费" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="调整政策">
          <el-select v-model="listQuery.tzzc" placeholder="软件类型" filterable clearable>
            <el-option label="抱怨销卡" value="0" />
            <el-option label="销卡退费" value="1" />
            <el-option label="补刷完成" value="2" />
            <el-option label="补转分期" value="3" />
            <el-option label="权限申请" value="4" />
            <el-option label="其它" value="5" />
          </el-select>
        </el-form-item>
        <el-form-item label="申请部门">
          <el-select v-model="listQuery.tzfx" placeholder="请选择申请部门" filterable clearable>
            <el-option label="部门一" value="0" />
            <el-option label="部门二" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="申请科室">
          <el-select v-model="listQuery.tzfx" placeholder="请选择申请科室" filterable clearable>
            <el-option label="科室一" value="0" />
            <el-option label="科室二" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="申请人">
          <el-input v-model="listQuery.sqr" placeholder="请输入申请人" clearable />
        </el-form-item>
        <el-form-item label="年费唯一标识">
          <el-input v-model="listQuery.kh" placeholder="请输入卡号" clearable />
        </el-form-item>
        <el-form-item label="卡号">
          <el-input v-model="listQuery.kh" placeholder="请输入卡号" clearable />
        </el-form-item>
        <el-form-item class="el-form--button">
          <el-button type="primary" plain @click="handleSearch">查询</el-button>
          <el-button plain @click="temp">重置</el-button>
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
        <el-table-column label="汇总笔数" prop="kh"></el-table-column>
        <el-table-column label="汇总金额" prop="wybs"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  // import { checkPermission } from '@/utils/permission'
  export default {
    name: 'DataStatistics',
    data() {
      return {
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          sqr: '',
          kh: '',
          gdqd: '',
          jtzc: '',
          sqsj: ''
        },
        softObj: {
          kh: '',
          wybs: '',
          nfsqsj: '',
          tjzc: '',
          tjje: '',
          gdqd: '',
          sqsj: '',
          sqr: ''
        },
        total: 1,
        list: [],
        dateRange: [],
        softsFlag: false,
        showFlag: true,
        listLoading: false,
        activeNames: '1',
        activeName: 'first',
        tList1: [],
        tList2: [],
        tList3: [],
        tList4: []
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      temp() {
        this.listQuery = {
          sqr: '',
          kh: '',
          gdqd: '',
          jtzc: '',
          sqsj: ''
        }
      },
      getList() {
        this.list = [
          {
            kh: 'CN020207',
            wybs: '00003',
            bz: '人民币',
            tzfx: '方向一',
            sqbm: '部门一',
            sqks: '科室一',
            nfsqsj: '2020-11-29',
            tjzc: '抱怨销卡',
            tjje: '1011',
            gdqd: '客服',
            sqsj: '2020-09-29',
            sqr: '张三',
            fj: '附件文件.doc'
          }
        ]
        this.tList1 = [
          {
            xh: '1',
            spsj: '2020-11-10',
            spr: '张三',
            spjg: '通过',
            beiz: '无'
          }
        ]
        this.tList2 = [
          {
            xh: '1',
            spsj: '2020-11-10',
            spr: '张三',
            spjg: '通过',
            beiz: '无'
          }
        ]
        this.tList3 = [
          {
            xh: '1',
            spsj: '2020-11-10',
            spr: '邮件',
            spjg: '通过',
            beiz: '无'
          }
        ]
        this.tList4 = [
          {
            xh: '1',
            wjmc: '附件名称一'
          }
        ]
      },
      handleSearch() {
        console.log('...')
      },
      handleChange(val) {
        console.log('获取折叠面板')
      },
      handleClick(ac) {
        console.log('获取tab页签')
      },
      handleShow(row) {
        this.softsFlag = true
        this.softObj = row
      }
    }
  }
</script>
<style lang="scss" scoped>
  .btn-disabled {
    margin-top: 20px;
  }
  .panel-style {
    height: calc(100vh - 220px);
  }
</style>
