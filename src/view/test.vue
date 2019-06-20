<!--
 * @DateTime:    2019
 * @Description: 测试demo
 -->
 <template>
  <div class="clearfix test-container">
    <v-select v-model="selected" :options="['foo','bar']"></v-select>
    <v-select v-model="selected2" :options="['foo','bar']"></v-select>
  </div>
</template>
<style lang="less">
.test-container{
  .v-select{
    width: 50%;
    float: left;
    .vs__actions{
      .vs__clear{
        display: none;
      }
    }
  }
}
</style>

<script>
  export default {

    data(){
      return{
        selected: 'foo',
        selected2: 'bar'

      }
    },
    created(){

    },
    mounted(){

    },
    methods: {

    },
    components:{
    }
  }
</script>
