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

// 获取左侧菜单权限
export const getMenuRight = () => {
  return axios.get('menus')
    .then((result) => {
      return result.data
    })
}

//  -------------商品列表-----------------
// 获取商品列表数据
export const getGoodsList = (pa) => {
  return axios.get('goods', {params: pa})
    .then((result) => {
      return result.data
    })
}

// 获取商品分类列表
export const getCateList = (type) => {
  return axios.get('categories', {params: {type: type}})
    .then((result) => {
      return result.data
    })
}

// 添加商品
export const addGoods = (pa) => {
  return axios.post('goods', pa)
    .then((result) => {
      return result.data
    })
}

// 添加商品分类
export const addCategories = (pa) => {
  return axios.post('categories', pa)
    .then((result) => {
      return result.data
    })
}

// 根据id查询分类
export const getCateById = (id) => {
  return axios.get(`categories/${id}`)
    .then((result) => {
      return result.data
    })
}

// 根据id编辑分类
export const editCateById = (id, pa) => {
  return axios.put(`categories/${id}`, pa)
    .then((result) => {
      return result.data
    })
}

// 根据id删除分类
export const deleteCateById = (id) => {
  return axios.delete(`categories/${id}`)
    .then((result) => {
      return result.data
    })
}
