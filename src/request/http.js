import axios from 'axios'
// import router from '../router'
// import store from '../store'
import QS from 'qs' //序列化post数据

/**
 * 环境切换
 *
 */
axios.defaults.baseURL = 'http://39.98.148.210/api/services/app'
if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:8080'
} else if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = '/api/v1'
}

axios.defaults.timeout = 10000

//设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json'
/**
 * 请求拦截
 * 1、拦截判断登录状态（token）
 * 2、post请求时序列化提交的数据
 */
// axios.interceptors.request.use(config => {
//   const token = store.state.token;
//   token && (config.headers().Authorization = token)
//   return config
// }, error => {
//   return Promise.error(error)
// })
/**
 * 响应拦截器
 */
// axios.interceptors.response.use(
//   response => {
//     if (response.status === 200) {
//       return Promise.resolve(response)
//     } else {
//       return Promise.reject(response)
//     }
//   }, error => {
//     if (error.response.status) {
//       switch (error.response.status) {
//         // 401: 未登录
//         // 未登录则跳转登录页面，并携带当前页面的路径
//         // 在登录成功后返回当前页面，这一步需要在登录页操作。
//         case 401:
//           router.replace({
//             path: '/login',
//             query: {
//               redirect: router.currentRoute.fullPath
//             }
//           })
//           break
//
//         // 403 token过期
//         // 登录过期对用户进行提示
//         // 清除本地token和清空vuex中token对象
//         // 跳转登录页面
//         case 403:
//           // Toast({
//           //   message: '登录过期，请重新登录',
//           //   duration: 1000,
//           //   forbidClick: true
//           // })
//           // 清除token
//           localStorage.removeItem('token')
//           store.commit('loginSuccess', null)
//           // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
//           setTimeout(() => {
//             router.replace({
//               path: '/login',
//               query: {
//                 redirect: router.currentRoute.fullPath
//               }
//             })
//           }, 1000)
//           break
//
//         // 404请求不存在
//         case 404:
//           // Toast({
//           //   message: '网络请求不存在',
//           //   duration: 1500,
//           //   forbidClick: true
//           // })
//           break
//         // 其他错误，直接抛出错误提示
//         default:
//           // Toast({
//           //   message: error.response.data.message,
//           //   duration: 1500,
//           //   forbidClick: true
//           // })
//       }
//       return Promise.reject(error.response)
//     }
//   }
// )
/**
 * 封装get方法
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

/**
 * 封装getUrl方法
 * 为了使参数直接带在url的路由所设置
 * @param url
 * @returns {Promise<any>}
 */
export function getUrl(url, param) {
    return new Promise((resolve, reject) => {
        let arrParams = Object.keys(param);
        if(arrParams.length > 0){
            url = url + '?';
            for (let index in param){
                if (param[index]){
                    url += index + '=' + param[index] + '&';
                }
            }
        }
        // console.log(url)
        axios.get(url).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

/**
 * 封装post方法
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, JSON.stringify(params))
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 封装gets方法
 * @param {String} url [请求的url地址]
 * @param Object params [请求时携带的参数对象]
 */
export function gets(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, params).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

/**
 * 封装posts方法
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数对象]
 */
export function posts(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}