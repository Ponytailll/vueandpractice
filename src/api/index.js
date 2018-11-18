/* eslint-disable */
// 配置API接口地址
// const root = 'https://cnodejs.org/api/v1'
// const root = 'http://localhost:8099/'
// const root = '/'
// 引用axios
// import * as encrypt from '../common/js/encrypt'
import {getToken} from "../public/auth"
import {Message, MessageBox} from 'element-ui'
import store from '../store'
// import {resetRouter} from "../router/index";
import router from "../router/index";

const axios = require('axios')

// 自定义判断元素类型JS
function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

function apiAxios(method, url, params, success, failure) {
  if (params) {
    params = filterNull(params)
  }
  // 证明是ajax请求
  axios({
    method: method,
    // 如果参数不是对象 则直接  url/xxx
    url: (method === 'GET' && !(params instanceof Object)) || method === 'DELETE' ? url + '/' + params : url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    // 如果参数是对象且方法为GET 则直接  url?xxx=xx&xx=xx.....
    params: method === 'GET' && params instanceof Object ? params : null,
    // baseURL: root,
    withCredentials: false
  })
    .then(function (res) {
      if (res.status === 200) {
        // 如果存在成功处理则执行成功处理
        if (success) {
          success(res.data)
        }
      } else {
        // 如果存在失败处理则执行失败处理
        if (failure) {
          failure()
        } else {
          console.log('error: ' + res)
        }
      }
    })
    .catch(function (err) {
      // let res = err.response
      if (err) {
        // window.alert('error: ' + JSON.stringify(res))
        // console.log(err)
      }
    })


}

axios.interceptors.request.use(config => {
  config.url = authFormat(config.url);
  return config
}, error => {
  return Promise.reject(error);
});
axios.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 150) {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('LogOut').then(() => {
          store.dispatch('DeleteUserInfo')
          resetRouter()
        })
        router.push('/login')
      }).catch(() => {
        Message.error('登录已过期，请重新登录')
      });
    }
    return response
  }

  // error => {
  //   console.log('err' + error) // for debug
  //   Message({
  //     message: error.message,
  //     type: 'error',
  //     duration: 5 * 1000
  //   })
  //   return Promise.reject(error)
  // }
)


// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}

export var authFormat = (url) => {
  const timestamp = Date.parse(new Date())
  url += url.indexOf('?') === -1 ? ('?token=' + getToken()) : ('&token=' + getToken())
  url += '&timestamp=' + timestamp
  var loginModelNew = sessionStorage.getItem('loginModel');
  if (loginModelNew !== null && loginModelNew !== undefined && loginModelNew !== '') {
    loginModelNew = JSON.parse(loginModelNew);
  } else {
    loginModelNew = '';
  }        //ip
  url += "&userIdLog=" + loginModelNew.id;

  let requestURI = url.split('?')[0]
  requestURI = url.startsWith('/') ? requestURI : '/' + requestURI
  requestURI = url.endsWith('/') ? requestURI.substring(0, requestURI.length - 1) : requestURI
  // 请求参数
  // let args = []
  // let query = url.split('?')[1]
  // let pairs = query.split('&')
  // for (let i = 0; i < pairs.length; i++) {
  //   let pos = pairs[i].indexOf('=')
  //   if (pos === -1) continue
  //   let argname = pairs[i].substring(0, pos)
  //   let value = pairs[i].substring(pos + 1)
  //   value = decodeURIComponent(value)
  //   let arg = {}
  //   arg.key = argname
  //   arg.value = value
  //   args.push(arg)
  // }
  // args = args.sort(function (a, b) {
  //   return a.key > b.key ? 1 : -1
  // })
  // let paramstring = ''
  // for (var index in args) {
  //   paramstring += args[index].key + args[index].value
  // }
  // let sign = encrypt.hex_hmac_md5(sessionStorage.getItem('secret') == null ? '123456' : sessionStorage.getItem('secret'), requestURI + paramstring).toUpperCase()
  // url = url + '&sign=' + sign;
  // if (url.indexOf('userId') == -1) {
  //   var loginModelNew = sessionStorage.getItem('loginModel');
  //   if (loginModelNew !== null && loginModelNew !== undefined && loginModelNew !== '') {
  //     loginModelNew = JSON.parse(loginModelNew);
  //   } else {
  //     loginModelNew = '';
  //   }        //ip
    //url = url + "&userId=" + loginModelNew.id;
  // }
  // url = url.replace('+', '2B%')
  return url
}
