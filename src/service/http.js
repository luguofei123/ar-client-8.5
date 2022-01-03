
import axios from 'axios'
import Vue from 'vue'
import {globConfig} from '@/assets/js/config'
// 创建实例
const instance = axios.create({
  timeout: 5000,
  baseURL: globConfig.baseURL
})

let needLoadingRequestCount = 0
function showLoading() {
  if (needLoadingRequestCount === 0) {
    Vue.prototype.$showLoading(true, `加载中`)
  }
  needLoadingRequestCount += 1
}
function closeLoading() {
  Vue.nextTick(() => {
    // 以服务的方式调用的 Loading 需要异步关闭
    if (needLoadingRequestCount < 1) {
      return
    }
    needLoadingRequestCount -= 1
    needLoadingRequestCount = Math.max(needLoadingRequestCount, 0) // 保证大于等于0
    if (needLoadingRequestCount === 0) {
      setTimeout(() => {
        hideLoading()
      }, 300)
    }
  })
}
// http请求拦截器 主要是对请求参数的设置
instance.interceptors.request.use(
  request => {
    if (
      request.url.includes('fbpm-modeler') ||
      request.url.includes('fbpm-process') ||
      request.url.includes('/pf/pbm/pbm/api/') ||
      request.url.includes('/ma/api') ||
      request.url.includes('/aebf/api/') ||
      request.url.includes('/ma/sys/') ||
      request.url.includes('/aebf/attachment/')
    ) {
      request.url = request.url.replace('/A/ar/api', '')
    }
    if (request.method === 'get') {
      request.params = {
        _t: Date.parse(new Date()) / 1000,
        ...request.params
      }
      request.url = request.url
    }
    if (
      !config.url.includes('rule') &&
      !config.url.includes('getFunc') &&
      !config.url.includes('getRecentlyBalance') &&
      !config.url.includes('getRefInfoList') &&
      !config.url.includes('getTransformTravelParams') &&
      !config.url.includes('after') &&
      !config.url.includes('getAgencyAccount') &&
      !config.url.includes('getQrCodeInfo') &&
      !config.url.includes('queryTravelStandard') &&
      !config.url.includes('fbpm-modeler') &&
      !config.url.includes('getCacheVersion')
    ) {
      showLoading()
    }    
    return request
  },
  error => Promise.error(error)
)

// http响应拦截器
instance.interceptors.response.use(response => {
  if (response.status == '200' || response.status == '201') {
    closeLoading()
    return response
  } else {
    closeLoading()
    return Promise.reject(response)
  }
},
error => {
  closeLoading()
  if (error.response) {
    switch (error.response.status) {
      // 返回 401 清除token信息并跳转到登录页面
      case 401: {
        console.log('路由跳转')
        if (process.env.NODE_ENV !== 'development') {
          window.parent.location.href = '/pf/portal/login/login.html'
        }
        closeLoading()
      }
    }
    closeLoading()
    return Promise.reject(error.response.data)
  }
})
export default instance
