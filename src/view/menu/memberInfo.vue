<!--
 * @DateTime:    2018-12-25
 * @Description: 报表决策
 -->
<template>
  <div class="clearfix menber-container">
    <div class="member-search">
      <div class="menber-search-main">
        <div class="search-label" v-clickoutside>
          <span>{{currentSearchType}}</span>
          <div class="my-popover" id="my-popover" placement="bottom">
            <div class="my-poptip-arrow"><span></span></div>
            <div class="my-popover-content">
              <group>
                <cell-box @click.native='searchType("手机号")'>
                  手机号
                </cell-box>
                <cell-box @click.native='searchType("卡号")'>
                  卡号
                </cell-box>
                <cell-box @click.native='searchType("姓名")'>
                  姓名
                </cell-box>
              </group>
            </div>            
          </div>
        </div>
        <input type="text" v-model='inputVal'>
        <button class="btn-search" @click='search'>
          查询
        </button>
      </div>
    </div>

    <!-- 查询结果 -->

    <div class="member-list">
      <div class="member-item" v-for="(item,index) in list" :key='index'>
        <div class="item-top">
          <img src="agentStatic/img/11.jpg" alt="">
          <div class="item-top-right">
            <span class="item-type">{{item.type}}</span>
            <div class="item-tit">{{item.title}}</div>
            <div class="item-name"> <i class="iconfont icon-ren"></i> {{item.name}}</div>
            <div class="item-tel"> <i class="iconfont icon-dianhua"></i>  {{item.phone}}</div>
          </div>
        </div>
        <div class="item-bottom">
            <cell title="卡内余额" :value="item.money"></cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        currentSearchType: '手机号',
        inputVal: '',

        AllList:[
          {
            id: 1,
            type: '会员卡',
            title: 'vip3424355',
            name: '张老板',
            phone: '6666',
            money: '￥856.36'
          },
          {
            id: 2,
            type: '会员卡',
            title: 'vip3424355',
            name: '李老板',
            phone: '8888',
            money: '￥856.36'
          },
          {
            id: 3,
            type: '会员卡',
            title: 'vip3424355',
            name: '林老板',
            phone: '9999',
            money: '￥856.36'
          },
          {
            id: 4,
            type: '会员卡',
            title: 'vip3424355',
            name: '梅老板',
            phone: '6666',
            money: '￥856.36'
          },
          {
            id: 5,
            type: '会员卡',
            title: 'vip3424355',
            name: '陈老板',
            phone: '8888',
            money: '￥856.36'
          }
        ],
        list: []

      }
    },
    mounted(){
      
    },
    methods: {
      // 搜索类型
      searchType(flag){
        this.currentSearchType = flag
      },
      // 查询
      search(){
        if(!this.inputVal){
          this.bottomToast('请输入搜索内容')
          return
        }

        if(this.currentSearchType == '手机号'){
          this.list = _.filter(this.AllList, ['phone', this.inputVal])
          return
        }
        if(this.currentSearchType == '姓名'){
          this.list = _.filter(this.AllList, ['name', this.inputVal])
          return
        }
        if(this.currentSearchType == '卡号'){
          this.list = _.filter(this.AllList, ['id', this.inputVal])
          return
        }
        
      }

    },
    components:{
    }
  }
</script>
