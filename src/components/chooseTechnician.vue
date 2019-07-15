<!--
 * @DateTime:    2019
 * @Description: 技师信息
 -->

 <template>
  <div v-show='isShow'>
    <div v-transfer-dom>
        <x-dialog v-model="isShow" class="chooseTechnician" :hide-on-blur='true && !isShowSelectTech' @on-hide='close'>
          <div class="img-box">
            <div class="dialog-title" v-if='operObj && operObj.label'>
              {{operObj.label}}
            </div>
            <!-- 小项目 -->
            <div class="dialog-main"  v-if='operObj.type == 3'>
              <group>
                <div class="clearfix">
                    <x-number title="数量" v-model="male" :min="0" :max="10"></x-number>
                    <div class="chooseTec_input">
                      <div class="input_main">
                        <input type="text" placeholder="请输入技师编号" v-model="selectedTechNumber">
                        <a @click="isShowSelectTech=true">选择</a>
                      </div>
                    </div>
                  </div>
              </group>
            </div>
            <div class="dialog-main" v-else>
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
                  <div class="clearfix">
                    <checklist 
                            label-position="left" 
                            :options="commonList" 
                            v-model="radioValue" 
                            :max="1" 
                            @on-change="change"></checklist>
                    <div class="chooseTec_input">
                      <div class="input_main">
                        <input type="text" v-model="selectedTechNumber" placeholder="请输入技师编号">
                        <a @click="isShowSelectTech=true">选择</a>
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
      <div v-show="isShowSelectTech" >
        <div v-transfer-dom class="showSelectTechContainer">
          <popup v-model="isShowSelectTech" :popup-style="showSelectTechStyle" :hide-on-blur="true" :show-mask="false">
              <popup-header left-text="取消" right-text="确定" title="请选择技师" @on-click-left="cancelSelectTech" @on-click-right="selectTech">
              </popup-header>
              <scroller lock-x scrollbar-y height="100px" ref="scroller">
                <div>
                  <group gutter="0"  >
                  <checklist v-model="selectedTechList" :options="techList" label-position="left"></checklist>
                  </group>
                </div>
              </scroller>
            
             
          </popup>
        </div>
      </div>
      
  </div>
</template>

<style lang="scss">
</style>

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

      selectedTechNumber:"",

      isShowSelectTech: false,

      techList:[{key:'001',value:'1'},{key:'002',value:'2'},{key:'003',value:'3'}],

      selectedTechList:[],

      showSelectTechStyle:{'z-index':8000}

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
    },

    cancelSelectTech(){
      this.isShowSelectTech = false
    },
    selectTech(){
      console.debug(this.selectedTechList)
      let numberStr=''
      for(let item of this.selectedTechList){
        numberStr+=item+','
      }
      if(this.selectedTechList.length>0){
        numberStr=numberStr.substring(0,numberStr.length-1)
      }
      this.selectedTechNumber=numberStr
      this.isShowSelectTech = false

    }

  },
  components: {

  }
}

</script>