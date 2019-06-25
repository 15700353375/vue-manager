<!--
 * @Author:      changh
 * @DateTime:    2018-12-27
 * @Description: 房间状态
 -->

<template>

<div class='room-container'>
  <div class='clearfix select-main'>
    <div class="custom_input">
      <v-select v-model="select1" :options="selectArray"></v-select>
      <v-select v-model="select2" :options="selectArray2"></v-select>
    </div>
  </div>

  <div class="room-container_main">
    <div class='clearfix list-main' v-if="listData && listData.length">
      <div class='list-item' v-for='(item,index) in listData' :key='index' @click='operItem(item)'>

        <!-- 顶部 -->
        <div v-if="dealClass(item.roomStatus,item)" class='list-item-top' :class="dealClass(item.roomStatus, item) ? 'active'+(item.roomOrder.billBatch%10) : ''">
          {{item.roomOrder.billBatch || ''}} {{item.roomName}}
          <!-- 字段：roomOrder.totalGoodsAmount,如果roomType字段值为2时，在钱后面显示+号，其他情况不显示+号 -->
          <span v-if="item.roomOrder" class="item-top-right">￥{{item.roomOrder.totalGoodsAmount || 0}}{{item.roomType == 2 ? '+' : ''}}</span>
        </div>
        <div v-else class='list-item-top'>
          {{item.roomName}}
        </div>


        <div v-if="item.roomStatus == 5 || item.roomStatus == 11" class='list-item-content clearfix' :style="{'background-color':getRoomBodyBackground(item.roomStatus)}">

          <div class="content-first">使用中</div>
          <div class="content-second " v-for="(child,index) in item.cashierShowTechnicianInfoList" :key="index" :class="statusColor(child.status,child.isTimeout)">
            <!-- 当字段status为待上钟状态(1)和正在上钟状态(2)时，如果字段isTimeout显示为true,表示技师超时，该行背景变为红色，正常情况下显示绿色 -->
            <template>
              <div class="second-left">
                <span v-if="child.sex != 3" class='fa' :class="child.sex == 1 ? 'fa-female' : 'fa-male'"></span>
                <span v-else class='fa'></span>
                {{child.number}}
              </div>
              <div class="second-center">{{child.statusName}}</div>
              <div class="second-right">{{child.timing}}</div>
            </template>
          </div>
          <!-- 字段：remark,房间备注。roomStatus是使用中(5)，房间暂停(11)，已结账未离开(8)，需要打扫(9)时，如果有备注，需要显示，对于已结账未离开(8)和需要打扫(9)状态-->
          <div class="content-bottom" v-if="item.roomStatus == 5 || item.roomStatus == 11">
            <span v-if="item.remark">备注:{{item.remark}}</span>
          </div>

          <!-- 字段restMinute，所有技师均完成服务，客人休息分钟数遮层显示，如果字段restMinute有值，就显示该遮层，如果休息时间分钟数大于24小时，需要前端逻辑处理把分钟数改为天数 -->
          <div class="mask" v-if="item.restMinute && item.roomStatus != 11">
            <div class="mask-opacity"></div>
            <span v-if="item.restDay" class="mask-text mask-text-text">{{item.restDay}}<span class="unit">天</span></span>
            <span v-else class="mask-text mask-text-text">{{item.restMinute}}<span class="unit">分钟</span></span>
          </div>

          <div class="mask" v-if="item.roomStatus == '11'">
            <div class="mask-opacity"></div>
            <div class="mask-text">
              <div class="img-box"><img src="agentStatic/img/pauseBtn.png" alt=""></div>
              <div class="texts">暂停使用</div>
            </div>
          </div>
        </div>

        <div v-else-if="item.roomStatus == 10" class='list-item-content clearfix'  :style="{'background-color':getRoomBodyBackground(item.roomStatus)}">
          <div class="content-first">已预约</div>
          <ul class="content-appointment" v-if="item.roomAppointment">
            <li class="appointmentName">{{item.roomAppointment.customerName}}</li>
            <li class="appointmentTel">{{item.roomAppointment.customerPhone}}</li>
            <li class="appointmentNumber">{{item.roomAppointment.customerNumber?item.roomAppointment.customerNumber+'位':''}}</li>
            <li class="appointmentTime" v-html="formatDate(item.roomAppointment.appointmentDate)"></li>
          </ul>
        </div>

        <div v-else class='list-item-content clearfix' :style="{'background-color':getRoomBodyBackground(item.roomStatus)}" :class="{available:item.roomStatus=='2' || item.roomStatus=='9'}">
          <div class="kong-content clearfix">
            <div class="icon-box">
              <img :src="item.roomStatus=='2' || item.roomStatus=='9'?'agentStatic/img/icon-free-available.png':'agentStatic/img/icon-free.png'" alt="">
            </div>
            <!-- 字段：seatNum，座位数，只有空闲中，需要打扫，已买单未离开状态才显示 -->
            <div class="kong-text" v-if="item.roomStatus == 2">
              空闲中({{item.seatNum}}座)
            </div>
            <div class="kong-text" v-if="item.roomStatus == 8">
              客人未离开({{item.seatNum}}座)
              <div v-if="item.remark" class="remark text-ellipsis2">
                备注:{{item.remark}}
              </div>
            </div>
            <div class="kong-text" v-if="item.roomStatus == 9">
              需要打扫({{item.seatNum}}座)
              <div v-if="item.remark" class="remark text-ellipsis2">
                备注：{{item.remark}}
              </div>
            </div>
            <div class="kong-text" v-if="item.roomStatus == 1">
              房间停用
            </div>
          </div>
          <div class="mask" v-if="item.roomStatus == '11'">
            <div class="mask-opacity"></div>
            <div class="mask-text">
              <div class="img-box"><img src="agentStatic/img/pauseBtn.png" alt=""></div>
              <div class="texts">暂停使用</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='clearfix list-main' v-else>
      <img class="noDate_img" src="agentStatic/img/wushuju.png" alt="">
    </div>
  </div>


  <actionsheet v-model="isShowPop"
    :menus="operObj.roomStatus == 2 ? menus : menus2"
    :close-on-clicking-mask="true"
    @on-click-mask="closePop"
    @on-click-menu='showModal'>
    <p slot="header">{{operObj.roomName || ''}}房间操作列表</p>
  </actionsheet>
