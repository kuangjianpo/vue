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
                @click="handleEdit(scope.$index, scope.row)"
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
                @click="handleDelete(scope.$index, scope.row)"
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
                @click="handleDelete(scope.$index, scope.row)"
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
      :page-sizes="[1, 2, 3, 4]"
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
          <el-input v-model="addform.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
        >
          <el-input v-model="addform.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱"
        >
          <el-input v-model="addform.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="mobile"
          label="手机号"
        >
          <el-input v-model="addform.mobile" auto-complete="off"></el-input>
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
  </div>
</template>
<script>
import { GetUserList, addUser } from '@/api'

export default {
  data () {
    return {
      pagenum: 1,
      pagesize: 4,
      total: 0,
      searchkey: '',
      userList: [],
      adddialogFormVisible: false,
      addform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        mobile: [
          { required: true, message: '电话不能为空' }
        ]
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 实现新增用户操作
    addUser (formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          addUser(this.addform)
            .then((result) => {
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
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
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
