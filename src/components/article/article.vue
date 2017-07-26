<template>
  <div class="agency-centerOut1" >
      <div class="agency-fora"  v-for="(list,index) in lists" >
        <ul class="agency-externalInformation">
          <li>
            <div>
              <img class="agency-companyImg" :src=list.image>
            </div>
          </li>
          <li>
            <div>
              <span :title="message" @click="companyClick">{{list.companyName}}</span>
            </div>
          </li>
        </ul>
        <ul  class="agency-detailedInformation">
          <li>
            <span>联系人 : </span>
            <span>{{ list.name }}</span>
          </li>
          <li >
            <span>电话 : </span>
            <span>{{ list.tel === ''?'-':list.tel}} </span>
          </li>
          <li >
            <span>邮箱 : </span>
            <span>{{ list.mail }}</span>
          </li>
        </ul>
        <ul class="agency-contentInformationCenter"  >
          <li >
            <a  href="">专利</a>
          </li>

          <ul class="agency-contentInformationTopOl">
            <li >
              <span >2017</span>
            </li>
            <li >
              <span >13/14</span>
            </li>
            <li>
              <span >13/14</span>
            </li>
            <li >
              <span >11/23</span>
            </li>
            <li>
              <span >13/44</span>
            </li>
          </ul>
        </ul>
        <ul class="agency-operatiocContent">
          <li><a>查看</a></li>
          <li><a>修改</a></li>
          <li><a>删除</a></li>
        </ul>
        <div class="clear"></div>
      </div>
    </div>

</template>
<script>
  export default {
    data () {
      return {
        message:'江苏永鼎股份有限公司',
        lists:[
          {
            companyName:'江苏永鼎股份有限公司',
            name:'莫林弟',
            mail:'dab@yongding.com.cn',
            tel:'18906251096',
            image:'http://co-image.qichacha.com/CompanyImage/default.jpg',
            isShow:true
          },
          {
            companyName:'北京京东叁佰陆拾度电子商务有限公司',
            name:'刘强东',
            mail:'yuntong@jd.com',
            tel:'010-89128888',
            image:'http://co-image.qichacha.com/CompanyImage/c0fa0f946164132bad214a7ce62ac608.jpg',
            isShow:false
          },
          {
            companyName:'华为技术有限公司',
            name:'孙亚芳',
            mail:'liulinjun@huawei.com',
            tel:'',
            image:'http://co-image.qichacha.com/CompanyImage/6b242b475738f45a4dd180564d029aa9.jpg',
            isShow:true
          },
        ]
      }
    },
    methods:{
      companyClick:function () {
//          alert();
      }
    }
  }
</script>

<style scoped>
  @import "../../../css/public.css";
  .agency-centerOut1{
    width: 1280px;
    margin: 0 auto;
  }
  .agency-centerHead ul li {
    font-weight: bold;
    font-size: 15px;
    /*width: 80px;*/
    position: relative;
    line-height: 28px;
  }
  .agency-centerHead ul li:last-child{
    float: right;
    margin-right: 60px;
  }
  .agency-centerHead ul li a {
    font-weight: bold;
    font-size: 15px;
    text-align: center;
    padding-left: 20px;
  }

  .agency-centerHead ul li a:visited {
    color: #000000;

  }
  .agency-fora{
    border-bottom: 1px solid #e9eeef;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .agency-externalInformation {
    float: left;
    width: 20%;
  }
  .agency-externalInformation li{
    width: 92%;
    float: none;
    padding-top: 15px;
  }
  .agency-externalInformation li div{
    text-align: center;
  }
  .agency-externalInformation li img{
    /*margin-left: 40px;*/
    width: 78px;
    height: 78px;
  }
  .agency-externalInformation span{
    color:#555555;
    cursor: pointer;
    text-align: center;
  }
  .agency-detailedInformation {
    float: left;
    width: 30%;
  }

  .agency-detailedInformation li {
    padding-top: 20px;
    float: none;
  }

  .agency-detailedInformation span:first-child {
    color: #6a6a6a;
    float: left;
  }

  .agency-detailedInformation span {
    color: #6a6a6a;
    display: block;
    padding-right: 10px;
  }
  .agency-contentInformationCenter {
    float: left;
    width: 35%
  }
  .agency-contentInformationCenter li{
    padding-left: 30px;
  }
  .agency-contentInformationCenter li a {
    color: #ff902e;
  }
  .agency-contentInformationTopOl li span{
    font-size:14px;
  }
  .clear {
    clear: both;
    height: 0px;
  }
  .agency-contentInformationTopOl li{
    padding-left: 22px;
    padding-top:5px;
    color: #a09f9f;
    font-size: 14px;
    width: 60px;
    float: left;
  }
  .agency-operatiocContent {
    float: left;
    width: 15%
  }
  .agency-operatiocContent li{
    margin-top: 16px;
    float: left;
    width: 100%;
    text-align: center;
    font-size: 14px;
  }
  .agency-operatiocContent li a{
    font-size: 13px;
    border: 2px solid #d1d1d1;
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 5px;
    cursor: pointer;
  }
</style>
