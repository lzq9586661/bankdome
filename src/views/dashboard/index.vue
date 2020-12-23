<template>
  <div class="app-container">
    <div class="panel-style">
      <el-tabs v-model="activeName3" @tab-click="handleClick1">
        <el-tab-pane label="年费工单统计" name="first">
          <bar-chart v-if="activeName3 === 'first'" ref="first" tb-title="年费工单统计"></bar-chart>
        </el-tab-pane>
        <el-tab-pane label="息费工单统计" name="second">
          <bar-chart v-if="activeName3 === 'second'" ref="second" tb-title="息费工单统计"></bar-chart>
        </el-tab-pane>
      </el-tabs>
      <div class="pie_block">
        <div class="pie_block_title">
          <h4>年费申请占比</h4>
        </div>
        <div>
          <pie-chart></pie-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import barChart from './components/barChart'
  import pieChart from './components/pieChart'

  export default {
    name: 'Dashboard',
    components: {
      barChart,
      pieChart
    },
    data() {
      return {
        activeName: 'first',
        activeName1: '1',
        activeName2: '2',
        activeName3: 'first'
      }
    },
    mounted() {},
    methods: {
      handleClick(val) {
        console.log(val)
      },
      handleClick1(val) {
        this.activeName3 = val.name
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-col-4 {
    line-height: 40px;
    text-align: center;
    border: 1px solid #ccc;
  }
  .pie_block {
    border-width: 0px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    border: none;
    border-radius: 8px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-family: 'Microsoft YaHei ', 'Microsoft YaHei', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    color: #666666;
    line-height: 18px;
  }
  .pie_block_title {
    padding: 5px;
    border-bottom: 1px solid #4f4f4f;
  }
</style>
