<template>
   <div>
       <el-pagination
        background
        @current-change="currentChange"
        layout="sizes,prev, pager, next,total"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :total="total">
        </el-pagination>
   </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
  name: 'TablePagination',
  props: {
      pageSize:Number,
      pageSizes:Array,
      total:Number,
  },
  components:{
   
  },
  data () {
    return {
     
    }
  },
  methods:{
    ["size-change"](newPageSize){
       this.$emit('sizeChange',newPageSize)
    },
    currentChange(currentPage){
        this.$emit('currentChange',currentPage)
    },
    ['prev-click'](currentPage){
        this.$emit('currentChange',currentPage)
    },
    ['next-click'](currentPage){
     this.$emit('currentChange',currentPage)
    }
  },
  computed: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 

</style>
