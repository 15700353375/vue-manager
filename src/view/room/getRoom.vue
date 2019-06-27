<!--
 * @DateTime:    2019
 * @Description: 开房
 -->
 <template>
  <div class="clearfix get-room-container"  ref='wrapper'>
    <group  label-width="5.5em" label-margin-right="2em" label-align="justify">
      <x-input title="包厢名称" v-model="username"></x-input>
      <datetime title="开台时间" v-model="timer" format="YYYY-MM-DD HH:mm" value-text-align="left"></datetime>
      <!-- <datetime v-model="hourListValue" format="YYYY-MM-DD HH:mm" :hour-list="['09', '10', '11', '12', '13', '14', '15', '16']" :minute-list="['00', '15', '30', '45']" @on-change="change" :title="$t('Birthday')"></datetime> -->
      <x-number title="人数" align="left" v-model="numberValue" :min="1" :max="100"></x-number>
      <group class="addNumber">
        <x-input title="添加手牌" v-model="number">        
        </x-input>
        <button>添加</button>
      </group>
      <!-- <inline-x-number width="50px" title="人数" align="left" v-model="numberValue" button-style="round" :min="1" :max="100"></inline-x-number> -->
      <x-textarea title="备注信息" placeholder="请详细描述你的问题" :show-counter="false" :rows="3"></x-textarea>
    </group>

    <x-button class='oper' type="primary" @click.native='open'>确认开房</x-button>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        username: '',
        numberValue: 1,
        timer: '',
        number: ''
      }
    },
    mounted(){
      // 从房间页面传递过来的id
      let roomId = this.$route.query.id
      console.log(this.$route.query.id)
    },
    methods: {
      open(){
        if(!this.username){
          this.bottomToast('请输入包厢名称')
          return
        }
        this.$router.push({name: 'room'})
      }
    },
    components:{
    }
  }
</script>
