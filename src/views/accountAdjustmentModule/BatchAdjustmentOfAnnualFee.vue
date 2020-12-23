<template>
  <div class="app-container">
    <div class="panel-style">
      <el-form :inline="true" label-width="120px" @submit.native.prevent>
        <el-form-item class="timeDatePicker" label="申请时间">
          <el-date-picker v-model="dateRange" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="申请开始时间" end-placeholder="申请截止时间" />
        </el-form-item>
        <el-form-item class="timeDatePicker" label="反馈时间">
          <el-date-picker v-model="dateRange" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="反馈开始时间" end-placeholder="反馈截止时间" />
        </el-form-item>
        <el-form-item label="操作状态">
          <el-select v-model="listQuery.tzfx" placeholder="请选择操作状态" filterable clearable>
            <el-option label="已审批调账" value="0" />
            <el-option label="已调账" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="批次名称">
          <el-input v-model="listQuery.kh" placeholder="请输入批次名称" clearable />
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
        <el-table-column label="批次流水编号" prop="wybs"></el-table-column>
        <el-table-column label="批次名称" prop="kh"></el-table-column>
        <el-table-column label="工单笔数" prop="nfsqsj"></el-table-column>
        <el-table-column label="调减总额" prop="bz"></el-table-column>
        <el-table-column label="申请时间" prop="tzfx"></el-table-column>
        <el-table-column label="反馈时间" prop="tjzc"></el-table-column>
        <el-table-column label="操作状态" prop="tjje"></el-table-column>
        <el-table-column label="备注" prop="sqsj"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="handleShow(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />

      <el-dialog title="年费批量调账" :visible.sync="softsFlag" width="80%" :close-on-click-modal="false" top="10vh">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="基本信息" name="1">
            <el-form ref="softForm" label-width="120px" :model="softObj" :inline="true">
              <el-form-item label="批次流水编号" prop="kh">
                <el-input v-model="softObj.kh" clearable :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="操作状态" prop="wybs">
                <el-input v-model="softObj.wybs" :readonly="showFlag" clearable />
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="基本批量工单信息" name="21">
            <el-form ref="softForm" label-width="120px" :model="softObj" :inline="true">
              <el-form-item label="工单渠道" prop="nfsqsj">
                <el-input v-model="softObj.nfsqsj" :readonly="showFlag" clearable />
              </el-form-item>
              <el-form-item label="批量工单名称" prop="tjzc">
                <el-input v-model="softObj.softwareNo" :readonly="showFlag" clearable />
              </el-form-item>
              <el-form-item label="工单总笔数">
                <el-input v-model="softObj.tjje" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="调减总额">
                <el-input v-model="softObj.tjje" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="工单时间">
                <el-input v-model="softObj.gdqd" :readonly="showFlag" />
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="附件信息" name="3">
            <el-table
              v-loading="listLoading"
              :data="tList4"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.6)"
              style="width: 100%"
              fit
              highlight-current-row
            >
              <el-table-column label="序号" prop="xh"></el-table-column>
              <el-table-column label="文件名称" prop="wjmc"></el-table-column>
              <el-table-column label="操作" width="80px">
                <template slot-scope="scope">
                  <el-button type="primary" plain @click="handleShow(scope.row)">下载</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item title="工单明细列表" name="2">
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
              <el-table-column label="卡号" prop="spsj"></el-table-column>
              <el-table-column label="唯一标识" prop="spr"></el-table-column>
              <el-table-column label="年费收取时间" prop="spjg"></el-table-column>
              <el-table-column label="币种" prop="spr"></el-table-column>
              <el-table-column label="调整方向" prop="spr"></el-table-column>
              <el-table-column label="调减政策" prop="spr"></el-table-column>
              <el-table-column label="调减金额" prop="spr"></el-table-column>
              <el-table-column label="工单时间" prop="spr"></el-table-column>
              <el-table-column label="申请部门" prop="spr"></el-table-column>
              <el-table-column label="申请科室" prop="spr"></el-table-column>
              <el-table-column label="申请人" prop="spr"></el-table-column>
              <el-table-column label="操作" width="60px">
                <template slot-scope="scope">
                  <el-button type="primary" plain @click="handleShow1(scope.row)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
          </el-collapse-item>
        </el-collapse>
        <div style="text-align: center" :class="{ 'btn-disabled': showFlag }">
          <el-button icon="el-icon-close" plain @click="softsFlag = false">关闭</el-button>
        </div>
      </el-dialog>
      <el-dialog title="工单详情" :visible.sync="softsFlag1" width="80%" :close-on-click-modal="false" top="10vh">
        <el-form ref="softForm" label-width="160px" :model="softObj" :inline="true">
          <el-form-item label="序号" prop="kh">
            <el-input v-model="softObj.kh" clearable :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="年费卡号" prop="wybs">
            <el-input v-model="softObj.wybs" :readonly="showFlag" clearable />
          </el-form-item>
          <el-form-item label="年费收取时间" prop="nfsqsj">
            <el-input v-model="softObj.nfsqsj" :readonly="showFlag" clearable />
          </el-form-item>
          <el-form-item label="年费金额" prop="tjzc">
            <el-input v-model="softObj.softwareNo" :readonly="showFlag" clearable />
          </el-form-item>
          <el-form-item label="币种">
            <el-input v-model="softObj.tjje" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="调整方向">
            <el-input v-model="softObj.tjje" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="卡产品类型">
            <el-input v-model="softObj.gdqd" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="年费唯一标识">
            <el-input v-model="softObj.sqsj" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="调整原因">
            <el-input v-model="softObj.sqr" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="是否销卡">
            <el-input v-model="softObj.sqr" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="补刷时间周期">
            <el-input v-model="softObj.sqr" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="补转时间周期">
            <el-input v-model="softObj.sqr" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="调减金额">
            <el-input v-model="softObj.sqr" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="申请部门">
            <el-input v-model="softObj.sqr" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="申请科室">
            <el-input v-model="softObj.sqr" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="录入人">
            <el-input v-model="softObj.sqr" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="审批人">
            <el-input v-model="softObj.sqr" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="softObj.sqr" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="操作状态">
            <el-input v-model="softObj.sqr" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="备注（失败原因）">
            <el-input v-model="softObj.sqr" :readonly="showFlag" />
          </el-form-item>
        </el-form>
        <div style="text-align: center" :class="{ 'btn-disabled': showFlag }">
          <el-button icon="el-icon-close" plain @click="softsFlag1 = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  // import { checkPermission } from '@/utils/permission'
  export default {
    name: 'BatchAdjustmentOfAnnualFee',
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
        softsFlag1: false,
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
      },
      handleShow1(row) {
        this.softsFlag1 = true
        this.softObj = row
      },
      handleSp(row) {
        console.log('重新审批。。。')
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
