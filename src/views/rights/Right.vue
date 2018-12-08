<template>
  <div class="right">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 权限列表区域 -->
    <el-table
      :data="rightList"
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="层级"
        width="80"
      >
      <!-- 添加span标签需要写到template模板里面 -->
      <template slot-scope="scope">
        <span>{{scope.row.level | levelFormat}}</span>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { GetRightList } from '@/api'
export default {
  data () {
    return {
      rightList: []
    }
  },
  mounted () {
    GetRightList('list').then(result => {
      // console.log(result)
      if (result.meta.status === 200) {
        this.rightList = result.data
      }
    })
  },
  // 过滤器（把输出层级的数字转成中文）
  filters: {
    levelFormat (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
