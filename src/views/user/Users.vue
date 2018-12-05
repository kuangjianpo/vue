<template>
  <div class="users">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区域 -->
    <div style="margin-top:15px;">
      <el-input
        placeholder="请输入内容"
        v-model="searchkey"
        class="input-with-select"
        style="width : 300px"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click='searchUsers'
        ></el-button>
      </el-input>
      <el-button
        type="success"
        plain
        @click="adddialogFormVisible=true"
      >添加用户</el-button>
    </div>
    <!-- 数据表单区域 -->
    <template>
      <el-table
        :data="userList"
        border
        style="width: 100%;margin-top:15px"
      >
        <el-table-column
          type="index"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
        >
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeUserState(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              content="编辑"
              placement="top"
            >
              <el-button
                type='primary'
                icon="el-icon-edit"
                size="mini"
                @click="handleEdit(scope.row)"
                plain
              ></el-button>
            </el-tooltip>
            <el-tooltip
              content="删除"
              placement="top"
            >
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.row.id)"
                plain
              ></el-button>
            </el-tooltip>
            <el-tooltip
              content="分配角色"
              placement="top"
            >
              <el-button
                size="mini"
                type="info"
                icon="el-icon-share"
                @click="showGrant(scope.row)"
                plain
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页区域 -->
    <el-pagination
      style="margin-top:15px;background-color:pink"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 新增用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="adddialogFormVisible"
    >
      <el-form
        :model="addform"
        ref="addform"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item
          prop="username"
          label="用户名"
        >
          <el-input
            v-model="addform.username"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
        >
          <el-input
            v-model="addform.password"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱"
        >
          <el-input
            v-model="addform.email"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="mobile"
          label="手机号"
        >
          <el-input
            v-model="addform.mobile"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addUser('addform')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="editdialogFormVisible"
    >
      <el-form
        :model="editform"
        ref="editform"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item
          prop="username"
          label="用户名"
        >
          <el-input
            v-model="editform.username"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱"
        >
          <el-input
            v-model="editform.email"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="mobile"
          label="手机号"
        >
          <el-input
            v-model="editform.mobile"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editdialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editUser('editform')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="grantdialogFormVisible"
    >
      <el-form
        :model="grantform"
        ref="editform"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item
          prop="username"
          label="用户名："
        >
          <el-input
            v-model="grantform.username"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
          <label
          class="el-form-item__label"
          style="width: 100px;"
        >角色：</label>
        <el-select
          v-model="grantform.rid"
          placeholder="请选择"
          >
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="grantdialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="grantUser"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  GetUserList,
  addUser,
  editUser,
  deleteUserById,
  GetGrantList,
  grantUserById,
  changeUserState
} from '@/api'

export default {
  data () {
    return {
      pagenum: 1,
      pagesize: 10,
      total: 0,
      searchkey: '',
      userList: [],
      rolesList: [],
      // 控制添加用户对话框是否显示
      adddialogFormVisible: false,
      // 定义添加用户数据
      addform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 定义分配角色数据
      grantform: {
        username: '',
        id: '',
        rid: ''
      },
      // 控制编辑用户对话框是否显示
      editdialogFormVisible: false,
      // 定义编辑用户数据
      editform: {
        username: '',
        id: '',
        email: '',
        mobile: ''
      },
      // 分配角色对话框是否显示
      grantdialogFormVisible: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur,change'
          }
        ],
        mobile: [{ required: true, message: '电话不能为空' }]
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 实现用户状态的切换
    changeUserState (row) {
      console.log(row)
      changeUserState(row.id, row.mg_state).then(result => {
        if (result.meta.status === 200) {
          this.$message({
            type: 'success',
            message: result.meta.msg
          })
        } else {
          this.$mesage.error('改变状态失败')
          return false
        }
      })
    },
    // 实现用户角色授权
    grantUser () {
      if (this.grantform.id) {
        grantUserById(this.grantform).then(result => {
          // console.log(result)
          if (result.meta.status === 200) {
            this.grantdialogFormVisible = false
            this.$message({
              type: 'success',
              message: result.meta.msg
            })
            this.init()
          }
        })
      } else {
        this.$mesage.error('输入信息不完整')
        return false
      }
    },
    // 点击显示分配角色和获取角色列表
    showGrant (row) {
      // console.log(row)
      this.grantdialogFormVisible = true
      this.grantform.username = row.username
      this.grantform.id = row.id
      this.grantform.rid = row.role_name // 把用户当前的角色数据加载到选择器中
      // 获取角色数据的加载
      GetGrantList().then(result => {
        console.log(result)
        if (result.meta.status === 200) {
          this.rolesList = result.data
        }
      })
    },
    // 实现用户数据的编辑
    editUser (formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          editUser(this.editform).then(result => {
            if (result.meta.status === 200) {
              this.editdialogFormVisible = false
              this.$message({
                type: 'success',
                message: result.meta.msg
              })
              this.init()
            }
          })
        } else {
          this.$mesage.error('输入信息不完整')
          return false
        }
      })
    },
    // 实现新增用户操作
    addUser (formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          addUser(this.addform).then(result => {
            console.log(result)
            if (result.meta.status === 201) {
              this.adddialogFormVisible = false
              this.$refs[formname].resetFields()
              this.$message({
                type: 'success',
                message: result.meta.msg
              })
              this.init()
            } else {
              this.$message({
                type: 'error',
                message: result.meta.msg
              })
            }
          })
        } else {
          this.$mesage.error('输入信息不完整')
          return false
        }
      })
    },
    // 实现用户数据的搜索
    searchUsers () {
      GetUserList({
        query: this.searchkey,
        pagenum: 1,
        pagesize: 10
      }).then(result => {
        console.log(result)
        if (result.meta.status === 200) {
          this.userList = result.data.users
          this.total = result.data.total
        }
      })
    },

    // 获取用户数据
    init () {
      GetUserList({
        query: this.searchkey,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(result => {
        console.log(result)
        if (result.meta.status === 200) {
          this.userList = result.data.users
          this.total = result.data.total
        }
      })
    },
    handleEdit (row) {
      console.log(row)
      this.editdialogFormVisible = true
      this.editform.username = row.username
      this.editform.id = row.id
      this.editform.email = row.email
      this.editform.mobile = row.mobile
    },
    // 确认删除提示框
    handleDelete (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteUserById(id).then(result => {
            console.log(result)
            if (result.meta.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.init()
            } else {
              this.$message.error('删除失败')
              return false
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 切换每页显示条数
    handleSizeChange (val) {
      // console.log(`每页${val}条`)
      this.pagesize = val
      this.init()
    },
    // 切换当前页数
    handleCurrentChange (val) {
      // console.log(val)
      this.pagenum = val
      this.init()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
