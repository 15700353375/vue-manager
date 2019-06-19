<!--
 * @DateTime:    2018-12-25
 * @Description: 底部菜单栏
 -->

 <template>
    <div class="bottomBar">
      <div class='bottom-tabs-item'
          :class='{"active": currentType == item.url}'
          v-for="(item,index) in list"
          :key='index'
          @click="goPage(item.url)">
        <i class="iconfont" :class="item.icon"></i>
        <div class='bottom-tabs-item-text'>{{item.name}}</div>
      </div>
    </div>
  </template>
  
  <style lang="less" scoped>

  </style>
  
  
  
  <script>
    //加载相关依赖
    import { mapState } from 'vuex';
  
    export default {
      props: ['navData'],
      data() {
        return {
          currentType: '',
          list: [
            {
              icon: 'icon-shouye',
              name: '房间',
              url: 'room',
              id: 1
            },
            {
              icon: 'icon-huiyuan2',
              name: '技师',
              url: 'technician',
              id: 2
            },
            {
              icon: 'icon-gongneng',
              name: '菜单',
              url: 'menu',
              id: 3
            },
            {
              icon: 'icon-tubiaolunkuo-',
              name: '我的',
              url: 'mine',
              id: 4
            }
          ]
        }
      },
      mounted(){
        // 获取当前路由
        console.log(this.$route.name)
        this.currentType = this.$route.name;
      },
      computed: mapState({
        // 名字
        username: state => state.login.userInfo.username,
  
      }),
      methods: {
        goPage(url){
          this.currentType = url;
          this.$router.push({name: url})
        }
  
      },
      components: {
  
      }
    }
  
  </script>  