</div>

</template>


<script>
  //加载相关依赖
  import comUtil from '@Util/comUtil';
  import {urls} from '@Util/axiosConfig';
  export default {
    props: ['currentData'],
    data() {
      return {
        comUtil: comUtil,
        // roomType 1 浴足房间；2 棋牌房间
        selectArray: [{
            value: 0,
            label: "全部"
          }, {
            value: 1,
            label: "浴足房间"
          }, {
            value: 2,
            label: "棋牌房间"
          },
        ],
        // roomStatus
        // 1：停用
        // 2：空闲中
        // 5：使用中
        // 8：已买单未离开
        // 9：需要打扫
        // 10：已预约
        // 11:房间暂停
        selectArray2: [
          {
            value: 0,
            label: "全部"
          }, {
            value: 1,
            label: "停用"
          }, {
            value: 2,
            label: "空闲中"
          }, {
            value: 5,
            label: "使用中"
          }, {
            value: 8,
            label: "已买单未离开"
          }, {
            value: 9,
            label: "需要打扫"
          },
          {
            value: 10,
            label: "已预约"
          },
          {
            value: 11,
            label: "房间暂停"
          }
        ],

        select1: {
            value: 0,
            label: "全部"
          },
        select2:  {
            value: 0,
            label: "全部"
          },

        listData:[],

        isShowPop: false,

        operObj: {
          roomName: '',
          roomStatus: null
        },
        // 未开房
        menus: {
          // menu1: '预约',
          menu2: '开房',
        },
        // 已开房
        menus2: {
          menu1: '安排技师',
          menu2: '商品点单',
          menu3: '显示详情',
          menu4: '备注',
          menu5: '结账',
        },

      }
    },
    computed: {

    },
    watch:{
      select1(newVal,oldVal){
        this.changeSelect()
      },
      select2(newVal,oldVal){
        this.changeSelect()
      },
      currentData(newVal,oldVal){
        if(newVal == 1){
          this.selectRefresh()
          this.getRoomList();
        }
      }
    },
    created(){
      let currentInfo = localStorage.getItem('currentInfo')
      this.currentInfo = JSON.parse(currentInfo)

      this.getRoomList();
    },
    mounted(){

    },
    methods: {
      // select更新
      selectRefresh(){
        this.select1 = {
            value: 0,
            label: "全部"
          }
        this.select2 = {
            value: 0,
            label: "全部"
          }
      },
      // 筛选
      changeSelect(){
        if(!this.allData || !this.allData.length) return
        let select1 = this.select1.value
        let select2 = this.select2.value
        if(select1 && !select2){
          this.listData =  _.filter(this.allData, { 'roomType': this.select1.value.toString() });
        }else if(select1 && select2){
          this.listData =  _.filter(this.allData, { 'roomType': this.select1.value.toString(), 'roomStatus': this.select2.value.toString()});
        }else if(!select1 && select2){
          this.listData =  _.filter(this.allData, { 'roomStatus': this.select2.value.toString()});
        }else{
          this.listData = comUtil.clone(this.allData)
        }
      },

      // 获取技师列表
      getRoomList(){
        let params = {
          holderId: this.currentInfo.holderId,
          holderType: this.currentInfo.holderType,
          holderGroup: this.currentInfo.holdGroup,
        }
        this.$ajaxPost(urls.GETROOMINFO, params).then(res => {
          if(res){
            this.allData = this.dealData(res.data);
            this.listData = comUtil.clone(this.allData)
          }
          // 重置
          this.selectRefresh()
        })
      },

      // 处理时间
      dealData(list){
        if(!list || !list.length) return;
        list.forEach((item,index) => {
          item.restDay = this.transformTime(item.restMinute)
        })
        return list;
      },

      transformTime(time){
        let newTime = null
        if(time > 1440){
          newTime = Math.floor(time/1440)
        }else{
          newTime = null
        }
        return newTime;
      },

      // 顶部颜色
      dealClass(status, item){
        // 是在roomStatus为3,5,11,12时才存在  此时仍然存在没有批次号，billBatch
        let flag = false;
        if((status == 3 || status == 5 || status == 11 ||  status == 12) && item.roomOrder && item.roomOrder.billBatch){
          flag = true
        }else{
          flag = false;
        }

        return flag;
      },

      //房间背景
      getRoomBodyBackground(status){
        if(status=='10'){
            return '#cbffc8'
        } else if(status=='2'|| status == '9'){
            return '#BEDCF7'
        } else {
            return '#fff'
        }
      },

      // 中间颜色
      // 当字段status为待上钟状态(1)和正在上钟状态(2)时，如果字段isTimeout显示为true,表示技师超时，该行背景变为红色，正常情况下显示绿色
      statusColor(status,isTimeout){
        let color = ''
        if(status == 1 || status == 2){
          if(isTimeout == true){
            color = 'color-error'
          }else{
            color = 'color-success'
          }
        }else if(status == 3){
          color = 'color-success'
        }else{
          color = 'color-warning'
        }
        return color;
      },

      formatDate(appointmentDate){
        if(appointmentDate){
          return comUtil.formatTime(new Date(appointmentDate.replace(/-/g,'/'))/1000,'YY/MM/DD HH:mm');
        } else{
          return '';
        }
      },

      // 单独点击时
      operItem(item){
        // console.log(item)
        this.operObj = item
        this.isShowPop = true
      },

      showModal(){
        this.$router.push({name: 'getRoom'})
      },

      closePop(){     
         
        this.isShowPop = false
        
      }

    },
    components: {

    }
  }

</script>

