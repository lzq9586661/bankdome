<template>
  <div class="echart-sheet">
     <!--饼图-->
     <div id="main" style="width: 100%; height: 100%;"></div>
</div>
</template>

<script>
export default {
  data () {
    return {
      pieData: [
          {value: 400, name: '直接访问', itemStyle: {color: '#2661FF'}},
          {value: 300, name: '邮件营销', itemStyle: {color: '#638EFF'}},
          {value: 298, name: '联盟广告', itemStyle: {color: '#99B6FF'}},
          {value: 248, name: '视频广告', itemStyle: {color: '#FFA722'}},
          {value: 268, name: '搜索引擎', itemStyle: {color: '#FFCD81'}}
     ] // value为各个模块的值，name为显示值，itemStyle.color控制颜色
  },
  created () {
  },
  mounted () {
      this.$nextTick(function() {
        this.drawPie('main')
      }) // 延迟调用
  },
  methods: {
  	// 绘制饼图
      drawPie(id) {
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a}<br/>{b}:{c} ({d}%)', // 处理hover显示的文本
            textStyle: {
              fontSize: '12'
            }
          }, // 提示文本的显示
          legend: {
            orient: 'vertical',
            x: 'right',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          }, // 用例
          graphic: {
            type: 'text',
            left: '68',
            top: '98',
            style: {
              text: `方式分析`,
              textAlign: 'center',
              fill: '#333333',
              fontSize: 12
            }
          }, // 原生图形元素组件，用来增加额外的模块，实现固定文本无hover效果
          series: [
            {
              name: '方式',
              type: 'pie',
              radius: [45, 78], // 半径，比例模式['50%', '70%']
              avoidLabelOverlap: false,
              center: [91, 98], // 位置：左右，上下；13+radius,20+radius
              label: {
                normal: {
                  show: false,
                  position: 'center'
                  // formatter: "{a}分析", // 处理hover环形图显示的文本
                  // color:'blue' // 中间显示文字的颜色
                }, // 固定文本hover效果，普通状态环形圈中间文本（各个模块文本保持一致时使用）
                emphasis: {
                  show: false,
                  textStyle: {
                    fontSize: '12',
                    fontWeight: 'blod'
                  }
                } // 不固定文本hover效果，环形圈中间文本 强调状态（各个模块文本不同时使用）
              },
              labelLine: {
                normal: {
                  show: false
                }
              }, // 引导线
              data: this.pieData // 数据来源
            }
          ]
        })
      }}
}
}
</script>

<style>

</style>