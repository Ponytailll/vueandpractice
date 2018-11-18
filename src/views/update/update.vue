<template>
  <div style="margin: 30px;">
    <div style="margin-bottom: 20px;">
      <el-button type="primary" @click="updateCompany('3')">商业银行</el-button>
      <!--<span class="update-time">最近更新时间</span>-->
      <!--<span class="update-time"></span>-->
    </div>
    <div style="margin-bottom: 20px;">
      <el-button type="primary" @click="updateCompany('1')">普通企业</el-button>
    </div>
    <div style="margin-bottom: 20px;">
      <el-button type="primary" @click="updateCompany('6')">担保公司</el-button>
    </div>
    <div style="margin-bottom: 20px;">
      <el-button type="primary" @click="updateCompany('5')">评估公司</el-button>
    </div>
    <div style="margin-bottom: 20px;">
      <el-button type="primary" @click="updateCompany('9')">小贷公司</el-button>
    </div>
    <div style="margin-bottom: 20px;">
      <el-button type="primary" @click="updateCompany('8')">基金管理人</el-button>
    </div>
    <div style="margin-bottom: 20px;">
      <el-button type="primary" @click="updateCompany('2')">专利代理</el-button>
    </div>
    <div style="margin-bottom: 20px;">
      <el-button type="primary" @click="updateCompany('10')" >保险机构</el-button>
    </div>
    <div style="margin-bottom: 20px;">
      <el-button type="primary" @click="updateCompany('11')" >商标代理</el-button>
    </div>

    <div style="margin-bottom: 20px;">
      <el-button type="primary" @click="updateCompany" :disabled="true">高校机构</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "update",
    mounted: {},
    methods: {
      //更新企业
      updateCompany(agencyType) {
        let that = this;
        that.$confirm('确认更新？').then( _=>{
          if (agencyType !== null) {
            this.$api.post(this.$publicApi.UPDATE_COMPANY_BY_AGENCY_TYPE, {agencyType: agencyType}, r => {
              if (r.code === 200) {
                this.$message.success("更新成功！")
              }
            })
          } else {
            this.$message.error("按钮暂不可用！")
          }
        })
          .catch( _=>{

          })
      }
    }
  }
</script>

<style scoped>
  .update-time {
    font-size: 14px;
    color: #a9a9a9;
    line-height: 40px;
  }
</style>
