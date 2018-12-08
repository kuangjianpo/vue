<template>
  <div class="role">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加按钮 -->
    <el-button
      type="success"
      plain
      @click="showAddRoles"
    >添加角色</el-button>
    <!-- 角色列表区域 -->
    <el-table
      :data="roleList"
      border
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row
            v-for="first in scope.row.children"
            :key="first.id"
          >
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-tag
                  closable
                  type=""
                  @close='deleteRight(scope.row,first.id)'
                >
                  {{first.authName}}
                </el-tag>
              </div>
            </el-col>
            <el-col :span="20">
              <div class="grid-content bg-purple-light">
                <el-row
                  v-for="second in first.children"
                  :key="second.id"
                >
                  <el-col :span="4">
                    <div class="grid-content bg-purple">
                      <el-tag
                        closable
                        type="success"
                        @close='deleteRight(scope.row,second.id)'
                      >
                        {{second.authName}}
                      </el-tag>
                    </div>
                  </el-col>
                  <el-col :span="20">
                    <div class="grid-content bg-purple-light">
                      <el-tag
                        v-for="third in second.children"
                        :key="third.id"
                        closable
                        type="info"
                        @close='deleteRight(scope.row,third.id)'
                      >
                        {{third.authName}}
                      </el-tag>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <span v-show="scope.row.children.length === 0">该角色没有授权</span>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="描述"
        width="300"
      >
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
              plain
              @click="showEditDialog(scope.row.id)"
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
            content="授权角色"
            placement="top"
          >
            <el-button
              size="mini"
              type="info"
              icon="el-icon-share"
              plain
              @click="showGrantDialog(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增角色对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="adddialogFormVisible"
    >
      <el-form
        :model="addform"
        ref="addform"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item
          prop="roleName"
          label="角色名称"
        >
          <el-input
            v-model="addform.roleName"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="roleDesc"
          label="角色描述"
        >
          <el-input
            v-model="addform.roleDesc"
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
          @click="addRole('addform')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 授权角色对话框 -->
    <el-dialog
      title="授权角色"
      :visible.sync="grantDialogFormVisible"
    >
      <div class="box">
        <el-tree
          ref="tree"
          :data="grantList"
          show-checkbox
          node-key="id"
          :default-expand-all='true'
          :default-checked-keys="defaultRoleRight"
          :props="defaultProps"
        >
        </el-tree>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="grantDialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="grantSubmit"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改角色对话框 -->
    <el-dialog
      title="修改角色"
      :visible.sync="editdialogFormVisible"
    >
      <el-form
        :model="editform"
        ref="editform"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item
          prop="roleName"
          label="角色名称"
        >
          <el-input
            v-model="editform.roleName"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="roleDesc"
          label="角色描述"
        >
          <el-input
            v-model="editform.roleDesc"
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
          @click="editRole('editform')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  GetGrantList,
  addRole,
  deleteRole,
  GetRightList,
  grantRole,
  deleteRoleRight,
  GetRoleById,
  editRole
} from '@/api'
export default {
  data () {
    return {
      roleList: [],
      addform: {
        roleName: '',
        roleDesc: ''
      },
      editform: {
        roleName: '',
        roleDesc: '',
        roleId: ''
      },
      roleId: '',
      grantList: [],
      defaultRoleRight: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      //   控制添加角色对话框是否显示
      adddialogFormVisible: false,
      rules: {
        roleName: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      },
      // 控制授权角色对话框是否显示
      grantDialogFormVisible: false,
      // 控制修改角色对话框是否显示
      editdialogFormVisible: false
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    //   获取角色列表数据
    init () {
      GetGrantList().then(result => {
        //   console.log(result)
        this.roleList = result.data
      })
    },
    // 点击添加角色按钮显示对话框
    showAddRoles () {
      this.adddialogFormVisible = true
    },
    // 实现添加角色操作
    addRole (formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          addRole(this.addform).then(result => {
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
    // 控制修改角色对话框显示
    showEditDialog (id) {
      this.editdialogFormVisible = true
      GetRoleById(id).then(result => {
        // console.log(result)
        this.editform = result.data
      })
    },
    // 实现修改角色操作
    editRole (formname) {
      this.$refs[formname].validate(valid => {
        editRole(this.editform.roleId, this.editform).then(result => {
          // console.log(result)
          if (result.meta.status === 200) {
            this.$message.success('修改角色成功')
            this.editdialogFormVisible = false
            this.init()
          } else {
            this.$message.error('修改角色失败')
          }
        })
      })
    },
    // 实现删除角色操作
    handleDelete (id) {
      this.$confirm('确定永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(id).then(result => {
          // console.log(id)
          if (result.meta.status === 200) {
            this.init()
          } else {
            this.$message.warning(result.meta.msg)
          }
        })
      })
    },
    // 修改角色权限
    grantSubmit () {
      var selectedNodes = this.$refs.tree.getCheckedNodes()
      // console.log(selectedNodes)
      var nodes = selectedNodes.map((value, index) => {
        // console.log(item)
        return value.id + ',' + value.pid
      })
      console.log(nodes)
      var nodesStr = nodes.join(',')
      // console.log(nodesStr)
      var set = new Set(nodesStr.split(','))
      // console.log(set)
      var finalAll = Array.from(set)
      // console.log(finalAll)
      var finalRid = finalAll.join(',')
      console.log(finalRid)
      grantRole(this.roleId, finalRid).then(result => {
        if (result.meta.status === 200) {
          this.$message.success('权限更新成功')
          this.grantDialogFormVisible = false
          this.init()
        } else {
          this.$message.error('权限更新失败')
        }
      })
    },
    // 弹出授权角色对话框并渲染数据
    showGrantDialog (row) {
      // console.log(row)
      this.grantDialogFormVisible = true
      this.roleId = row.id
      GetRightList('tree').then(result => {
        this.grantList = result.data
      })
      this.defaultRoleRight.length = 0
      // 遍历默认已有权限的id渲染到页面上
      row.children.forEach((first, index) => {
        if (first.children && first.children.length > 0) {
          first.children.forEach(second => {
            if (second.children && second.children.length > 0) {
              second.children.forEach(third => {
                this.defaultRoleRight.push(third.id)
              })
            }
          })
        }
      })
    },
    // 删除角色权限
    deleteRight (row, rightId) {
      // console.log(row)
      deleteRoleRight(row.id, rightId).then(result => {
        // console.log(result)
        if (result.meta.status === 200) {
          this.$message.success('删除权限成功')
          row.children = result.data
        } else {
          this.$message.error('删除权限失败')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  height: 300px;
  overflow: auto;
}
.el-tag {
  margin: 0 5px 10px;
}
</style>
