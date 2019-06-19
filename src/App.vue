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
  created() {

  },
  mounted(){

  },
}
</script>

