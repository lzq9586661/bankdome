<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
  import echarts from 'echarts'
  import resize from '@/utils/resize'

  export default {
    name: 'BarLineChart',
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
        default: '100%'
      },
      chartData: {
        type: Object,
        required: false,
        default() {
          return null
        }
      },
      // 标题
      chartTitle: {
        type: String,
        default: ''
      },
      // 副标题
      subtext: {
        type: String,
        default: ''
      },
      // 标题位置
      titlePosition: {
        type: String || Number,
        default: 'center'
      },
      // x轴类型
      // 'value' 数值轴，适用于连续数据。
      // 'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
      // 'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
      // 'log' 对数轴。适用于对数数据。
      xtype: {
        type: String,
        default: 'category'
      },
      // x轴单位
      xname: {
        type: String,
        default: ''
      },
      // x坐标轴名字旋转，角度值
      xnameRotate: {
        type: Number,
        default: 0
      },
      // y轴类型 值和x轴一样
      ytype: {
        type: String,
        default: 'value'
      },
      // y轴单位
      yname: {
        type: String,
        default: ''
      },
      // y坐标轴名字旋转，角度值
      ynameRotate: {
        type: Number,
        default: 0
      },
      // 类型 bar line
      seriesType: {
        type: String,
        default: 'bar'
      },
      // 是否堆叠展示
      stack: {
        type: String,
        default: ''
      },
      // 折线是否平滑
      smooth: {
        type: Boolean,
        default: true
      },
      // 柱子最大宽度
      barMaxWidth: {
        type: Number,
        default: 40
      },
      // legend 排列形式 horizontal vertical
      orient: {
        type: String,
        default: 'horizontal'
      },
      // 最大值，最小值
      markPoint: {
        type: Object,
        default() {
          return null
          /*return {
            data: [
              {
                type: 'max',
                name: '最大值'
              },
              {
                type: 'min',
                name: '最小值'
              }
            ]
          }*/
        }
      },
      // 平均值
      markLine: {
        type: Object,
        default() {
          return null
          /*return {
            data: [
              {
                type: 'average',
                name: '平均值'
              }
            ]
          }*/
        }
      },
      // 数据缩放
      dataZoom: {
        type: Array,
        default() {
          return null
          /* return [{
            type: 'inside'
          }, {
            type: 'slider'
          }] */
        }
      },
      // 'line' 直线指示器
      // 'shadow' 阴影指示器
      // 'none' 无指示器
      // 'cross' 十字准星指示器。其实是种简写，表示启用两个正交的轴的 axisPointer
      axisPointer: {
        type: String,
        default: 'line'
      },
      label: {
        type: Object,
        default() {
          return null
        }
      },
      magicType: {
        type: Object,
        default() {
          return null
          /* return {
            show: false,
            type: ['line', 'bar', 'stack']
          } */
        }
      },
      restore: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        chart: null
      }
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      handleInit() {
        this.initChart()
      },
      initChart() {
        let seriesArr = []
        for (const item of this.chartData.seriesArr) {
          item.type = this.seriesType
          item.stack = this.stack
          item.smooth = this.smooth
          item.barMaxWidth = this.barMaxWidth
          item.markPoint = this.markPoint
          item.markLine = this.markLine
          item.label = this.label
        }
        seriesArr = this.chartData.seriesArr

        this.chart = echarts.init(this.$el)

        this.chart.setOption({
          title: {
            text: this.chartTitle,
            subtext: this.subtext,
            left: this.titlePosition
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: this.axisPointer,
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            top: this.subtext ? 60 : 40,
            data: this.chartData.legend,
            orient: this.orient
          },
          grid: {
            left: 60,
            right: 40,
            top: this.subtext ? 100 : 80,
            bottom: 80,
            containLabel: true
          },
          toolbox: {
            feature: {
              magicType: this.magicType,
              restore: this.restore,
              saveAsImage: {
                show: true
              }
            },
            right: 20
          },
          xAxis: {
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            axisLabel: {
              // 坐标轴刻度标签的相关设置。
              // interval: 0,
              fontSize: 14
            },
            boundaryGap: true, // 坐标轴在刻度上还是在区间上
            name: this.xname,
            nameTextStyle: {
              fontSize: 16
            },
            data: this.chartData.scaleArr,
            type: this.xtype,
            nameRotate: this.xnameRotate
          },
          yAxis: {
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            axisLabel: {
              fontSize: 14
            },
            boundaryGap: true, // 坐标轴在刻度上还是在区间上
            name: this.yname,
            nameTextStyle: {
              fontSize: 16
            },
            data: this.chartData.scaleArr,
            type: this.ytype,
            nameRotate: this.ynameRotate
          },
          dataZoom: this.dataZoom,
          series: seriesArr
        })
      }
    }
  }
</script>
<style lang="scss" scoped></style>
