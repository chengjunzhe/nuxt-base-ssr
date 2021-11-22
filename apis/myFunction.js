import Vue from 'vue'
import { isFunction } from '../utils/validate'

// 使用async/await 包装的请求方法
Vue.prototype.$awaitHttpRequest = async function (pro, { formData, parms, success, fail, complete }) {
  if (isFunction(pro)) {
    try {
      const res = await pro(formData, parms)
      success && isFunction(success) && (await success(res))
    } catch (error) {
      console.log(error)
      fail && isFunction(fail) && (await fail(error))
    } finally {
      complete && isFunction(complete) && (await complete())
    }
  } else {
    throw new TypeError('只能传promise作为第一个参数')
  }
}
