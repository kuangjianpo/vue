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

// --------------用户列表-------------------

// 获取用户数据
export const GetUserList = (pa) => {
  return axios.get('users', {params: pa})
    .then((result) => {
      return result.data
    })
}

// 添加用户数据
export const addUser = (pa) => {
  return axios.post('users', pa)
    .then((result) => {
      return result.data
    })
}

// 编辑用户数据
export const editUser = (pa) => {
  return axios.put(`users/${pa.id}`, pa)
    .then((result) => {
      return result.data
    })
}

// 删除用户数据
export const deleteUserById = (id) => {
  return axios.delete(`users/${id}`)
    .then((result) => {
      return result.data
    })
}

// 获取角色列表
export const GetGrantList = (id) => {
  return axios.get('roles')
    .then((result) => {
      return result.data
    })
}

// 用户角色授权
export const grantUserById = (pa) => {
  return axios.put(`users/${pa.id}/role`, {rid: pa.rid})
    .then((result) => {
      return result.data
    })
}

// 改变用户状态
export const changeUserState = (id, type) => {
  return axios.put(`users/${id}/state/${type}`)
    .then((result) => {
      return result.data
    })
}

//  -------------权限列表-----------------
// 获取权限列表
export const GetRightList = (type) => {
  return axios.get(`rights/${type}`)
    .then((result) => {
      return result.data
    })
}

//  -------------角色列表-----------------

// 新增角色
export const addRole = (pa) => {
  return axios.post('roles', pa)
    .then((result) => {
      return result.data
    })
}

// 删除角色
export const deleteRole = (id) => {
  return axios.delete(`roles/${id}`)
    .then((result) => {
      return result.data
    })
}

// 角色授权
export const grantRole = (roleId, rids) => {
  return axios.post(`roles/${roleId}/rights`, {rids})
    .then((result) => {
      return result.data
    })
}

// 删除角色权限
export const deleteRoleRight = (roleId, rightId) => {
  return axios.delete(`roles/${roleId}/rights/${rightId}`)
    .then((result) => {
      return result.data
    })
}

// 编辑角色
export const editRole = (id, pa) => {
  return axios.put(`roles/${id}`, pa)
    .then((result) => {
      return result.data
    })
}

// 根据id查找角色
export const GetRoleById = (id) => {
  return axios.get(`roles/${id}`)
    .then((result) => {
      return result.data
    })
}
