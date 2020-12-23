<template>
  <div class="app-container">
    <div class="panel-style">
      <el-form :inline="true" label-width="120px" @submit.native.prevent>
        <el-form-item class="timeDatePicker" label="调账时间">
          <el-date-picker v-model="dateRange" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="调账开始时间" end-placeholder="调账截止时间" />
        </el-form-item>
        <el-form-item label="调整类型">
          <el-select v-model="listQuery.tzfx" placeholder="请选择调整类型" filterable clearable>
            <el-option label="类型一" value="0" />
            <el-option label="类型二" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="调整币种">
          <el-select v-model="listQuery.tzzc" placeholder="请选择币种" filterable clearable>
            <el-option label="人民币" value="0" />
            <el-option label="美元" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="调整结果">
          <el-select v-model="listQuery.tzfx" placeholder="请选择调整结果" filterable clearable>
            <el-option label="结果一" value="0" />
            <el-option label="结果二" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="卡号">
          <el-input v-model="listQuery.kh" placeholder="请输入卡号" clearable />
        </el-form-item>
        <el-form-item label="业务唯一标识">
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
        <el-table-column label="调账申请编号" prop="wybs"></el-table-column>
        <el-table-column label="卡号" prop="kh"></el-table-column>
        <el-table-column label="业务类型" prop="nfsqsj"></el-table-column>
        <el-table-column label="调整类型" prop="bz"></el-table-column>
        <el-table-column label="调整方向" prop="tzfx"></el-table-column>
        <el-table-column label="调账代码" prop="tjzc"></el-table-column>
        <el-table-column label="调账结果" prop="tjje"></el-table-column>
        <el-table-column label="最后调账时间" prop="gdqd"></el-table-column>
        <el-table-column label="备注" prop="sqsj"></el-table-column>
        <el-table-column label="操作" width="240px">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="handleShow(scope.row)">查看</el-button>
            <el-button type="primary" plain @click="handleAdjustment(scope.row)">调账重试</el-button>
            <el-button type="primary" plain @click="handleAccounting(scope.row)">账务校验</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />

      <el-dialog title="年费单笔调账" :visible.sync="softsFlag" width="50%" :close-on-click-modal="false" top="10vh">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="基本信息" name="1">
            <el-form ref="softForm" label-width="120px" :model="softObj" :inline="true">
              <el-form-item label="调账申请编号" prop="kh">
                <el-input v-model="softObj.kh" clearable :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="卡号" prop="wybs">
                <el-input v-model="softObj.wybs" :readonly="showFlag" clearable />
              </el-form-item>
              <el-form-item label="业务类型" prop="nfsqsj">
                <el-input v-model="softObj.nfsqsj" :readonly="showFlag" clearable />
              </el-form-item>
              <el-form-item label="调整类型" prop="tjzc">
                <el-input v-model="softObj.softwareNo" :readonly="showFlag" clearable />
              </el-form-item>
              <el-form-item label="调整方向">
                <el-input v-model="softObj.tjje" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="调整币种">
                <el-input v-model="softObj.tjje" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="调账代码">
                <el-input v-model="softObj.gdqd" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="申请部门">
                <el-input v-model="softObj.sqsj" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="申请科室">
                <el-input v-model="softObj.sqr" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="申请人">
                <el-input v-model="softObj.sqr" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="交易描述">
                <el-input v-model="softObj.sqr" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="调账结果">
                <el-input v-model="softObj.sqr" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="调账时间">
                <el-input v-model="softObj.sqr" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="softObj.sqr" :readonly="showFlag" />
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="列表信息" name="2">
            <el-table
              v-loading="listLoading"
              :data="tList1"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.6)"
              style="width: 100%"
              fit
              highlight-current-row
            >
              <el-table-column label="序号" prop="xh"></el-table-column>
              <el-table-column label="操作时间" prop="spsj"></el-table-column>
              <el-table-column label="操作人" prop="spr"></el-table-column>
              <el-table-column label="操作结果" prop="spjg"></el-table-column>
              <el-table-column label="备注" prop="beiz"></el-table-column>
            </el-table>
            <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
          </el-collapse-item>
        </el-collapse>
        <div style="text-align: center" :class="{ 'btn-disabled': showFlag }">
          <el-button icon="el-icon-close" plain @click="softsFlag = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  // import { checkPermission } from '@/utils/permission'
  export default {
    name: 'AnnualFeeAdjustment',
    components: { Pagination },
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
        tList3: []
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
            sqbm: '审批通过',
            sqks: '无',
            nfsqsj: '2020-11-29',
            tjzc: '抱怨销卡',
            tjje: '1011',
            gdqd: '2020-09-09',
            sqsj: '2020-09-29',
            sqr: '张三',
            fj: '附件文件.doc',
            cs: true
          },
          {
            kh: 'CN02056',
            wybs: '00003',
            bz: '人民币',
            tzfx: '方向一',
            sqbm: '审批通过',
            sqks: '无',
            nfsqsj: '2020-11-29',
            tjzc: '抱怨销卡',
            tjje: '1011',
            gdqd: '2020-09-09',
            sqsj: '2020-09-29',
            sqr: '张三',
            fj: '附件文件.doc',
            cs: false
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
      },
      handleSp(row) {
        console.log('重新审批。。。')
      },
      handleAdjustment(row) {
        this.$notify({
          title: '成功',
          message: '调账重试成功',
          type: 'success',
          duration: 1000
        })
      },
      handleAccounting(row) {
        this.$notify({
          title: '成功',
          message: '账务校验成功',
          type: 'success',
          duration: 1000
        })
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
