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
      <x-number title="人数" align="left" v-model="numberValue" button-style="round" :min="1" :max="100"></x-number>
      <!-- <inline-x-number width="50px" title="人数" align="left" v-model="numberValue" button-style="round" :min="1" :max="100"></inline-x-number> -->
      <x-textarea title="备注信息" placeholder="请详细描述你的问题" :show-counter="false" :rows="3"></x-textarea>
    </group>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        username: '',
        numberValue: 1,
        timer: '',
      }
    },
    mounted(){
    },
    methods: {
  
    },
    components:{
    }
  }
</script>
