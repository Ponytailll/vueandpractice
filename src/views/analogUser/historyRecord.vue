<template>
  <div>
    <el-card shadow="hover" class="table-hover">
      <el-row :gutter="10" style="margin-top: -13px">
        <el-col>
          <div class="common-vertical"></div>
          <div class="common-vertical-title">历史记录</div>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top: 10px">
        <el-col>
          <el-table :data="tableData" stripe style="width: 100%;" border size="mini"
                    @selection-change="handleSelectionChange">
            <el-table-column label="用户" header-align="center" prop="createUser"></el-table-column>
            <el-table-column label="方法描述" width="300" header-align="center" prop="dictionaryActionName"></el-table-column>
            <!--<el-table-column label="方法" width="300" header-align="center" prop="action"></el-table-column>-->
            <el-table-column lahistoryRecordbel="IP"  header-align="center" prop="ip"></el-table-column>
            <!--<el-table-column label="参数" align="center" prop="paramter"></el-table-column>-->
            <el-table-column label="操作平台" align="center" prop="operationPlatform" width="100"></el-table-column>
            <el-table-column label="操作者" align="center" prop="name"></el-table-column>
            <el-table-column label="操作时间" align="center" prop="createDt"></el-table-column>
          </el-table>
          <el-pagination v-if="recordSize>0"
                         @current-change="handleCurrentChange"
                         :current-page="currentPage"
                         :page-size="pageSize"
                         layout="total, prev, pager, next, jumper"
                         :total="recordSize"
                         class="fr">
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import util from "@/public/util"
  import loginModel from '@/public/loginModel'
  export default {
    name: 'my-notes',
    data() {
      return {
        multipleSelection: [],
        recordSize: 0,
        currentPage: 1,
        pageSize: 10,
        tableData: [],
        dialogVisible: false,
      }
    },
    created() {
      this.getTableData()
    },
    methods: {
      // 获得列表数据
      getTableData() {
        let param = {
          pageKey: this.currentPage,
          pageSize: this.pageSize,
          userId: loginModel.getUserId(),
        };
        this.$api.post(this.$publicApi.GET_HISTORY_RECORD_LIST, param, r => {
          if (r.code === 200) {
            this.recordSize = r.result.count
            if (r.result.list != null) {
              this.tableData = r.result.list;
              for (let v of r.result.list) {
                v.createDt = util.formatDate.timestampToDatetime(v.createDt)
              }
            }
          } else {
            this.$message.info({
              message: '未获得数据'
            })
          }
        })
      },
      editNote(item) {
        this.formData.noteId = item.noteId
        this.formData.userId = item.userId
        this.formData.content = item.content
        this.formData.companyName = item.company.companyName
        this.formData.name = item.name
        this.formData.companyId = item.companyId
        this.dialogVisible = true
      },


      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getTableData()
      }
    }
  }
</script>

<style scoped>
  .btn-sure {
    width: 100%;
    margin-top: 30px;
  }
</style>
