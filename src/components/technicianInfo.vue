<!--
 * @DateTime:    2019
 * @Description: 技师信息
 -->

 <template>
  <div v-show='isShow'>
    <div v-transfer-dom>
        <x-dialog v-model="isShow" class="dialog-demo" :hide-on-blur='true' @on-hide='close'>
          <div class="img-box">
            <div v-if='currentObj && currentObj.number'>
              <div class="info-top">
                <img src="@Src/assets/img/11.jpg" alt="">
              </div>
              <div class="info-title">{{currentObj.number}}</div>
              <div class="info-name">
                技师姓名:{{currentObj.name}} 
                技师性别:{{currentObj.sex == '1' ? "男" : "女"}}
              </div>
      
              <div class="info-list">
                <div class="info-item">
                  班次信息<span>中（12:00 - 13:00）</span>
                </div>
                <div class="info-item">
                  上班状态<span>上班</span>
                </div>
                <div class="info-item">
                  所在房间<span>听雪楼</span>
                </div>
                <div class="info-item">
                  状态<span>加</span>
                </div>
                <div class="info-item">
                  时间<span>超时:1分钟</span>
                </div>
              </div>
            </div>
          </div>
          <div @click="isShow=false">
            <span class="vux-close"></span>
          </div>
        </x-dialog>
      </div>
  </div>
  </template>
  
  <style lang="less" scoped>

  </style>
  
  
  
  <script>
  
    export default {
      props: ['operObj'],
      data() {
        return {
          isShow: true,

          currentObj: {
            number: '1',
            name: '2',
            sex: '1'
          }
        }
      },
      mounted(){
        this.currentObj = JSON.parse(JSON.stringify(this.operObj))
        console.log(this.operObj)
      },

      methods: {
        close(){
          this.isShow = false
          this.$emit('dialogClose')
        }
  
      },
      components: {
  
      }
    }
  
  </script>
  
  