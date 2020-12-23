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
        default: '45vh'
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
          title: {
            text: this.tbTitle,
            left: 'center',
            // textStyle: { color: '#0EB8FF' },
            top: '8px'
          },
          xAxis: {
            name: '月份',
            nameLocation: 'middle',
            nameGap: 30,
            nameRotate: 0,
            data: ['2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-07', '2020-08', '2020-09', '2020-10', '2020-11', '2020-12'],
            axisTick: {
              show: true,
              nameTextStyle: {
                color: '#000'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#000'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#000'
              }
            },
            splitArea: { show: false }
          },
          yAxis: {
            name: '工单笔数',
            nameLocation: 'middle',
            nameGap: 50,
            nameRotate: 90,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#000'
              }
            },
            boundaryGap: ['0', '5%'],
            splitLine: {
              lineStyle: {
                // 使用深浅的间隔色
                color: '#002D9C'
              }
            }
          },
          legend: [
            {
              data: ['总工单数'],
              x: 'right',
              top: 180,
              padding: [0, 28, 0, 0]
            },
            {
              data: ['调账成功笔数'],
              x: 'right',
              top: 200
            }
          ],
          series: [
            {
              name: '总工单数',
              data: [120, 200, 150, 80, 70, 110, 130, 90, 234, 87, 450, 234],
              type: 'bar'
            },
            {
              name: '调账成功笔数',
              data: [80, 70, 110, 130, 90, 234, 200, 150, 80, 70, 110, 90],
              type: 'bar'
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
