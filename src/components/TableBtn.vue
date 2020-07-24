<template>
   <div class="table_btn">
        <el-button size="mini"
        @click="tableBtnClick(btn.action)" 
        class="btn"
        plain
        :icon="btn.icon?btn.icon:''"
        v-for="btn in table_buttons" :key="btn.action">{{btn.name}}</el-button>
   </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
  name: 'TableBtn',
  props: {
     table_buttons:[Array,null]
  },
  components:{
   
  },
  data () {
    return {
     
    }
  },
  methods:{
       tableBtnClick(action){
          this.$emit("tableBtnClick",action);
       }
  },
  computed: {
    
  }
}
</script>
<style  scoped>
    .table_btn{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content:flex-start;
        align-items: center;
        margin:10px 10px 8px 30px;
    }
    .btn{
        margin-right: 10px;
    }
</style>
