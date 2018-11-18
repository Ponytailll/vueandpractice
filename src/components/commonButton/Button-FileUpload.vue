<template>
  <span class="btn-fileupload" style="float:right;">
      <form id='videoForm'>
        <input type="file" name="" @change="fileChange()" ref="fileUpload" id="fileUpload" style="display:none;">
      </form>
      <el-button :disabled="btnDisFlag" class="buttom-common-last" type="primary" size="mini" @click="btnClick" v-show="flag=='import'">批量导入公司<i class="el-icon-upload el-icon--right"></i></el-button>
  </span>
</template>

<script>
  export default {
    data() {
      return {
        user: {},
        credential: {
          credentialsName: '',
          credentialsUrl: '',
          credentialsType: '',
          fileList: [],
          type: 'credential',
          user: '',
        },
      }
    },
    mounted() {

    },
    props: ["flag","btnDisFlag"],//type=>credential
    watch: {},
    computed: {},
    methods: {
      btnClick(){
      	var that = this;
        document.getElementById('videoForm').reset();
        that.$refs.fileUpload.click();
      },

      fileChange() {
        let this_ = this;
        let userCode = this_.userCode;
        let createUser = this_.createUser;
        let file = this_.$refs.fileUpload.files[0];
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
          alert("文件大小超过限制");
          return false;
        }
        let param = new FormData();  // 创建form对象
        param.append('file', file, file.name); // 通过append向form对象添加数据
        // param.append('userCode', userCode);
        // param.append('createUser', createUser);
        if (!/(xlsx|xls)$/.test(file.name)) {
          alert("请上传excel类型文件");
          return false;
        }
        this_.$api.post(this_.$publicApi.UPLOAD_EXCEL, param,res => {
          if (res.code == 200) {
            this_.$emit('success', res.result);
          }else {
            this_.$emit('fail', res);
            alert("上传失败");
          }
        });
      },
    }
  }
</script>

<style scoped>
  .buttom-common{
    margin-right: 10px;
  }
  .buttom-common-last{
    margin-right: 0px;
  }
  .newVersion-searchBtn {
    background: #00adef;
  }
  .newVersion-searchBtn img {
    width: 20px;
    margin-top: -3px;
  }

  .newVersion-searchBtn a {
    font-size: 14px;
    color: white;
  }
  .buttonStyle {
    position: relative;
    background: white;
    color: #00adef;
    border: 1px solid #dbdbdb;
    height: 30px;
    padding: 5px 12px;
    line-height: 20px;
    font-size: 13px;
    border-radius: 4px;
    margin: 0 2px;
  }
  .buttonStyle img {
    width: 20px;
    height: 20px;
    margin-top: -4px;
  }
</style>
