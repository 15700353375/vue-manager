<!--
 * @DateTime:    2019
 * @Description: 开房
 -->
 <template>
  <div class="clearfix get-room-container"  ref='wrapper'>
    <group  label-width="7em" label-margin-right="1em" label-align="justify">
      <x-input title="包厢名称:" v-model="params.username"></x-input>
      <!-- <datetime title="开台时间:" v-model="timer" format="YYYY-MM-DD HH:mm" value-text-align="left"></datetime> -->
      <datetime v-model="params.startTime" format="YYYY-MM-DD HH:mm" :minute-list="['00', '15', '30', '45']" title="开台时间:"></datetime>
      <datetime v-if='roomType == 1' v-model="params.endTime" format="YYYY-MM-DD HH:mm" :minute-list="['00', '15', '30', '45']" title="预计结束时间:"></datetime>
      <x-number title="人数:"  v-model="params.numberValue" :min="1" :max="100"></x-number>    
      <cell v-if='roomType == 1' title="计费类型" class="cost_select">
        <div class="cost_select_main">
          <v-select v-model="params.select1" :options="selectArray" :searchable="false"></v-select>
        </div>
      </cell>
    </group>

    <group v-if='roomType == 2' label-width="5em" label-margin-right="1em" label-align="justify">
      <div class="addNumber">
        <x-input title="添加手牌:" v-model="params.number"></x-input>
        <button @click='add'>添加</button>
      </div>
    </group>

    <group title="备注信息">
      <x-textarea :max="200" v-model='params.desc' name="detail" placeholder="请详细描述你的问题" :show-counter="false"></x-textarea>
    </group>

    <div class='oper'>
        <x-button type="primary" @click.native='open'>确认开房</x-button>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        params: {
          username: '',
          numberValue: 1,
          startTime: '',
          endTime: '',
          number: '',
          select1: '计时',
          desc: ''
        },

        // 计费类型
        selectArray:[
          {
            value: 1,
            label: "计时"
          },
          {
            value: 2,
            label: "包段"
          }
        ],

        roomType: 1, //1为棋牌 2为其它
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
