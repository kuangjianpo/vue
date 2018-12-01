import axios from 'axios'

const baseUrl = 'http://localhost:8888/api/private/v1/'

axios.defaults.baseURL = baseUrl

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let token = localStorage.getItem('itcast_token')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 登录验证
export const login = (pa) => {
  return axios.post('login', pa)
    .then((result) => {
      //   console.log(result.data)
      return result.data
    })
}

// 获取用户数据
export const GetUserList = (pa) => {
  return axios.get('users', {params: pa})
    .then((result) => {
      return result.data
    })
}

// 添加用户
export const addUser = (pa) => {
  return axios.post('users', pa)
    .then((result) => {
      return result.data
    })
}
