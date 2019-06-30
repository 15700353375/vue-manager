<!--
 * @DateTime:    2019
 * @Description: 开房
 -->
 <template>
  <div class="clearfix get-room-container"  ref='wrapper'>
    <group  label-width="7em" label-margin-right="1em" label-align="justify">
      <x-input title="包厢名称:" v-model="params.username"></x-input>
    </group>

    <group title="备注信息">
      <x-textarea :max="200" v-model='params.desc' name="detail" placeholder="请详细描述你的问题" :show-counter="false"></x-textarea>
    </group>

    <div class='oper'>
        <x-button type="primary" @click.native='open'>确认修改</x-button>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        params: {
          username: '房间001',
          desc: '打扫干净了'
        },
      }
    },
    mounted(){
      // 从房间页面传递过来的id
      let roomId = this.$route.query.id
      console.log(this.$route.query.id)
    },
    methods: {
      // 添加手牌
      add(){

      },

      // 确认提交
      open(){
        if(!this.params.username){
          this.bottomToast('请输入包厢名称')
          return
        }
        console.log(this.params)
        this.$router.push({name: 'room'})
      }
    },
    components:{
    }
  }
</script>
