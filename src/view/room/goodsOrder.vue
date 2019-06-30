<!--
 * @DateTime:    2019
 * @Description: 商品点单
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
              <!-- <x-button class="item-botton" mini type="primary" @click.native='chooseTechnician(item)'>选择技师</x-button> -->
              <inline-x-number class="item-number" 
                                width="50px" 
                                button-style="round" 
                                :min='0' 
                                :max='100'
                                v-model='item.number' 
                                @on-change="change(item)"></inline-x-number>
            </div>
          </div>
          <div class="noMoreData">没有更多了~</div>
        </div>
  
      </div>
  
      <div class="plan-bottom goods_bottom">
        <div class="lefts" @click='seeAll'>
            <span class="shoppingCar">
                <i class="iconfont icon-gouwuche"></i><badge :text="totalNumber"></badge>
            </span>
            <span class="totalMoney">￥{{totalMoney}}</span>
        </div>  
        <span class="chooseBtn" :class='{disabled: totalMoney <= 0}' @click='postData'>确认点单</span>
      </div>
  
      <div v-transfer-dom>
        <popup v-model="isShowShop" is-transparent>
          <div class="chooseList">
            <div class="chooseTitle">
              <span class="titStyle"></span>
              已点服务列表
              <span class="clear" @click='clearChoose'>清空</span>
            </div>
            <div class="list_box">
              <div class="chooseItem" 
                  v-for='(item,index) in chooseList' 
                  :key='index'>
                <span class="long">
                  <i class="iconfont icon-shangpin"></i>
                  {{item.label}}
                </span>                
                <span class="item-price short">￥{{item.value}}</span>
                <span class="short">
                   数量:{{item.number}}
                </span>
                <span class="short">销售员：张三</span>
              </div>
              <div class="noMoreData" v-if='!chooseList || !chooseList.length'>还没有点单额，快去选择商品吧~</div>
            </div>
          </div>
        </popup>
      </div>
  
  
    </div>
  </template>
  
  <script>
  import { InlineXNumber } from 'vux'
    export default {
      data(){
        return{
          // 左侧项目类别
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
          // 当前类别
          currentType: 1,
  
          // 全部
          AllList: [
            {
              id: 1,
              label: '至尊遇阻贵宾间2',
              value: 198,
              number: 0,
              type: 2
            },
            {
              id: 2,
              label: '至尊遇阻标准间2',
              value: 168,
              number: 0,
              type: 2
            },
            {
              id: 3,
              label: '针灸遇阻标准间3',
              value: 299,
              number: 0,
              type: 3
            },
            {
              id: 4,
              label: '针灸遇阻贵宾间4',
              value: 199,
              number: 0,
              type: 4
            },
            {
              id: 5,
              label: '至尊遇阻贵宾间4',
              value: 198,
              number: 0,
              type: 4
            },
            {
              id: 6,
              label: '至尊遇阻标准间5',
              value: 168,
              number: 0,
              type: 5
            },
            {
              id: 7,
              label: '针灸遇阻标准间5',
              value: 299,
              number: 0,
              type: 5
            },
            {
              id: 8,
              label: '针灸遇阻贵宾间5',
              value: 199,
              number: 0,
              type: 5
            },
          ],
          // 右侧列表
          list: [],

          // 已选总价格
          totalMoney: 0,
          // 总数量
          totalNumber: 0,
          
          // 是否显示已选技师
          isShowShop: false,
          // 已选
          chooseList: []      
        }
      },
      watch:{
  
        // 左侧类型切换-前端筛选列表
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
  
        // 默认全部
        this.list = this.AllList
      },
      methods: {
        // 选择类型
        chooseType(data){
          this.currentType = data.value
        },
        
        // 单个列表数量改变
        change(item){
          if(item.number > 0){            
            // 判断已选列表中是否存在
            let ind = _.findIndex(this.chooseList, ['id', item.id])
            if(ind < 0){
              this.chooseList.push(item)
            }else{
              this.chooseList[ind] = item
            }
          }else{
            this.chooseList = _.reject(this.chooseList, function(o) { return o.id == item.id });
          }
          
          this.count()
        },
        // 计算总数和总价格
        count(){
          this.totalMoney = 0
          this.totalNumber = 0
          this.chooseList.forEach(item => {
            this.totalMoney += Number(item.value) * Number(item.number)
            this.totalNumber += Number(item.number)
          })
        },

        // 查看已选技师
        seeAll(){
          this.isShowShop = true
        },
        
        // 清空已选
        clearChoose(){
          if(!this.chooseList || !this.chooseList.length){
            return
          }
          // 提示
          this.$vux.confirm.show({
            title: '提示',
            content: '确认清空购物车吗？',
            onCancel : () => {
              console.log('取消') //当前 vm
            },
            onConfirm : () => {
              this.chooseList = []
            }
          })
        },

        // 提交数据
        postData(){
          if(!this.totalMoney){
            return
          }
          console.log('提交数据')
        }
      },
      components: {
        InlineXNumber
      }
    }
  </script>
  