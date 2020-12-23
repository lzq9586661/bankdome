<template>
  <div :class="className" :style="{ width: width, height: height, float: float }" />
</template>

<script>
  import echarts from 'echarts'
  import resize from '@/utils/resize'

  export default {
    name: 'PictorialBarChats',
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '50vh'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Array,
        required: false,
        default() {
          return []
        }
      },
      legendData: {
        type: Array,
        required: false,
        default() {
          return []
        }
      },
      legendNum: {
        type: Array,
        required: false,
        default() {
          return []
        }
      },
      tbTitle: {
        type: String,
        default: ''
      },
      float: {
        type: String,
        default: ''
      },
      optionType: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      setOptions() {
        this.chart.clear()
        this.chart.setOption({
          tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 10,
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ]
        }
    ]
        })
      },
      initChart() {
        this.chart = echarts.init(this.$el)
        this.setOptions()
      }
    }
  }
</script>
<style scoped lang="scss"></style>
