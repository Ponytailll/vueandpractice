<template>
  <footer id="footer">
    <div id="cut">
      <i class="iconfont" id="iconfont" @click="transform" style="transform: translate3d(0%, 0px, 0px)"></i>
    </div>
    <section id="superise">
      <p>恭喜你，发现了我的秘密。在此输入你的邮箱和名字，即可订阅我。</p>
      <form>
        <input type="text" placeholder="你的昵称"><br>
        <input type="text" placeholder="你的邮箱"> <br>
        <button>订阅</button>
      </form>
    </section>
  </footer>
</template>
<script>
  export default{
      data(){
          return{}
      },
    methods:{


      }
  }
</script>
<style scoped>
  #footer {
    position: relative;
    height: 160px;
    border-top: 1px solid #eee;
    color: hsla(0, 0%, 100%, .69);
    font-size: 12px;
    text-align: center;
    border-top: 2px dashed #98b7ff;
    transition: height .1s 1s;
  }
  #cut{
    position: absolute;
    width: 100%;
    top: -20px;
    left: 0;
    transition: all 1.5s ease-out;
    z-index: 3;
    text-align: left;
  }
  #cut i{
    color: #f96868;
    font-size: 26px;
    transform: rotate(90deg);
    cursor: e-resize;
    display: inline-block;
  }
  .iconfont{
    font-family: iconfont;
    font-size: 18px;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    font-style: normal;
  }
  #superise {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #06060b;
    color: hsla(0,0%,100%,.86);
    text-align: center;
    overflow: hidden;
    z-index: 1;
  }
  #superise form {
    transition: 1.5s ease 2.5s;
    opacity: 0;
  }
  #superise input {
    display: inline-block;
    margin: 0 0 20px;
    width: 280px;
    height: 25px;
    padding: 10px 15px;
    background: rgba(21,24,68,.5);
    color: #fff;
    border: 1px solid rgba(34,43,95,.79);
    border-radius: 50px;
    transition: .5s ease;
  }
</style>
