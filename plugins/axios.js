import axios from 'axios'
import Qs from 'qs'

const $axios = axios.create({
  // 设置超时时间
  timeout: 30000,
})

// 请求拦截器
$axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
$axios.interceptors.response.use(
  (response) => {
    const { code, msg, data } = response.data
    if (code !== 200) {
      alert(msg)
      return Promise.reject(msg)
    }
    return { data, msg }
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          alert('网络请求不存在')
          break
        case 503:
          alert('服务器不可用')
          break
        default:
          alert(error.response.data.message)
      }
    } else {
      // 请求超时或者网络有问题
      if (error.message.includes('timeout')) {
        alert('网络请求超时')
      } else {
        alert('请求失败')
      }
    }
    return Promise.reject(error)
  }
)

// get，post请求方法
export default {
  post(url, data) {
    return $axios({
      method: 'post',
      url,
      data: Qs.stringify(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    })
  },
  postupload(url, data) {
    return $axios({
      method: 'post',
      url,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  jsonpost(url, data) {
    return $axios({
      method: 'post',
      url,
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    })
  },
  get(url, params) {
    return $axios({
      method: 'get',
      url,
      params,
    })
  },
}