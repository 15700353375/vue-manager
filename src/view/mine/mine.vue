<!--
 * @DateTime:    2019
 * @Description: 我的
 -->
<template>
  <div class="clearfix container">

    <div class="report-main">
        <div class='personal-container'>
          <div class='personal-info'>
            <div class='personal-img-box'>
              <img v-if="userInfo && userInfo.avatarUrl" :src="userInfo.avatarUrl" alt="">
            </div>
            <div class='personal-content'>
              <div v-if="userInfo && userInfo.nickName" class='personal-name'>{{userInfo.nickName}}</div>
              <!-- <div class='personal-desc'>您的付费体验还剩下 <span>0</span> 天</div> -->
              <div class='personal-type'>管理者</div>
              <!-- <div class='personal-btn' type="default">续费</div> -->
            </div>
          </div>

          <div class='funciton-content'>
            <div class='function-item'>
              最大免单
              <span class='right-vision'>0元</span>
            </div>
            <div class='function-item'>
              最低折扣
              <span class='right-vision'>100%</span>
            </div>
          </div>
          <div class='funciton-content'>
            <!-- <div class='function-item'>
              有效期至
              <span class='right-vision'>2019.12.12</span>
            </div> -->
            <div class='function-item'>
              有效期至
              <span class='right-vision'>2019-12-30</span>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>


<script>
  import comUtil from '@Util/comUtil';
  export default {
    data(){
      return{
        userInfo: null,

      }
    },
    created(){
      
    },
    mounted(){
      let userInfo = localStorage.getItem('userInfo')
      this.userInfo = JSON.parse(userInfo)
    },
    methods: {

    },
    components:{
    }
  }
</script>
