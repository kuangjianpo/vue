<template>
  <div class="list">
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
          @click='searchGoods'
        ></el-button>
      </el-input>
      <el-button
        type="success"
        plain
        @click="addGoods"
      >添加商品</el-button>
    </div>
    <!-- 数据表单区域 -->
    <template>
      <el-table
        :data="goodsList"
        border
        style="width: 100%;margin-top:15px"
      >
        <el-table-column
          type="index"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="goods_name"
          label="商品名称"
        >
        </el-table-column>
        <el-table-column
          prop="goods_price"
          label="商品价格（元）"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="goods_weight"
          label="商品重量"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="add_time"
          label="创建时间"
          width="100"
        >
        </el-table-column>
        <el-table-column label="操作" width="200">
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
  </div>
</template>
<script>
import {getGoodsList} from '@/api'
export default {
  data () {
    return {
      goodsList: [],
      searchkey: '',
      pagenum: 1,
      pagesize: 10,
      total: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      getGoodsList({
        query: this.searchkey,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
        .then(res => {
          if (res.meta.status === 200) {
            this.goodsList = res.data.goods
            this.total = res.data.total
          }
        })
    },
    searchGoods () {},
    addGoods () {
      this.$router.push({name: 'Add'})
    },
    handleEdit () {},
    handleDelete () {},
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.init()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
