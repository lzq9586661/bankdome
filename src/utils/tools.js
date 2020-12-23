import { Message } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth'
import { devIp } from '@/settings'
import store from '@/store'

// 请求错误统一处理
export function handleErr(error) {
  if (error.response) {
    const data = error.response.data
    const token = getToken()
    switch (error.response.status) {
      case 403:
        Message({ type: 'error', message: '拒绝访问', duration: 2000 })
        break
      case 500:
      case 510:
        if (error.response.statusText === 'Internal Server Error' && !(data.message && data.message.includes('Token失效'))) {
          Message({ type: 'error', message: '服务连接失败！' })
        } else if (error.response.statusText.includes('timeout')) {
          Message({ type: 'error', message: '网络请求超时！' })
        } else {
          Message({
            type: 'error',
            message: data.message,
            duration: 2000,
            onClose() {
              if (data.message.includes('Token失效')) {
                store.dispatch('FedLogOut').then(() => {
                  removeToken()
                  location.reload()
                })
              }
            }
          })
        }
        break
      case 404:
        Message({
          type: 'error',
          message: '很抱歉，资源未找到！',
          duration: 2000
        })
        break
      case 504:
        Message({ type: 'error', message: '网络请求超时！', duration: 2000 })
        break
      case 401:
        Message({
          type: 'error',
          message: '未授权，请重新登录！',
          duration: 2000
        })
        if (token) {
          store.dispatch('FedLogOut').then(() => {
            setTimeout(() => {
              location.reload()
            }, 1500)
          })
        }
        break
      default:
        Message({ type: 'error', message: data.message, duration: 2000 })
        break
    }
  } else if (error.message.includes('timeout')) {
    Message({ type: 'error', message: '网络请求超时！' })
  } else if (error.message || error.msg || error.statusText) {
    Message({
      type: 'error',
      message: error.message || error.msg || error.statusText,
      duration: 2000
    })
  }
}
// 根据type或者value转化为对应的名称
export function getNameByType(arr, type, label = 'label', value = 'value') {
  let name = ''
  for (const item of arr) {
    if (String(item[value]) === String(type)) {
      name = item[label]
    }
  }
  return name
}

// 开发后台Ip
export function getIp() {
  if (process.env.NODE_ENV === 'development') {
    return devIp + process.env.VUE_APP_BASE_API
  } else {
    return ''
  }
}

// 封装async/await错误处理
export function awaitWrap(promise) {
  return promise.then((res) => [res, null]).catch((err) => [null, err])
}

// 防止短时间内快速点击按钮
export default {
  install(Vue) {
    // 防止重复点击
    Vue.directive('preventClick', {
      inserted(el, binding) {
        el.addEventListener('click', () => {
          if (!el.disabled) {
            el.disabled = true
            setTimeout(() => {
              el.disabled = false
            }, 1500)
          }
        })
      }
    })
  }
}
