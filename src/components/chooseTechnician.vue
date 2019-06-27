<!--
 * @DateTime:    2019
 * @Description: 技师信息
 -->

 <template>
  <div v-show='isShow'>
    <div v-transfer-dom>
        <x-dialog v-model="isShow" class="chooseTechnician" :hide-on-blur='true' @on-hide='close'>
          <div class="img-box">
            <div class="dialog-title" v-if='operObj && operObj.label'>
              {{operObj.label}}
            </div>
            <div class="dialog-main">
              <group>
                <x-switch title="是否派钟" v-model="value1"></x-switch>
              </group>
              <!-- 是 -->
              <group v-if='value1'>
                <x-number title="女技师" v-model="female" :min="0" :max="10"></x-number>
                <x-number title="男技师" v-model="male" :min="0" :max="10"></x-number>
                <x-number title="随机" v-model="numberValue" :min="0" :max="10"></x-number>
              </group>
              <!-- 否 -->
              <group v-else>

                  <!-- 如果是小项目 -->
                  <div class="clearfix" v-if='operObj.type == 3'>
                    <x-number title="数量" v-model="male" :min="0" :max="10"></x-number>
                    <div class="chooseTec_input">
                      <div class="input_main">
                        <input type="text" placeholder="请输入技师编号">
                        <a>选择</a>
                      </div>
                    </div>
                  </div>
                  <!-- 其它 -->
                  <div class="clearfix" v-else>
                    <checklist 
                            label-position="left" 
                            :options="commonList" 
                            v-model="radioValue" 
                            :max="1" 
                            @on-change="change"></checklist>
                    <div class="chooseTec_input">
                      <div class="input_main">
                        <input type="text" placeholder="请输入技师编号">
                        <a>选择</a>
                      </div>
                    </div>
                  </div>

              </group>              
            </div>
            <div class="bottom-oper">
                <x-button mini type="primary" @click.native='placeOrder'>确认下单</x-button>
            </div>
          </div>
          <div @click="isShow=false">
            <span class="vux-close"></span>
          </div>
        </x-dialog>
      </div>
  </div>
</template>

<script>
export default {
  props: ['operObj'],
  data() {
    return {
      isShow: true,
      // 是否派钟
      value1: true,
      numberValue: 1,
      female: 0,
      male: 0,

      commonList:  [ '点钟', '选钟' ],

      radioValue: ['点钟'],

    }
  },
  mounted(){
    console.log(this.operObj)
  },

  methods: {
    // 下单
    placeOrder(){
      // 请求后台数据

      let data = {
        label: this.operObj.label,
        money: this.operObj.value,
        female: this.female,
        male: this.male,
        numberValue: this.numberValue,
        timer: '100分钟'
      }
      this.isShow = false
      this.$emit('dialogClose', data)
    },

    change (val, label) {
      console.log('change', val, label)
    },
    close(){
      this.isShow = false
      this.$emit('dialogClose')
    }

  },
  components: {

  }
}

</script>