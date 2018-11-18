<template>
  <div class="mainBody">
    <el-row style="background-color:#f1f1f1 ">
      <el-col style="height: 60px;width: 100%;border-bottom: 1px solid gainsboro">
        <el-col style="line-height: 60px;font-size: 16px;font-weight: 700;text-align: center">模拟用户
        </el-col>
      </el-col>
    </el-row>

    <el-card v-if="!dialogVisible" shadow="hover" class="table-hover info-body" style="margin-top: 10px">
      <el-row :gutter="10">
        <el-col>
          <div class="common-vertical"></div>
          <div class="common-vertical-title">模拟用户</div>
        </el-col>

        <el-col style="margin-top: 20px;margin-bottom: 10px">
          <el-input v-model="searchTxt" placeholder="请输入会员信息" style="width: 30%" size="small">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>

        <el-col>
          <el-table :data="custData" stripe border style="width: 100%">
            <el-table-column
              type="index"
              :index="indexMethod"
              label="序号" width="50">
            </el-table-column>
            <el-table-column label="昵称">
              <template slot-scope="scope">
                <span>{{scope.row.nickname || scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="手机号码" prop="name" width="110">
            </el-table-column>
            <el-table-column label="公司代码" prop="compcode" width="120">
            </el-table-column>
            <el-table-column
              prop="compname"
              label="公司名称">
            </el-table-column>
            <el-table-column
              label="操作" align="center" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="simulation(scope.row)">模拟用户</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col>
          <el-pagination v-if="pager.recordSize>5"
                         background
                         @current-change="handleCurrentChange"
                         :current-page="pager.pageIndex"
                         :page-size="pager.pageSize"
                         layout="prev, pager, next, jumper"
                         :total="pager.recordSize"
                         class="fr">
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
    <el-row style="z-index: 999;background-color: #f1f1f1;position: absolute;top: 0;right: 0;width: 100%" v-else>
      <el-col style="height: 60px;width: 100%;border-bottom: 1px solid gainsboro">
        <el-col style="line-height: 60px;font-size: 16px;font-weight: 700" :span="6" :offset="10">正在模拟<span
          style="color: red">{{user}}</span>用户
        </el-col>
        <el-col :span="2" :offset="5" style="line-height:4">
          <el-button type="primary" @click="closeDialog" size="mini">退出模拟</el-button>
        </el-col>
      </el-col>
      <el-col v-loading='loading' element-loading-text="正在加载"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)">
        <iframe :src="analogUserSrc" width="100%" scrolling="yes" frameborder="0"
                v-if="dialogVisible" :height="dialogHeight"></iframe>
      </el-col>
    </el-row>

    <!--<el-dialog title="用户模拟" fullscreen :visible.sync="dialogVisible" class="userSimulation-dialog" lock-scroll-->
    <!--:before-close="">-->
    <!--<iframe  name="ifd" width="100%" scrolling="yes" id="ifd"-->
    <!--frameborder="0" v-if="dialogVisible" -->
    <!--&gt;</iframe>-->

    <!--</el-dialog>-->

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center :close-on-click-modal="false" :before-close="closeDialog">
      正在模拟<span style="color: red">{{user}}</span>！
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="closeDialog">退出模拟</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {removeToken, getToken} from '@/public/auth'
  export default {
    name: 'AnalogUser',
    data() {
      return {
        searchTxt: '',
        custData: [],
        pager: {
          pageIndex: 1,
          pageSize: 10,
          recordSize: 0,
        },
        dialogVisible: false,
        dialogHeight: 0,
        centerDialogVisible: false,
        user: '',
        loading: true,
        analogUserSrc:this.$publicApi.formalUrl+"/#/conversionPage"
      }
    },
    created() {
      new Promise((reslove, reject) => {
        //防止是强制刷新，先去清空模拟登陆用户的所有信息
        if (window.localStorage.getItem("userSimulation")) {
          let param = {
            key: 'sess:' + getToken()
          }
          this.$api.get(this.$publicApi.DEL_USERINFO, param, r => {
            if (r.code === 200) {
              window.localStorage.removeItem('userSimulation')
              sessionStorage.removeItem("loginModel")
              sessionStorage.removeItem("sessionId")
              removeToken()
              reslove(1);
            } else {
              reject()
            }
          })
        } else {
          reslove(0);
        }
      }).then(r => {
        if (r === 1) {
          this.$message.success({
            message: '您已退出模拟登陆'
          })
        }
        this.getCustData()
      }).catch(err => {
        this.$message.error({
          message: '退出模拟登陆失败'
        })
      })
    },
    computed: {},
    methods: {
      //获得注册的用户
      getCustData() {
        let param = {
          searchTxt: this.searchTxt.trim(),
          pageIndex: this.pager.pageIndex,
          userId: '',
          pageSize: this.pager.pageSize,
          searchFlag: 1
        }
        this.$api.post(this.$publicApi.GET_CUSTLIST, param, r => {
          if (r.code === 200) {
            if (r.result != null) {
              this.custData = r.result
            } else {
              this.custData = []
            }
            this.pager = r.pager
          }
        })
      },
      //索引
      indexMethod(index) {
        return (this.pager.pageIndex - 1) * this.pager.pageSize + index + 1
      },
      //分页
      handleCurrentChange(val) {
        this.pager.pageIndex = val
        this.getCustData()
      },
      //搜索
      search() {
        this.pager.pageIndex = 1
        this.getCustData()
      },
      //模拟用户
      simulation(item) {
        let msg = '你将要模拟<span style="color:red">' + (item.nickname || item.name) + '</span>'
        const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '你将要模拟 '),
            h('span', {style: 'color: red'}, item.nickname || item.name),
            h('span', null, '的操作,确认继续吗？ '),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(action => {
          /*          this.user = item.nickname || item.name
                    this.centerDialogVisible = true*/
          this.user = item.nickname || item.name
          let userSimulationParam = {
            userName: item.name,
            token: 'sess:574BPGg8FzLKrByd0UTJ7gRNM8ssB2e2',
            // token: 'sess:'+loginModel.getSessionId(),
            rearUser: 'admin'
          }
          window.localStorage.setItem("userSimulation", JSON.stringify(userSimulationParam))
          /*          window.open('#/conversionPage')*/
          this.dialogVisible = true
          this.dialogHeight = document.documentElement.scrollHeight - 70
          setTimeout(() => {
            this.loading = false
          }, 1500)
        }).catch(action => {
          console.log(action)
        });
      },

      //退出模拟
      closeDialog(done) {
        this.$confirm('是否退出当前的用户模拟', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '是',
          cancelButtonText: '否'
        })
          .then(() => {
            let param = {
              key: 'sess:' + getToken()
            }
            //删除模拟登陆用户的所有信息
            this.$api.get(this.$publicApi.DEL_USERINFO, param, r => {
              if (r.code === 200) {
                window.localStorage.removeItem("userSimulation")
                sessionStorage.removeItem("loginModel")
                sessionStorage.removeItem("sessionId")
                removeToken()
                this.dialogVisible = false
                this.loading = true
                this.$message.success({
                  message: '您已退出模拟登陆'
                })
              }
            })

          })
          .catch(action => {

          });
      },
      //这是监听窗口关闭的事件
      beforeunloadHandler(e) {
        if (window.localStorage.getItem("userSimulation")) {
          let param = {
            key: 'sess:' + getToken()
          }
          this.$api.get(this.$publicApi.DEL_USERINFO, param, r => {
            if (r.code === 200) {
              window.localStorage.removeItem('userSimulation')
              sessionStorage.removeItem("loginModel")
              sessionStorage.removeItem("sessionId")
              removeToken()
            }
          })
        }
      }
    },
    destroyed() {
      window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
    },
    mounted() {
      //监听窗口关闭事件
      window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    }
  }
</script>

<style scoped>
  .mainBody {
    background: #b4daf0 url("../../images/analogUser/bg_page.jpg") no-repeat;
    background-size: 100%;
    height: 933px;
  }

  .info-body {
    width: 1100px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
<style>
  .userSimulation-dialog > .el-dialog > .el-dialog__body {
    padding: 0 !important;
  }
</style>
