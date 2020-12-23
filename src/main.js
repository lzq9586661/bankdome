import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import { VueAxios } from '@/utils/request'
import preventClick, { handleErr } from '@/utils/tools'
import Bus from '@/utils/bus'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import echarts from 'echarts'
Vue.prototype.$handleErr = handleErr // 错误处理
Vue.prototype.$bus = Bus // 事件总线
Vue.use(preventClick) // 短时间内防止重复点击事件
Vue.use(VueAxios, router)
Vue.use(echarts)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
const { mockXHR } = require('../mock')
mockXHR()
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
// 若是没有开启Devtools工具，在开发环境中开启，在生产环境中关闭
if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
} else {
  Vue.config.devtools = false
}

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
