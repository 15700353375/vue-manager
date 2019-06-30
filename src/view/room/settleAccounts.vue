<!--
 * @DateTime:    2019
 * @Description: 结账
 -->
 <template>
  <div class="clearfix settle-accounts-container">
    <div class="clearfix">
      <div class="statistical-title ">
        <span class='text-title'>基本信息</span>
      </div>
      <div class="settle-info clearfix">
        <div class="settle-info-item">
          <div class="item-left">结账目标：</div>
          <div class="item-right">{{information.name}}</div>
        </div>
        <div class="settle-info-item">
          <div class="item-left">房牌号信息：</div>
          <div class="item-right">{{information.number}}</div>
        </div>
        <div class="settle-info-item">
          <div class="item-left">开房时间：</div>
          <div class="item-right">{{information.timer}}</div>
        </div>
        <div class="settle-info-item clearfix item-desc">
          <div class="item-left">备注：</div>
          <div class="item-right">{{information.desc}}</div>
        </div>
      </div>
    </div>

    <div class="clearfix marginT-20">
      <div class="statistical-title ">
        <span class='text-title'>商品消费明细</span>
      </div>
      <div class="clearfix list">
        <div class="item" v-for='(item,index) in list' :key='index'>
          <div class="item-icon"><i class="iconfont icon-shangpin"></i></div>
          <div class="main_info">
            <div class="item-label">{{item.label}}</div>
            <div class="item-info">技师:{{item.technician}} 销售员:{{item.sellPerson}}</div>
            <div class="item-info"><span class="item-info-price">￥{{item.price}}</span> 折扣:{{item.technician}} 房间:{{item.roomName}}</div>
          </div>
          <div class="number">×{{item.number}}</div>
          <div class="price">￥{{item.price2}}</div>
        </div>
      </div>
    </div>

    <div class="clearfix marginT-20 moneyFrom">
      <div class="statistical-title">
        <span class='text-title'>消费金额汇总</span>
      </div>
      <div class="settle-info clearfix">
        <div class="total">
          <div class="item-left">消费合计</div>
          <div class="item-right">￥{{consume.total}}</div>
        </div>
        <div class="consume-main">
          <div class="settle-consume-item">
            <div class="consume-left">
                <div class="consume-item-left">折扣率：</div>
                <div class="consume-item-right">{{consume.money1}}</div>
            </div>
            <div class="consume-right">
                <div class="consume-item-left">优惠金额：</div>
                <div class="consume-item-right">{{consume.money2}}</div>
            </div>
          </div>
          <div class="settle-consume-item">
            <div class="consume-left">
                <div class="consume-item-left">抹零金额：</div>
                <div class="consume-item-right">{{consume.money3}}</div>
            </div>
            <div class="consume-right">
                <div class="consume-item-left">应收：</div>
                <div class="consume-item-right">{{consume.money4}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class='oper'>
       <div class="oper-main">总金额：<span>￥100</span> </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        information: {
          name: 'A预约房',
          number: '2342134123412',
          timer: '2019-07-07',
          desc: '备注备注'
        },

        // 计费类型
        list:[
          {
            label: "果盘",
            roomName: "A01",
            technician: "018",
            sellPerson: '毛不易',
            price: '198',
            discount: false,
            number: 1,
            price2: '158'
          },
          {
            label: "果盘",
            roomName: "A01",
            technician: "018",
            sellPerson: '毛不易',
            price: '198',
            discount: false,
            number: 1,
            price2: '158'
          }
        ],

        // 消费
        consume: {
          total: '999',
          money1: 1,
          money2: 11,
          money3: 13,
          money4: 189,
        },

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
