<template>
   <div class="table_btn">
        <el-button size="mini"
        @click="tableBtnClick(btn)" 
        class="btn"
        :type="btn.color"
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
       tableBtnClick(btn){
          this.$emit("tableBtnClick",btn);
       }
  },
  computed: {
    
  }
}
</script>
<style  scoped>
    .table_btn{
        width: calc(100% - 40px);
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
