<template>
  <div class="categories">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加分类按钮 -->
    <el-button
      type="success"
      plain
      @click="showAddCate"
    >添加分类</el-button>
    <!-- 使用TreeGrid组件 -->
    <tree-grid
      :treeStructure="true"
      :columns="columns"
      :data-source="cateList"
      @deleteCate="deleteCategory"
      @editCate="editCategory"
    >
    </tree-grid>
    <!-- 添加商品分类对话框 -->
    <el-dialog
      title="添加商品分类"
      :visible.sync="adddialogFormVisible"
    >
      <el-form
        :model="addform"
        ref="addform"
        label-width="100px"
      >
        <el-form-item
          prop="cat_name"
          label="分类名称"
        >
          <el-input
            v-model="addform.cat_name"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="roleDesc"
          label="父级名称"
        >
          <el-cascader
            :options="cateListAdd"
            v-model="selectedOptions"
            @change="handleChange"
            :props="cateprops"
          >
          </el-cascader>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addCateSubmit"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改商品分类对话框 -->
    <el-dialog
      title="修改商品分类"
      :visible.sync="editdialogFormVisible"
    >
      <el-form
        :model="editform"
        ref="editform"
        label-width="100px"
      >
        <el-form-item
          prop="cat_name"
          label="分类名称"
        >
          <el-input
            v-model="editform.cat_name"
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
          @click="editCateSubmit"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCateList, addCategories, getCateById, editCateById, deleteCateById } from '@/api'
import TreeGrid from '@/components/TreeGrid/TreeGrid.vue'
export default {
  components: {
    TreeGrid: TreeGrid
  },
  data () {
    return {
      adddialogFormVisible: false,
      editdialogFormVisible: false,
      addform: {
        cat_name: '',
        cat_pid: '',
        cat_level: ''
      },
      editform: {
        cat_id: '',
        cat_name: ''
      },
      cateprops: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      selectedOptions: [],
      cateListAdd: [],
      cateList: [],
      dataSource: [],
      columns: [
        {
          text: '分类名称',
          dataIndex: 'cat_name',
          width: ''
        },
        {
          text: '是否有效',
          dataIndex: 'cat_deleted',
          width: ''
        },
        {
          text: '排序',
          dataIndex: 'cat_level',
          width: ''
        }
      ]
    }
  },
  mounted () {
    this.init(3)
  },
  methods: {
    // 修改商品分类
    editCateSubmit () {
      editCateById(this.editform.cat_id, this.editform).then(res => {
        // console.log(res)
      })
    },
    // 添加商品分类
    addCateSubmit () {
      addCategories(this.addform).then(res => {
        console.log(res)
        this.$message.success('添加分类数据成功')
        this.init(3)
        this.adddialogFormVisible = false
        this.$refs['addform'].resetFields()
      })
    },
    handleChange (value) {
    //   console.log(value)
      if (value.length === 1) {
        this.addform.cat_level = 1
        this.addform.cat_pid = value[0]
      } else if (value.length === 2) {
        this.addform.cat_level = 2
        this.addform.cat_pid = value[1]
      }
    },
    showAddCate () {
      this.adddialogFormVisible = true
      this.selectedOptions = []
      getCateList(2).then(res => {
        this.cateListAdd = res.data
      })
    },
    init (type) {
      getCateList(type).then(res => {
        this.cateList = res.data
      })
    },
    deleteCategory (id) {
      deleteCateById(id).then(res => {
        if (res.meta.status === 200) {
          this.$message.success('删除分类成功')
          this.init(3)
        }
      })
    },
    editCategory (id) {
      this.editdialogFormVisible = true
      getCateById(id).then(res => {
        this.editform.cat_name = res.data.cat_name
        this.editform.cat_id = res.data.cat_id
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
