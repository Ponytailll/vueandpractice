<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="标题" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">新增</el-button>
    </div>
    <el-table
      :data="list"
      border
      v-loading="listLoading">
      <el-table-column label="序号" prop="id" sortable="custom" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" min-width="150px">
        <template slot-scope="scope">
          <span class="link-type" @click="detailClick(scope.row)">{{ scope.row.title }}</span>
          <el-tag>{{ scope.row.type | typeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="450" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status!='published'" size="mini" type="success" @click="handleModifyStatus(scope.row,'published')">发布
          </el-button>
          <el-button v-if="scope.row.status!='noPublished'" size="mini" @click="handleModifyStatus(scope.row,'noPublished')">未发布
          </el-button>
          <el-button type="primary" size="mini" @click="detailClick(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="activityPeopleClick(scope.row)">跳转</el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          noPublished: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      }

    },
    data() {
      return {
        listQuery: {
          page: 1,
          limit: 20,
          title: undefined,
          sort: '+id'
        },
        listLoading: false,
        list:[{}],
      }
    },
    mounted:{


    },
    methods:{
      //查询
      handleFilter() {
        this.listQuery.page = 1
//        this.getList()
      },
      //新增
      handleCreate(){

      },
      //详情
      detailClick(){

      },
      //发布
      handleModifyStatus(status){
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      activityPeopleClick(){

      }
    }
  }
</script>

<style scoped>
  .filter-container{
    margin-bottom: 10px;
  }
</style>
