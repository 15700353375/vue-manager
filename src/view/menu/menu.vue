<!--
 * @DateTime:    2018-12-25
 * @Description: 报表决策
 -->
<template>
  <div class="clearfix report-container">
    <div class="report-main">

      <div class='report-block clearfix'>
        <div class="statistical-title marginT-20">
          <span class='text-title'>基础功能</span>
        </div>
        <div class='report-content clearfix'>
          <div class='report-item'>
            <div class='report-item-icon bg-success'><span class='iconfont icon-chongzhi'></span></div>
            <div class='report-item-text'>预约管理</div>
          </div>
          <div class='report-item'>
            <div class='report-item-icon bg-info'><span class='iconfont icon-tongji1'></span></div>
            <div class='report-item-text'>贵宾等待</div>
          </div>
          <div class='report-item' @click='goMemberInfo'>
            <div class='report-item-icon bg-warning'><span class='iconfont icon-huiyuan'></span></div>
            <div class='report-item-text'>会员信息</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .report-container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }



</style>

<script>
  export default {
    data(){
      return{

      }
    },
    mounted(){

      // window.app.Toast.text('请求发生重定向，请联系工作人员');

    },
    methods: {
      goMemberInfo(){
        this.$router.push({name: 'memberInfo'})
      }
    },
    components:{
    }
  }
</script>
