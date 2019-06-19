<!--
 * @DateTime:    2019
 * @Description: 路由跳转
 -->
 <template>
  <div class="app_main">
    <div class="app_content">
      <router-view></router-view>      
    </div>
    <bottomBar v-if='$route.meta.type === 1' />
  </div>
</template>

<script>
import bottomBar from '@Components/bottomBar'
export default{
  components:{
    bottomBar,
  },
  mounted(){
    console.log(this.$route)
  // window.app.Toast.text('请求发生重定向，请联系工作人员');

  },
}
</script>

