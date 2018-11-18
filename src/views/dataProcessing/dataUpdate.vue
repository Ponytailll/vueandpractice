<template>
  <div>
    <div class="el-card dataMain-comPad">
      <!--el面包屑 顶部-->
      <div style="">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a :to="{ path: '/dataUpdate' }">数据更新</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--按钮-->
      <div>
        <el-button :disabled="btnDisFlag" type="primary" size="mini" @click="inputCompanyName"
                   style="margin-left: 10px;">
          添加公司<i class="el-icon-plus" style="padding-left: 5px;"></i></el-button>
        <ButtonFileUpload :btnDisFlag="btnDisFlag" @success="success" flag="import"
                          style="margin-left: 10px;"></ButtonFileUpload>
        <el-button :disabled="btnDisFlag" type="primary" size="mini" @click="getExportClassification"
                   style="margin-left: 10px;">调取数据
        </el-button>
        <el-button :disabled="btnDisFlag" type="primary" size="mini" @click="openCompany">导出公司<i
          class="el-icon-download" style="padding-left: 5px;"></i></el-button>
        <el-button :disabled="btnDisFlag" type="primary" size="mini" @click="exportTitle">导出详细<i
          class="el-icon-download" style="padding-left: 5px;"></i></el-button>
        <el-button :disabled="btnDisFlag" type="primary" size="mini" @click="">一键处理(无功能,防忘记)</el-button>
        <el-button :disabled="btnDisFlag" type="primary" size="mini" @click="openImportCust">导入会员列表</el-button>
        <el-button :disabled="btnDisFlag" type="primary" size="mini" @click="openCompanyLable()">设置标签</el-button>
      </div>
      <!--label标签栏-->

      <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit" @tab-click="handleClick"
               style="padding-top: 30px;">

        <el-tab-pane v-for="(item, index) in editableTabs" :label="item.labelName" :name="item.labelId"
                     :key="item.labelId" :stretch="true">
          <el-input placeholder="请输入公司名称" icon="search" v-model="searchName" class="search-input">
            <el-button slot="append" icon="el-icon-search" @click="searchImportList"></el-button>
          </el-input>
          <div style="padding: 10px;float: right;">
            <span>当前 {{recordImportList.length}} / {{nowAllCount}} 条数据  </span><a @click="showAll">全部</a>
          </div>
          <!--标签下的table内容 开始-->
          <!--:default-sort="{prop: 'companyName', order: 'descending'}"-->
          <!--vue-pull-to-wrapper-->
          <el-table v-loadmore="loadMore" :data="recordImportList" max-height="600" style="width: 100%;"
                    @expand-change="expandRow">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-tabs type="border-card">
                  <el-tab-pane label="对外投资">
                    <el-button :disabled="btnDisFlag" type="primary" size="mini"
                               @click="getExportClassification('other')" style="margin-left: 10px;">调取数据
                    </el-button>
                    <el-table :data="props.row.sub" max-height="630" style="width: 100%;">
                      <el-table-column prop="name" label="公司名称" sortable></el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </template>
            </el-table-column>
            <el-table-column prop="companyName" :filters="recordFilter.recordCompanyList"
                             :filter-method="filterHandler"
                             label="公司名称" sortable></el-table-column>
            <el-table-column prop="isSuccess" :filters="recordFilter.recordStatusList" :filter-method="filterHandler"
                             label="状态" width="200" sortable>
              <template slot-scope="scope">
                <span v-if="scope.row.isSuccess==1" style="color: #67c23a">成功</span>
                <span v-if="scope.row.isSuccess==2" @click="resetTransfer(scope.row.failUrl,scope.row)"
                      style="color: #f56c6c">失败</span>
              </template>
            </el-table-column>
            <el-table-column prop="remarks" :filters="recordFilter.recordReasonList" :filter-method="filterHandler"
                             label="备注" width="300" sortable></el-table-column>
            <el-table-column prop="dealRemarks" :filters="recordFilter.recordDealRemarksList"
                             :filter-method="filterHandler" label="处理备注" width="200" sortable></el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button @click.native.prevent="deleteRow(scope.$index, scope.row.id, scope.row.companyName)"
                           type="text" size="small">移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--标签下的table 结束-->
        </el-tab-pane>
      </el-tabs>
      <div v-show="editableTabs.length==0" style="text-align: center;line-height: 190px;">
        <span style="color: #606266;">暂无标签</span>
      </div>
    </div>
    <!--调取数据弹出框-->
    <el-dialog title="调取数据" :visible="dialogVisible" :visible.sync="dialogVisible" size="tiny">
      <div v-loading.lock="fullscreenLoading" style="text-align: right;box-sizing: border-box;">
        <el-tree default-expand-all :render-after-expand="false" ref="tree" width="150" :data="exportClassificationList"
                 show-checkbox
                 node-key="value"></el-tree>
        <span slot="footer" class="dialog-footer">
           <el-button @click="dialogVisible = false">取 消</el-button>
           <el-button type="primary" @click="dataTransfer">确 定</el-button>
         </span>
      </div>
    </el-dialog>
    <!--其他公司调取数据弹出框-->
    <el-dialog title="调取数据" :visible="dialogVisibleOther" :visible.sync="dialogVisibleOther" size="tiny">
      <div v-loading.lock="fullscreenLoading" style="text-align: right;box-sizing: border-box;">
        <el-tree default-expand-all :render-after-expand="false" ref="tree" width="150" :data="exportClassificationList"
                 show-checkbox
                 node-key="value"></el-tree>
        <span slot="footer" class="dialog-footer">
           <el-button @click="dialogVisibleOther = false">取 消</el-button>
           <el-button type="primary" @click="dataTransfer('other')">确 定</el-button>
         </span>
      </div>
    </el-dialog>
    <!--导出数据弹出框-->
    <el-dialog title="导出数据" :visible="dialogVisibleNew" :visible.sync="dialogVisibleNew" size="tiny"
               style="margin-bottom: 20px!important;">
      <template style="margin-bottom: 20px;margin-left: 10px;">
        <el-radio v-model="isSuccessAndFail" label="1">成功公司信息</el-radio>
        <el-radio v-model="isSuccessAndFail" label="2">失败公司信息</el-radio>
      </template>
      <div v-loading.lock="fullscreenLoadingNew" style="text-align: right;box-sizing: border-box;">
        <!--default-expand-all 默认展开-->
        <el-tree :render-after-expand="false" @check-change="handleCheckChange" ref="treeNew" width="150"
                 :data="exportTitleList" show-checkbox node-key="id"></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleNew = false">取 消</el-button>
          <el-button type="primary" @click="exportInfo">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <!--导入会员弹出框-->
    <el-dialog title="导入会员" :visible="dialogVisibleCust" :visible.sync="dialogVisibleCust" size="small" width="30%"
               height="20%"
               style="margin-bottom: 20px!important;">
      <template style="margin-bottom: 20px;margin-left: 10px;">
        <el-radio v-model="allCustInfo" label="1">全部会员</el-radio>
        <el-radio v-model="allCustInfo" label="2">已认证会员</el-radio>
        <el-radio v-model="allCustInfo" label="7">普通机构</el-radio>
        <el-radio v-model="allCustInfo" label="8">代理机构</el-radio>
        <el-radio v-model="allCustInfo" label="3">银行机构</el-radio>
        <el-radio v-model="allCustInfo" label="4">政府机构</el-radio>
        <el-radio v-model="allCustInfo" label="5">评估机构</el-radio>
        <el-radio v-model="allCustInfo" label="6">担保机构</el-radio>
        <el-radio v-model="allCustInfo" label="7">投资机构</el-radio>
        <el-radio v-model="allCustInfo" label="8">基金管理人</el-radio>
        <el-radio v-model="allCustInfo" label="9">小额贷款</el-radio>
        <el-radio v-model="allCustInfo" label="10">保险机构</el-radio>
        <el-radio v-model="allCustInfo" label="11">商标代理</el-radio>
        <el-radio v-model="allCustInfo" label="12">高校机构</el-radio>
      </template>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleCust = false">取 消</el-button>
          <el-button type="primary" @click="importCust">确 定</el-button>
      </span>
    </el-dialog>
    <!--导出公司弹出框-->
    <el-dialog title="导出公司" :visible="dialogVisibleCompany" :visible.sync="dialogVisibleCompany" size="small"
               width="30%" height="10%"
               style="margin-bottom: 20px!important;">
      <template style="margin-bottom: 20px;margin-left: 10px;">
        <el-radio v-model="exportCompanyFlag" label="3">全部公司</el-radio>
        <el-radio v-model="exportCompanyFlag" label="1">成功公司</el-radio>
        <el-radio v-model="exportCompanyFlag" label="2">失败公司</el-radio>
        <el-radio v-model="exportCompanyFlag" label="0">未调取公司</el-radio>
      </template>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleCompany = false">取 消</el-button>
          <el-button type="primary" @click="exportClick">确 定</el-button>
      </span>
    </el-dialog>

    <!--设置标签弹出框-->
    <el-dialog title="设置标签" :visible="dialogVisibleAgencyType" :visible.sync="dialogVisibleAgencyType" size="small"
               width="30%" height="10%"
               style="margin-bottom: 20px!important;">
      <div v-loading.lock="fullscreenLoadingAgencyType">
        <template style="margin-bottom: 20px;margin-left: 10px;display: block;float: left;">
          <div>
            <el-radio v-model="agencyType" label="1">普通机构</el-radio>
            <el-radio v-model="agencyType" label="2">代理机构</el-radio>
            <el-radio v-model="agencyType" label="3">银行机构</el-radio>
            <el-radio v-model="agencyType" label="4">政府机构</el-radio>
            <el-radio v-model="agencyType" label="5">评估机构</el-radio>
            <el-radio v-model="agencyType" label="6">担保机构</el-radio>
            <el-radio v-model="agencyType" label="7">投资机构</el-radio>
            <el-radio v-model="agencyType" label="8">基金管理人</el-radio>
            <el-radio v-model="agencyType" label="9">小额贷款</el-radio>
            <el-radio v-model="agencyType" label="10">保险机构</el-radio>
            <el-radio v-model="agencyType" label="11">商标代理</el-radio>
            <el-radio v-model="agencyType" label="12">高校机构</el-radio>
          </div>
        </template>
        <div class="agencyTypeClass">
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleAgencyType = false">取 消</el-button>
                <el-button type="primary" @click="setCompanyLable">确 定</el-button>
            </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ButtonFileUpload from "../../components/commonButton/Button-FileUpload.vue";
  export default {
    data() {
      return {
        searchName: "",
        allCustInfo: "1",
        isSuccessAndFail: "1",
        nowLabelId: '',
        nowLabel: '',
        editableTabsValue: '',
        editableTabs: [],
        tabIndex: 1,
        labelNameInput: "",
        recordImportList: [],
        recordFilter: {
          recordCompanyList: [],
          recordStatusList: [],
          recordReasonList: [],
          recordDealRemarksList: [],
        },
        exportClassificationList: [{
          id: 1,
          label: '全部',
          children: []
        }],
        exportTitleList: [{
          id: 1,
          label: '全部',
          children: []
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dialogVisible: false,
        dialogVisibleOther: false,
        dialogVisibleNew: false,
        dialogVisibleCust: false,
        dialogVisibleCompany: false,
        dialogVisibleAgencyType: false,
        resultCompanyScreen: {
          paramListStatus: [],
          paramListReason: [],
        },
        fullscreenLoading: false,
        fullscreenLoadingNew: false,
        fullscreenLoadingAgencyType: false,
        exportList: [],
        btnDisFlag: false,
        exportCompanyFlag: '3',
        nowOtherList: [],
        nowFailUrl: [],
        nowFailCompanyName: [],
        loadSign: true,
        page: 1,
        pageSize: 10,
        nowAllCount: 0,
        agencyType: '1',
      }
    },
    name: 'example',
    components: {
      ButtonFileUpload: ButtonFileUpload,
    },

    watch: {
      nowLabelId: function (val, oldVal) {
        if (val !== '' && val !== undefined && val !== null) {
          this.btnDisFlag = false;
        } else {
          this.btnDisFlag = true;
        }
      },
      pageSize: function (val, oldVal) {
        let that = this;
        if (val !== 0) {
          this.getRecordImportList(that.nowLabelId);
        }
      },
    },
    mounted() {
      this.userId = "0af5342a-0ba2-4e14-9f98-3134d895d1b4";
      // let sessionData = JSON.parse(sessionStorage.getItem("loginModel"));
      this.getExportClassification('no');
      // if (sessionData == null) {
      //   this.$router.push({path: "/login"});
      // return;
      // } else {
      //   this.userId = sessionData.id;
      // }

      if (this.labelId == null || this.labelId === "" || this.labelId === undefined) {
        this.btnDisFlag = true;
      }
      this.getRecordLabelList();
    },
    methods: {
      openCompanyLable(){
        this.dialogVisibleAgencyType = true;
      },
      setCompanyLable(){
        let that = this;
        let params = {};
        params.param = that.recordImportList;
        params.agencyType = this.agencyType;
        that.fullscreenLoadingAgencyType = true;
        that.$api.post(that.$publicApi.UPDATE_COMPANY_TYPE, params, res => {
          if (res.code === 200) {
            that.fullscreenLoadingAgencyType = false;
            that.dialogVisibleAgencyType = false;
            that.$message({
              type: 'success',
              message: '标签设置成功 ' + res.result + ' 条',
            });
          }
        });
      },
      showAll(){
        this.pageSize = this.nowAllCount;
      },
      loadMore () {
        let that = this;
        if (this.loadSign) {
          this.loadSign = false
          this.page++
          if (this.pageSize < this.nowAllCount) {
            this.pageSize += 10;
          }
          setTimeout(() => {
            this.loadSign = true
          }, 1000);
        }
      },
      resetTransfer(failUrl, companyInfo){
        let that = this;

        let failUrlList = JSON.parse(failUrl);
        let urlname = '';
        for(let item of failUrlList){
          urlname += item.name + ','
        }
        // $.each(failUrlList, function (index, item, array) {
        //   urlname += item.name + ','
        // });
        urlname = urlname.substr(0, urlname.length - 1);
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '您将重新调取该公司 '),
            h('span', {style: 'color: rgb(222, 68, 69)'}, urlname),
            h('span', null, ' 数据,'),
            h('span', null, '是否继续?'),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
            } else {
              done();
            }
          }
        }).then(() => {

          that.nowFailCompanyName = [];
          that.nowFailUrl = [];
          if (failUrl !== "" && failUrl != null && failUrl !== undefined) {
            let failUrlList = JSON.parse(failUrl);
            that.nowFailUrl = failUrlList;
            that.nowFailCompanyName.push(companyInfo);
            that.dataTransfer("failUrl");
          }

        }).catch(() => {
        });
      },
      searchImportList(){
        let that = this;
        that.companyName = that.searchName;
        that.getRecordImportList(that.nowLabelId);
      },
      expandRow(row, expanded){
        if (expanded.length > 1) {
          expanded.shift()
        }
        let that = this;
//        investList
        let param = {};
        param.companyName = row.companyName;
        if (expanded) {
          row.sub = [];
          that.$api.post(that.$publicApi.GET_INVEST_LIST, param, res => {
            if (res.code === 200) {
              that.nowOtherList = res.result;
              // $.each(that.nowOtherList, function (index, item, array) {
              //   item.companyName = item.name;
              // });
              for(let item of that.nowOtherList){
                item.companyName = item.name;
              }
              res.result.forEach(d => {
                row.sub.push(d);
              });
            }
          });
        } else {
          row.sub = [];
        }
      },
      /*导出公司列表*/
      exportClick(){
        let that = this;
        let params = {};
        let companyList = [];
        if (that.exportCompanyFlag === "3") {
          params.param = that.recordImportList;
        } else {
          // $.each(that.recordImportList, function (index, item, array) {
          //   if (item.isSuccess + '' === that.exportCompanyFlag) {
          //     companyList.push(item);
          //   }
          // });
          for(let item of that.recordImportList){
            if (item.isSuccess + '' === that.exportCompanyFlag) {
              companyList.push(item);
            }
          }
          params.param = companyList;
        }
        if (params.param.length === 0) {
          that.$message({
            type: 'warning',
            message: '公司列表为空!'
          });
          return;
        }
        that.dialogVisibleCompany = false;
        that.$api.post(that.$publicApi.EXPORT_RECORD_COMPANY, params, res => {
          if (res.code === 200) {
            window.open(that.$publicApi.DOWNLOAD_URL + res.result);
//            window.location.href = that.$publicApi.baseExcelView + res.result;
          }
        });
      },
      openCompany(){
        this.dialogVisibleCompany = true;
      },
      openImportCust(){
        this.dialogVisibleCust = true;
      },
      importCust(){
        let that = this;
        this.dialogVisibleCust = false;
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '您将向 '),
            h('span', {style: 'color: rgb(222, 68, 69)'}, this.nowLabel),
            h('span', null, ' 标签导入会员公司列表,并且会'),
            h('span', {style: 'color: rgb(222, 68, 69)'}, ' 覆盖该标签中原公司列表 '),
            h('span', null, ',是否继续?'),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
            } else {
              done();
            }
          }
        }).then(() => {
          that.addCustImport();
        }).catch(() => {
        });
      },
      addCustImport(){
        let that = this;
        let param = {};
        param.labelId = that.nowLabelId;
        param.userId = that.userId;
        param.deleteFlag = 1;
        param.createUser = that.userId;
        param.modifyUser = that.userId;
        param.type = 2;
        param.custFlag = that.allCustInfo;
        that.$api.post(that.$publicApi.INSERT_CUST_INFO_LIST, param, res => {
          if (res.code === 200) {
            that.getRecordLabelList("now");
          }
        });
      },
      //输入公司名称
      inputCompanyName(){
        let that = this;
        that.$prompt('请输入公司名称', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          let check = 0;
          // $.each(that.recordImportList, function (index, item, array) {
          //   if (item.companyName === value) {
          //     check += 1;
          //   }
          // });
          for(let item of that.recordImportList){
            if (item.companyName === value) {
              check += 1;
            }
          }
          if (check > 0) {
            that.$message({
              type: 'warning',
              message: '该公司已经存在!'
            });
            return;
          }
          that.addCompanyName(value);
        }).catch(() => {
        });
      },
      //添加公司名称
      addCompanyName(value){
        let that = this;
        let companyList = [];
        let param = {};
        param.labelId = that.nowLabelId;
        param.userId = that.userId;
        param.type = 2;
        param.deleteFlag = 1;
        param.createUser = that.userId;
        param.modifyUser = that.userId;
        param.companyName = value;
        companyList.push(param);
        that.$api.post(that.$publicApi.ADD_RECORD_IMPORT_DETAIL, companyList, res => {
          if (res.code === 200) {
            that.getRecordLabelList("now");
          } else if (res.code === 202) {
            that.$message({
              type: 'warning',
              message: '该公司已经存在!'
            });
          } else {
            that.$message({
              type: 'warning',
              message: '添加失败!'
            });
          }
        });
      },
      deleteRow(index, id, companyName) {
        let that = this;
        let param = {};
        param.userId = that.userId;
        param.modifyUser = that.userId;
        param.id = id;
        const h = this.$createElement;
        that.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '您将删除 '),
            h('span', {style: 'color: rgb(222, 68, 69)'}, ' ' + companyName + ' '),
            h('span', null, ',是否继续?'),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
            } else {
              done();
            }
          }
        }).then(() => {
          that.$api.post(that.$publicApi.DELETE_RECORD_BY_ID, param, res => {
            if (res.code === 200) {
              that.getRecordImportList(that.nowLabelId);
//            rows.splice(index, 1);
            }
          });
        }).catch(() => {
        });
      },
      //筛选时调用
      filterHandler(value, row, column) {
        // debugger
        const property = column['property'];
        return row[property] === value;
      },
      /*导出分类数据时 tree被选择时调用方法*/
      handleCheckChange(data, checked, indeterminate) {
        let that = this;
        //checked是最小菜单选择  indeterminate选是父菜单被选
        if (checked === true || indeterminate === true) {
          //如果为2说明是父菜单
          if (data.level === "2") {
            if (that.exportList != null && that.exportList !== undefined) {
              let a = 0;
              // $.each(that.exportList, function (index, item, array) {
              //   //如果列表里已经有该父菜单则a+1
              //   if (item.id == data.id) {
              //     a += 1;
              //   }
              // });
              for(let item of that.exportList){
                //如果列表里已经有该父菜单则a+1
                if (item.id == data.id) {
                  a += 1;
                }
              }
            }
            if (a === 0) {
              //如果列表里没有该父菜单则将其加进列表
              that.exportList.push(data);
            }
          }
          if (data.level === "3") {
            // $.each(that.exportList, function (index, item, array) {
            //   //如果父菜单id等于子菜单patentId
            //   if (item.id === data.parentId) {
            //     //则将其加入父菜单的list里
            //     item.checkTitle.push(data);
            //   }
            // });
            //如果为3则为子菜单
            for(let item of that.exportList){
              //如果父菜单id等于子菜单patentId
              if (item.id === data.parentId) {
                //则将其加入父菜单的list里
                item.checkTitle.push(data);
              }
            }
          }
        } else {
          //取消勾选 删除list里内容
          if (that.exportList != null && that.exportList !== undefined) {
            //先循环父菜单
            for(let item of that.exportList){
              if (item != null) {
                if (item.checkTitle != null && item.checkTitle !== undefined) {
                  //循环该父菜单里的子菜单
                  for(let itemNew of item.checkTitle){
                    if (itemNew != null) {
                      //如果删除的子菜单id 在list里存在
                      if (itemNew.id === data.id) {
                        //则删除该obj
                        item.checkTitle.splice($.inArray(itemNew, item.checkTitle), 1);
                      }
                    }
                  }
                }
                //如果父菜单被取消勾选  取消勾选的id存在list里
                if (item.id === data.id) {
                  //删除该父菜单list里所有子菜单列表
                  // (但是该父菜单不删除 删除会有问题
                  // 如果父菜单被选中过 在选中将不进入handleCheckChange方法
                  // 所以不删除父菜单只删除里面的子菜单
                  // 然后判断checkTitle里面length是否大于0来判断该父菜单里是否有子菜单被选中)
                  for(let item of item.checkTitle){
                    item.checkTitle.splice($.inArray(itemNew, item.checkTitle), 1);
                  }
                  //删除父菜单的代码
                  //that.exportList.splice($.inArray(item,that.exportList),1);
                }

              }
            }
            // $.each(that.exportList, function (index, item, array) {
            //   if (item != null) {
            //     if (item.checkTitle != null && item.checkTitle != undefined) {
            //       //循环该父菜单里的子菜单
            //       $.each(item.checkTitle, function (index, itemNew, array) {
            //         if (itemNew != null) {
            //           //如果删除的子菜单id 在list里存在
            //           if (itemNew.id == data.id) {
            //             //则删除该obj
            //             item.checkTitle.splice($.inArray(itemNew, item.checkTitle), 1);
            //           }
            //         }
            //       });
            //     }
            //     //如果父菜单被取消勾选  取消勾选的id存在list里
            //     if (item.id == data.id) {
            //       //删除该父菜单list里所有子菜单列表
            //       // (但是该父菜单不删除 删除会有问题
            //       // 如果父菜单被选中过 在选中将不进入handleCheckChange方法
            //       // 所以不删除父菜单只删除里面的子菜单
            //       // 然后判断checkTitle里面length是否大于0来判断该父菜单里是否有子菜单被选中)
            //       $.each(item.checkTitle, function (index, itemNew, array) {
            //         item.checkTitle.splice($.inArray(itemNew, item.checkTitle), 1);
            //       });
            //       //删除父菜单的代码
            //       //that.exportList.splice($.inArray(item,that.exportList),1);
            //     }
            //   }
            // });
          }
        }
      },
      /*导出分类数据确认时*/
      exportInfo(){
        let that = this;
        let companyList = [];
        let z = 0;
        let mes = "";
        if (that.exportList !== undefined && that.exportList.length !== 0 && that.exportList != null && that.exportList !== "") {
          // $.each(that.recordImportList, function (index, item, array) {
          //   if (that.isSuccessAndFail === "1") {
          //     if (item.isSuccess === 1) {
          //       companyList.push(item);
          //     }
          //     mes = "调取成功"
          //   } else {
          //     if (item.isSuccess == 2) {
          //       companyList.push(item);
          //     }
          //     mes = "调取失败"
          //   }
          // });
          for(let item of that.recordImportList){
            if (that.isSuccessAndFail === "1") {
              if (item.isSuccess === 1) {
                companyList.push(item);
              }
              mes = "调取成功"
            } else {
              if (item.isSuccess === 2) {
                companyList.push(item);
              }
              mes = "调取失败"
            }
          }
          if (companyList.length === 0) {
            that.$message({
              type: 'warning',
              message: mes + '公司列表为空!'
            });
            return;
          }
          // $.each(that.exportList, function (index, item, array) {
          //   item.companyList = [];
          //   item.companyList = companyList;
          //   if (item.checkTitle != undefined && item.checkTitle != 0 && item.checkTitle != null && item.checkTitle != "") {
          //     z += 1;
          //   }
          // });
          for(let item of that.exportList){
            item.companyList = [];
            item.companyList = companyList;
            if (item.checkTitle !== undefined && item.checkTitle !== 0 && item.checkTitle != null && item.checkTitle !== "") {
              z += 1;
            }
          }
        }
        if (z === 0) {
          that.$message({
            type: 'warning',
            message: '至少选择一项!'
          });
          return;
        }
        that.fullscreenLoadingNew = true;
        that.$api.post(that.$publicApi.EXPORT_DETAIL_LIST, that.exportList, res => {
          if (res.code === 200) {
            that.fullscreenLoadingNew = false;
            that.dialogVisibleNew = false;
            window.open(that.$publicApi.DOWNLOAD_URL + res.result);
            that.$message({
              type: 'success',
              message: '导出成功!'
            });
//            window.location.href = that.$publicApi.baseExcelView + res.result;
          } else {
            that.$message.error('导出失败');
            that.fullscreenLoadingNew = false;
          }
        });
      },
      /*导出公司列表*/

      /*打开弹出框 获取导出分类的tree列表 (弹出框中的)*/
      exportTitle(){
        let param = {};
        let that = this;
        if (that.exportTitleList[0].children.length === 0) {
          that.$api.post(that.$publicApi.GET_EXPORT_TITLE_LIST, param, res => {
            if (res.code === 200) {
              for(let item of res.result){
                item.label = item.name;
                for(let itemNew of item.children){
                  item.checkTitle = [];
                  itemNew.label = itemNew.name;
                  for(let itemLast of itemNew.children){
                    itemNew.checkTitle = [];
                    itemLast.label = itemLast.name;
                  }
                }
              }
              // $.each(res.result, function (index, item, array) {
              //   item.label = item.name;
              //   $.each(item.children, function (index, itemNew, array) {
              //     item.checkTitle = [];
              //     itemNew.label = itemNew.name;
              //     $.each(itemNew.children, function (index, itemLast, array) {
              //       itemNew.checkTitle = [];
              //       itemLast.label = itemLast.name;
              //     });
              //   });
              // });
              that.exportTitleList[0].children = res.result;
            }
          });
        }
        this.dialogVisibleNew = true;
      },
      /*获取调取数据分类 弹出框中的*/
      getExportClassification(flag){
        // debugger
        let param = {};
        let that = this;
        param.level = 0;
        if (that.exportClassificationList[0].children.length === 0) {
          that.$api.post(that.$publicApi.GET_EXPORT_CLASSIFICATION, param, res => {
            if (res.code = 200) {
              // $.each(res.result, function (index, item, array) {
              //   item.label = item.name;
              //   if (item.label === "企业信息") {
              //     item.disabled = true;
              //   }
              // });
              for(let item of res.result){
                item.label = item.name;
                if (item.label === "企业信息") {
                  item.disabled = true;
                }
              }
              that.exportClassificationList[0].children = res.result;
            }
          });
        }
        setTimeout(function () {
          that.$refs.tree.setCheckedKeys(["qichacha/getCompanyInfo"]);
        }, 50);
        if (flag === "other") {
          this.dialogVisibleOther = true;
        } else if (flag === "no") {

        } else {
          this.dialogVisible = true;
        }
      },
      /*调取数据确认按钮*/
      dataTransfer(flag){
        // debugger
        let that = this;
        let param = {};
//        let exportClassificationList = that.$refs.tree.getCheckedKeys();
        let exportClassificationListOld = [];
        if (flag === "failUrl") {
          exportClassificationListOld = that.nowFailUrl;
        } else {
          exportClassificationListOld = that.$refs.tree.getCheckedNodes();
        }
        let exportClassificationList = [];
        // $.each(exportClassificationListOld, function (index, item, array) {
        //   if (item.value != null && item.value !== undefined && item.value !== "") {
        //     exportClassificationList.push(item);
        //   }
        // });
        for(let item of exportClassificationListOld){
          if (item.value != null && item.value !== undefined && item.value !== "") {
            exportClassificationList.push(item);
          }
        }

        if (flag === "other") {
          param.tCompanyList = that.nowOtherList;
        } else if (flag === "failUrl") {
          param.tCompanyList = that.nowFailCompanyName;
        } else {
          param.tCompanyList = that.recordImportList;
        }
        param.urlList = exportClassificationList;
        param.userId = that.userId;
        param.type = 2;
        // let flag = "";
        if (exportClassificationList === undefined || exportClassificationList == null || exportClassificationList === "" || exportClassificationList.length === 0) {
          flag = "noExport";
        } else if (param.tCompanyList === undefined || param.tCompanyList == null || param.tCompanyList === "" || param.tCompanyList.length === 0) {
          flag = "noCompany"
        }
        if (flag === "noCompany") {
          that.$message({
            type: 'warning',
            message: '公司列表为空!'
          });
          return;
        } else if (flag === "noExport") {
          that.$message({
            type: 'warning',
            message: '请至少选择一项!'
          });
          return;
        }
        that.fullscreenLoading = true;

        that.$api.post(that.$publicApi.IMPORT_QICHACHA_INTERFACE_INFO, param, res => {
          if (res.code === 200) {
            that.fullscreenLoading = false;
            that.$message({
              type: 'success',
              message: '调取数据成功!'
            });
            that.getRecordImportList(that.nowLabelId);
            that.dialogVisible = false;
            that.dialogVisibleOther = false;
          }
        });
      },

      /*导入成功时调用该方法*/
      success(data){
        let that = this;
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '您将向 '),
            h('span', {style: 'color: rgb(222, 68, 69)'}, this.nowLabel),
            h('span', null, ' 标签导入公司列表,并且会'),
            h('span', {style: 'color: rgb(222, 68, 69)'}, ' 覆盖该标签中原公司列表 '),
            h('span', null, ',是否继续?'),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
            } else {
              done();
            }
          }
        }).then(() => {
          that.addRecordImport(data);
        }).catch(() => {
        });

      },
      /*导入成功并确认时 将公司列表插入数据库*/
      addRecordImport(data){
        let param = data.tCompanyList;
        let that = this;
        // $.each(param, function (index, item, array) {
        //   item.labelId = that.nowLabelId;
        //   item.userId = that.userId;
        //   item.deleteFlag = 1;
        //   item.createUser = that.userId;
        //   item.modifyUser = that.userId;
        //   item.type = 2;
        // });
        for(let item of param){
          item.labelId = that.nowLabelId;
          item.userId = that.userId;
          item.deleteFlag = 1;
          item.createUser = that.userId;
          item.modifyUser = that.userId;
          item.type = 2;
        }
        that.$api.post(that.$publicApi.ADD_RECORD_IMPORT, param, res => {
          that.getRecordLabelList("now");
        });
      },
      /*选择标签时获取当前标签和id*/
      handleClick(tab, event) {
        let that = this;
        that.nowLabel = tab.label;
        that.nowLabelId = tab.name;
        that.searchName = "";
        that.pageSize = 10;
        that.getRecordImportList(tab.name);
      },
      /*删除标签*/
      deleteLabel(param){
        let that = this;
        const h = this.$createElement;
        that.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '删除该标签将'),
            h('span', {style: 'color: rgb(222, 68, 69)'}, ' 移除该标签下所有公司列表 '),
            h('span', null, ',是否继续?'),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$message({
            type: 'success',
            message: '删除成功!'
          });
          that.$api.post(that.$publicApi.DELETE_RECORD_LABEL, param, res => {
            if(res.code === 200){
              that.getRecordLabelList();
            }
          });
        }).catch(() => {
        });
      },
      /*添加标签*/
      addLabel(value, param){
        let that = this;
        that.labelNameInput = value;
        param.labelName = value;
        param.type = 2;
        that.$api.post(that.$publicApi.ADD_RECORD_LABEL, param, res => {
          if (res.code === 202) {
            that.$message({
              type: 'warning',
              message: '标签名已存在!'
            });
          } else if (res.code === 200) {
            that.getRecordLabelList("add");
          }
        });
      },
      /*添加标签按钮*/
      inputLableName(param) {
        this.$prompt('请输入标签名称(确认后不可更改)', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          this.addLabel(value, param);
        }).catch(() => {
        });
      },
      /*获取标签列表*/
      getRecordLabelList(flag){
        let that = this;
        let param = {};
        let i = 0;
        param.userId = that.userId;
        param.type = 2;
        that.$api.post(that.$publicApi.GET_RECORD_LABEL_LIST, param, res => {
          if (res.code = 200) {
            that.editableTabs = res.result;
            if (flag === "add") {
              i = res.result.length - 1;
            } else if (flag === "now") {
              // $.each(res.result, function (index, item, array) {
              //   if (item.labelId === that.nowLabelId) {
              //     i = index;
              //   }
              // });
              res.result.forEach((item,index)=>{
                if (item.labelId === that.nowLabelId) {
                  i = index;
                }
              })
            }
            if (res.result.length > 0) {
              that.editableTabsValue = res.result[i].labelId;
              that.tabIndex = res.result[i].labelId;
              that.nowLabel = res.result[i].labelName;
              that.nowLabelId = res.result[i].labelId;
              that.getRecordImportList(that.tabIndex);
            } else {
              that.nowLabel = '';
              that.nowLabelId = '';
            }
          }
        });
      },
      /*获取该标签下的公司列表*/
      getRecordImportList(labelId){
        let param = {};
        let that = this;
        param.labelId = labelId;
        param.userId = that.userId;
        param.type = 2;
        param.companyName = that.searchName;
        param.pageSize = that.pageSize;
        that.$api.post(that.$publicApi.GET_RECORD_IMPORT_LIST, param, res => {
          if (res.code = 200) {
            let recordCompanyList = [];
            let recordStatusList = [];
            let recordReasonList = [];
            let recordDealRemarksList = [];
            for(let item of res.result.list){
              let flagCompany = 0;
              let flagStatus = 0;
              let flagReason = 0;
              let flagDealRemarks = 0;
              let company = {};
              let recordStatus = {};
              let recordReason = {};
              let dealRemarks = {};
              if (item.isSuccess === "1") {
                recordStatus.text = "成功";
              } else if (item.isSuccess === "2") {
                recordStatus.text = "失败";
              } else if (item.isSuccess === "0") {
                recordStatus.text = "";
              }
              recordStatus.value = item.isSuccess;
              recordStatus.isSuccess = item.isSuccess;
              recordReason.text = item.remarks;
              recordReason.value = item.remarks;

              dealRemarks.text = item.dealRemarks;
              dealRemarks.value = item.dealRemarks;

              company.text = item.companyName;
              company.value = item.companyName;
              for(let itemNew of recordCompanyList){
                if (itemNew.text === item.companyName) {
                  flagCompany += 1;
                }
              }
              for(let itemNew of recordStatusList){
                if (itemNew.isSuccess === item.isSuccess) {
                  flagStatus += 1;
                }
              }
              for(let itemNew of recordReasonList){
                if (itemNew.text === item.remarks) {
                  flagReason += 1;
                }
              }
              for(let itemNew of recordDealRemarksList){
                if (itemNew.text === item.dealRemarks) {
                  flagDealRemarks += 1;
                }
              }
              if (flagStatus === 0) {
                recordStatusList.push(recordStatus);
              }
              if (flagReason === 0) {
                recordReasonList.push(recordReason);
              }
              if (flagDealRemarks === 0) {
                recordDealRemarksList.push(dealRemarks);
              }
              if (flagCompany === 0) {
                recordCompanyList.push(company);
              }
            }
            // $.each(res.result.list, function (index, item, array) {
            //   let flagCompany = 0;
            //   let flagStatus = 0;
            //   let flagReason = 0;
            //   let flagDealRemarks = 0;
            //
            //   let company = {};
            //   let recordStatus = {};
            //   let recordReason = {};
            //   let dealRemarks = {};
            //   if (item.isSuccess == "1") {
            //     recordStatus.text = "成功";
            //   } else if (item.isSuccess == "2") {
            //     recordStatus.text = "失败";
            //   } else if (item.isSuccess == "0") {
            //     recordStatus.text = "";
            //   }
            //   recordStatus.value = item.isSuccess;
            //   recordStatus.isSuccess = item.isSuccess;
            //   recordReason.text = item.remarks;
            //   recordReason.value = item.remarks;
            //
            //   dealRemarks.text = item.dealRemarks;
            //   dealRemarks.value = item.dealRemarks;
            //
            //   company.text = item.companyName;
            //   company.value = item.companyName;
            //
            //
            //   $.each(recordCompanyList, function (index, itemNew, array) {
            //     if (itemNew.text == item.companyName) {
            //       flagCompany += 1;
            //     }
            //   });
            //   $.each(recordStatusList, function (index, itemNew, array) {
            //     if (itemNew.isSuccess == item.isSuccess) {
            //       flagStatus += 1;
            //     }
            //   });
            //   $.each(recordReasonList, function (index, itemNew, array) {
            //     if (itemNew.text == item.remarks) {
            //       flagReason += 1;
            //     }
            //   });
            //   $.each(recordDealRemarksList, function (index, itemNew, array) {
            //     if (itemNew.text == item.dealRemarks) {
            //       flagDealRemarks += 1;
            //     }
            //   });
            //
            //   if (flagStatus == 0) {
            //     recordStatusList.push(recordStatus);
            //   }
            //   if (flagReason == 0) {
            //     recordReasonList.push(recordReason);
            //   }
            //   if (flagDealRemarks == 0) {
            //     recordDealRemarksList.push(dealRemarks);
            //   }
            //   if (flagCompany == 0) {
            //     recordCompanyList.push(company);
            //   }
            // });
            that.recordFilter.recordCompanyList = recordCompanyList;
            that.recordFilter.recordStatusList = recordStatusList;
            that.recordFilter.recordReasonList = recordReasonList;
            that.recordFilter.recordDealRemarksList = recordDealRemarksList;
            that.recordImportList = res.result.list;
            that.nowAllCount = res.result.count;
          }
        });
        // that.$api.post(that.$publicApi.GET_RECORD_IMPORT_LIST, param, res => {
        //   // debugger
        //   if (res.code = 200) {
        //
        //     let recordCompanyList = [];
        //     let recordStatusList = [];
        //     let recordReasonList = [];
        //     let recordDealRemarksList = [];
        //
        //     $.each(res.result.list, function (index, item, array) {
        //       let flagCompany = 0;
        //       let flagStatus = 0;
        //       let flagReason = 0;
        //       let flagDealRemarks = 0;
        //
        //       let company = {};
        //       let recordStatus = {};
        //       let recordReason = {};
        //       let dealRemarks = {};
        //       if (item.isSuccess == "1") {
        //         recordStatus.text = "成功";
        //       } else if (item.isSuccess == "2") {
        //         recordStatus.text = "失败";
        //       } else if (item.isSuccess == "0") {
        //         recordStatus.text = "";
        //       }
        //       recordStatus.value = item.isSuccess;
        //       recordStatus.isSuccess = item.isSuccess;
        //       recordReason.text = item.remarks;
        //       recordReason.value = item.remarks;
        //
        //       dealRemarks.text = item.dealRemarks;
        //       dealRemarks.value = item.dealRemarks;
        //
        //       company.text = item.companyName;
        //       company.value = item.companyName;
        //
        //
        //       $.each(recordCompanyList, function (index, itemNew, array) {
        //         if (itemNew.text == item.companyName) {
        //           flagCompany += 1;
        //         }
        //       });
        //       $.each(recordStatusList, function (index, itemNew, array) {
        //         if (itemNew.isSuccess == item.isSuccess) {
        //           flagStatus += 1;
        //         }
        //       });
        //       $.each(recordReasonList, function (index, itemNew, array) {
        //         if (itemNew.text == item.remarks) {
        //           flagReason += 1;
        //         }
        //       });
        //       $.each(recordDealRemarksList, function (index, itemNew, array) {
        //         if (itemNew.text == item.dealRemarks) {
        //           flagDealRemarks += 1;
        //         }
        //       });
        //
        //       if (flagStatus == 0) {
        //         recordStatusList.push(recordStatus);
        //       }
        //       if (flagReason == 0) {
        //         recordReasonList.push(recordReason);
        //       }
        //       if (flagDealRemarks == 0) {
        //         recordDealRemarksList.push(dealRemarks);
        //       }
        //       if (flagCompany == 0) {
        //         recordCompanyList.push(company);
        //       }
        //     });
        //     that.recordFilter.recordCompanyList = recordCompanyList;
        //     that.recordFilter.recordStatusList = recordStatusList;
        //     that.recordFilter.recordReasonList = recordReasonList;
        //     that.recordFilter.recordDealRemarksList = recordDealRemarksList;
        //     that.recordImportList = res.result.list;
        //     that.nowAllCount = res.result.count;
        //   }
        // });
      },
      /*标签添加或删除时调用*/
      handleTabsEdit(targetName, action) {
        let param = {};
        let that = this;
        param.userId = that.userId;
        param.deleteFlag = 1;
        param.createUser = that.userId;
        param.modifyUser = that.userId;
        if (action === 'add') {
          that.inputLableName(param);
        }
        if (action === 'remove') {
          param.labelId = targetName;
          that.deleteLabel(param);
        }
      }
    }
  }
</script>
<style>
  .el-tabs__header > span {
    background: #409EFF;
  }

  .el-icon-plus {
    color: white;
  }

  .el-icon-arrow-down {
    font-weight: bold !important;
    font-size: 16px !important;
  }
</style>
<style scoped>
  .agencyTypeClass {
    box-sizing: border-box;
    text-align: right !important;
  }

  .el-icon-download:before {
    font-weight: bold !important;
  }

  .el-radio {
    margin-left: 25px !important;
    margin-bottom: 20px !important;
  }

  .dataMain-comPad {
    min-height: 300px;
    padding: 10px;
  }

  .data-main-title {
    color: rgb(64, 158, 255);
    font-size: 14px;
    font-weight: bold;
  }

  .el-button--primary {
    float: right !important;
  }
</style>

