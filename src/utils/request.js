import axios from 'axios'
import { VueAxios } from './axios'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    if (getToken()) {
      // let each request carry token
      // ['X-Access-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Access-Token'] = getToken()
    }
    // get请求增加时间戳
    if (config.method === 'get') {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params
      }
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    return !response.headers['content-disposition'] ? response.data : response
  },
  (error) => {
    return Promise.reject(error)
  }
)

const installer = {
  vm: {},
  install(Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
}

export { installer as VueAxios, service as axios }
