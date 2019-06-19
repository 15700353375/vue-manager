<!--
 * @Author:      changh
 * @DateTime:    2018-12-27
 * @Description: 房间状态
 -->

<template>

<div class="technician-main">
  <div class="technician-search">
      <!-- <search
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      position="absolute"
      auto-scroll-to-top
      top="0px"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"></search> -->

    <search @result-click="resultClick" :auto-fixed='true' @on-change="getResult" :results="results" v-model="searchVal"></search>
  </div>

  <scroller use-pulldown :pulldown-config="pulldownDefaultConfig" @on-pulldown-loading="refresh"
    lock-x ref="scrollerBottom" height="-40">
  <div style="padding: 10px 0">
    <div class='technician-container' v-if="listData && listData.length">

      <div class='tec-main clearfix' v-for="(bigItem, index) in listData" :key="index" >
        <div class='tec-title'>
          <span>{{bigItem.depart.dName}}（总计：{{bigItem.depart.totalPersonNum || 0}}人）</span>
        </div>
        <div class='tec-content clearfix' v-if="bigItem.all_queue && bigItem.all_queue.length">
          <div class='tec-item' v-for="(item,index) in bigItem.all_queue" :key='index'
          :class="item.workFlag == 2 && (item.statusFlag == 3 || item.statusFlag == 4) ? 'item-bg6' : item.finishWorkWillPauseFlag == 1 ? 'item-bg6' : 'item-bg'+item.statusFlag"
          @click='operItem(item)'>
            <div class="item-top" >
              <div class="item-top-left">
                {{item.sex == 1 ? '女' : '男'}}
              </div>
              <div class="item-top-center">
                {{item.workFlag == 3 ? '加' : item.sortsName}}
              </div>
              <div class="item-top-right">
                <!-- <span v-if="item.finishWorkWillPauseFlag == 0" class='iconfont icon-gengduomore12'></span> -->
                <span v-if="item.finishWorkWillPauseFlag == 1" class='iconfont icon-tianchongxing-'></span>
              </div>
            </div>
            <div class="item-center">
              {{item.number}}
              <!-- <h1 >test</h1> -->
                <!-- 当workFlag =2 并且statusFlag = 3 or 4   下班 -->
              <div class="noWork" v-if="item.workFlag == 2 && (item.statusFlag == 3 || item.statusFlag == 4)">
                <span>下</span>
                <span>班</span>
              </div>
            </div>

            <div class="item-bottom">
              <div class="item-bottom-left">
                {{item.paizhong}}
              </div>
              <div class="item-bottom-center">
                <!-- 非上钟 -->
                <span v-if="item.statusFlag != 3" class="item-bottom-center-span">{{dealStatus(item.statusFlag)}}</span>
                <!-- 上钟  1:排钟，2:选钟，3:加钟，4:点钟-->
                <span v-else class="item-bottom-center-span">{{dealOper(item.oper)}}</span>
              </div>
              <div class="item-bottom-right">
                {{item.dianzhong}}
              </div>
            </div>
          </div>
        </div>
        <div class='tec-content clearfix' v-else>
          <div class="noData">暂无数据</div>
        </div>
        <div class='tec-footer'>空闲：{{bigItem.depart.freePersonNum}}人&nbsp;&nbsp;/&nbsp;&nbsp;忙碌：{{bigItem.depart.workingPersonNum}}人</div>
      </div>
    </div>
    <div class='technician-container' v-else>
      <img class="noDate_img" src="agentStatic/img/wushuju.png" alt="">
    </div>

  </div>
  </scroller>

  <technicianInfo v-if='isInfoShow'
                  @dialogClose='dialogClose'
                  :operObj='operObj'>
  </technicianInfo>

  <actionsheet v-model="isShowPop"
    :menus="menus"
    :close-on-clicking-mask="true"
    @on-click-mask="closePop"
    @on-click-menu='showModal'>
    <p slot="header">技师{{operObj.number || ''}}操作列表</p>
  </actionsheet>
</div>
</template>


<script>
  //加载相关依赖
  import { mapState } from 'vuex';
  import axios from 'axios'
  import {urls} from '@Util/axiosConfig';
  import technicianInfo from '@Components/technicianInfo'
  export default {
    props: ['currentData'],
    data() {
      return {
        results: [{title: 'hello', key: '123'}],
        searchVal: '',

        isInfoShow: false,
        isShowPop: false,
        menus: {
          menu1: '技师信息',
        },

        operObj: {
          number: ''
        },

        pulldownDefaultConfig: {
          content: '下拉刷新',
          height: 40,
          autoRefresh: false,
          downContent: '下拉刷新',
          upContent: '释放后刷新',
          loadingContent: '正在刷新...',
          clsPrefix: 'xs-plugin-pulldown-'
        },

        options3: ['A', 'B', 'C'],
        option5: 'B',

        currentInfo: {},

        listData: [],

      }
    },
    watch:{
      currentData(newVal,oldVal){
        if(newVal == 2){
          this.getTecList();
        }
      }
    },
    created(){
      let currentInfo = localStorage.getItem('currentInfo')
      this.currentInfo = JSON.parse(currentInfo)

      this.getTecList();
    },
    mounted(){

    },

    methods: {
      refresh() {
        this.getTecList()
      },

      // 获取技师列表
      getTecList(){
        let params = {
          holderId: this.currentInfo.holderId,
          holderGroup: this.currentInfo.holdGroup,
        }
        this.$ajaxPost(urls.GETTECHNICIANQUEUE, params).then(res => {
          if(res){
            this.listData = res.data
            setTimeout(()=>{
              this.$refs.scrollerBottom.donePulldown()
            }, 1000)
          }
        })
      },

      dealOper(oper){
        oper = Number(oper)
        // 1:排钟，2:选钟，3:加钟，4:点钟
        let name = '';
        switch (oper) {
          case 1 : name = '排'; break;
          case 2 : name = '选'; break;
          case 3 : name = '加'; break;
          case 4 : name = '点'; break;
        }
        return name
      },

      dealStatus(data){
        data = Number(data)
        // 1：暂停  2：空闲  3：上钟  4: 待上
        let name = '';
        switch (data) {
          case 1 : name = '暂停'; break;
          case 2 : name = '空闲'; break;
          case 3 : name = '上钟'; break;
          case 4 : name = '待上'; break;
          case 5 : name = '预约'; break;
        }
        return name
      },

      // 添加搜索功能
      setFocus () {
        this.$refs.search.setFocus()
      },
      resultClick(item){
         localStorage.setItem("goodname", this.value)
        //  window.location.href="/list"
      },
      getResult(val){
          console.log(val)
      },

      // 单独点击时
      operItem(item){
        console.log(item)
        this.operObj = item
        this.isShowPop = true
      },

      dialogClose(){
        this.isInfoShow=false
      },

      showModal(){
        this.isInfoShow = true
      },

      closePop(){
        this.isShowPop = false
      }
    },
    components: {
      technicianInfo
    }
  }

</script>

