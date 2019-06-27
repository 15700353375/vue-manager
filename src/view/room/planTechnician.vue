<!--
 * @DateTime:    2019
 * @Description: 安排技师
 -->
 <template>
  <div class="clearfix plan-technician-container"  ref='wrapper'>
    <div class="plan-main">
      <div class="plan-left">
        <div class="plan-type-item" 
            v-for='(item,index) in technicianType' 
            :key='index' 
            @click='chooseType(item)'
            :class='{"active": currentType == item.value}'>
          {{item.label}}
        </div>
      </div>

      <div class="plan-right">
        <div class="plan-list-item" 
            v-for='(item,index) in list' 
            :key='index'
            :class='{"active": currentType == item.value}'>
          <div class="item-name">{{item.label}}</div>
          <div class="item-bottom clearfix">
            <span class="item-price">￥{{item.value}}</span>
            <x-button class="item-botton" mini type="primary" @click.native='chooseTechnician(item)'>选择技师</x-button>
          </div>
        </div>
        <div class="noMoreData">没有更多了~</div>
      </div>
    </div>
    <div class="plan-bottom" @click='seeAll'>
      已点服务<span v-if='chooseList.length'>({{chooseList.length}})</span>

      <div class="chooseList">
        <div class="chooseTitle">
          <span class="titStyle"></span>
          已点服务列表
          <span class="clear" @click='clearChoose'>清空</span>
        </div>
        <div class="chooseItem" 
            v-for='(item,index) in chooseList' 
            :key='index'>
          <span class="long">{{item.label}}</span>
          <span class="short">{{item.male ? '男:'+item.male : ''}}{{item.female ? '女:'+item.female : ''}}{{item.numberValue ? '随机:'+item.numberValue : ''}}</span>
          <span class="item-price short">￥{{item.money}}</span>
          <span class="short">{{item.timer}}</span>
        </div>
        <div class="noMoreData" v-if='!chooseList || !chooseList.length'>还没有点单额，快去选择商品吧~</div>
      </div>
    </div>

    <chooseTechnician v-if='isChoose'
        @dialogClose='dialogClose($event)'
        :operObj='operObj'>
    </chooseTechnician>
  </div>
</template>

<script>
import chooseTechnician from '@Components/chooseTechnician'
  export default {
    data(){
      return{
        technicianType: [
          {
            label: '全部',
            value: 1
          },
          {
            label: '保健',
            value: 2
          },
          {
            label: '小项目',
            value: 3
          },
          {
            label: '足疗',
            value: 4
          },
          {
            label: '加班',
            value: 5
          }
        ],
        currentType: 1,

        isChoose: false,
        operObj: null,

        AllList: [
          {
            label: '至尊遇阻贵宾间2',
            value: 198,
            type: 2
          },
          {
            label: '至尊遇阻标准间2',
            value: 168,
            type: 2
          },
          {
            label: '针灸遇阻标准间3',
            value: 299,
            type: 3
          },
          {
            label: '针灸遇阻贵宾间4',
            value: 199,
            type: 4
          },
          {
            label: '至尊遇阻贵宾间4',
            value: 198,
            type: 4
          },
          {
            label: '至尊遇阻标准间5',
            value: 168,
            type: 5
          },
          {
            label: '针灸遇阻标准间5',
            value: 299,
            type: 5
          },
          {
            label: '针灸遇阻贵宾间5',
            value: 199,
            type: 5
          },
        ],

        list: [],

        chooseList: [
          {
            female: 1,
            label: "至尊遇阻贵宾间2",
            male: 0,
            money: 198,
            numberValue: 0,
            timer: "100分钟"
          },
          {
            female: 1,
            label: "至尊贵宾间2",
            male: 1,
            money: 298,
            numberValue: 0,
            timer: "100分钟"
          }
        ],
      }
    },
    watch:{
      currentType(newVal, oldVal){
        if(newVal != oldVal){
          if(newVal != 1){
            this.list = _.filter(this.AllList, function(o) { return o.type == newVal });
          }else{
            this.list = this.AllList
          }
        }
      }
    },
    mounted(){
      // 从房间页面传递过来的id
      let roomId = this.$route.query.id
      console.log(this.$route.query.id)

      this.list = this.AllList
    },
    methods: {
      // 选择类型
      chooseType(data){
        this.currentType = data.value
      },
      // 选择技师
      chooseTechnician(data){
        this.operObj = data
        this.isChoose = true
      },

      dialogClose(event){
        this.isChoose=false
        if(event){
          this.chooseList.push(event)
          console.log(event)
        }
      },
      seeAll(){
        
      },
      clearChoose(){
        if(!this.chooseList || !this.chooseList.length){
          return
        }
        // 提示
        this.chooseList = []
      }
    },
    components:{
      chooseTechnician
    }
  }
</script>
