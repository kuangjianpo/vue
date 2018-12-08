<template>
  <div class="add">
    <!-- 步骤条 -->
    <el-steps
      :active="active-0"
      finish-status="success"
    >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- tab标签页 -->
    <template>
      <el-tabs
        v-model="active"
        tab-position="left"
        class="tab"
      >
        <el-tab-pane
          label="基本信息"
          name="0"
        >
          <el-form
            :model="addForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="商品名称"
              prop="goods_name"
            >
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item
              label="商品价格"
              prop="goods_price"
            >
              <el-input
                v-model="addForm.goods_price"
                type="number"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="商品重量"
              prop="goods_weight"
            >
              <el-input
                v-model="addForm.goods_weight"
                type="number"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="商品数量"
              prop="goods_number"
            >
              <el-input
                v-model="addForm.goods_number"
                type="number"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-cascader
                :options="cateList"
                v-model="selectedOptions"
                @change="handleChange"
                :props="goodprops"
                :clearable='true'
              >
              </el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="商品参数"
          name="1"
        >商品参数</el-tab-pane>
        <el-tab-pane
          label="商品属性"
          name="2"
        >商品属性</el-tab-pane>
        <el-tab-pane
          label="商品图片"
          name="3"
        >
          <el-upload
            class="upload-demo"
            action="http://localhost:8888/api/private/v1/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="uploadDone"
            :before-upload="uploadBefore"
            :file-list="fileList"
            :headers=getToken()
            list-type="picture"
          >
            <el-button
              size="small"
              type="primary"
            >点击上传</el-button>
            <div
              slot="tip"
              class="el-upload__tip"
            >只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane
          label="商品内容"
          name="4"
        >
          <quill-editor
            v-model="addForm.goods_introduce"
            ref="myQuillEditor"
            @blur="onEditorBlur($event)"
            :options="editorOption"
          >
          </quill-editor>
        </el-tab-pane>
      </el-tabs>
      <el-button
        type="success"
        class="addBtn"
        @click="addGoodSubmit"
      >确认添加</el-button>
    </template>
    <!-- 查看图片 -->
    <el-dialog
      title="查看图片"
      :visible.sync="picdialogVisible"
    >
      <img
        :src="userpic"
        alt=""
      >
    </el-dialog>
  </div>
</template>
<script>
import { getCateList, addGoods } from '@/api'
export default {
  data () {
    return {
      editorOption: {},
      userpic: '',
      active: 0,
      addForm: {
        goods_name: '',
        goods_price: '100',
        goods_number: '1',
        goods_weight: '50',
        goods_cat: '',
        pics: [],
        attrs: '',
        goods_introduce: ''
      },
      goodprops: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      selectedOptions: [],
      cateList: [],
      fileList: [],
      picdialogVisible: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      getCateList(3).then(res => {
        if (res.meta.status === 200) {
        // console.log(res)
          this.cateList = res.data
        }
      })
    },
    // 添加商品
    addGoodSubmit () {
      addGoods(this.addForm).then(res => {
        console.log(res)
        if (res.meta.status === 201) {
          this.$message.success('添加商品成功')
          this.$router.push({name: 'List'})
          this.init()
        }
      })
    },
    // 商品内容文本框失焦触发事件
    onEditorBlur (ev) {
      console.log(this.addForm)
    },
    // 获取token
    getToken () {
      var token = localStorage.getItem('itcast_token')
      return { Authorization: token }
    },
    handleChange () {
      // console.log(this.selectedOptions)
      this.addForm.goods_cat = this.selectedOptions.join(',')
      // console.log(this.addForm.goods_cat)
    },
    // 图片预览
    handlePreview (file) {
      // console.log(file)
      this.picdialogVisible = true
      this.userpic = 'http://localhost:8888/' + file.response.data.tmp_path
      // console.log(this.userpic)
    },
    // 图片移除
    handleRemove (file, fileList) {
      // console.log(file)
      // console.log(fileList)
      if (!file.response) {
        return
      }
      var deletePic = file.response.data.tmp_path
      var index = this.addForm.pics.findIndex(value => {
        return value.pic.indexOf(deletePic) !== -1
      })
      this.addForm.pics.splice(index, 1)
    },
    // 图片上传之前
    uploadBefore (file) {
      // console.log(file)
      if (file.size > 500 * 1024) {
        this.$message.warning('上传图片超出限制!')
        return false
      }
    },
    // 图片上传成功后
    uploadDone (response, file, fileList) {
      this.addForm.pics.push({ pic: '/' + response.data.tmp_path })
    }
  }
}
</script>
<style lang="scss" scoped>
.tab {
  margin-top: 15px;
}
.addBtn {
  float: right;
  margin-top: 15px;
}
.add {
  margin-right: 15px;
}
.quill-editor {
  height: 400px;
  border-bottom: 1px solid #ccc;
  .ql-container {
    height: 300px;
  }
}
</style>
