<template>
   <div>
       <el-pagination
        background
        layout="sizes,prev, pager, next,total"
        :page-size="pageSizes"
        :total="total">
        </el-pagination>
   </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
  name: 'TablePagination',
  props: {
      pageSizes:Number,
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
    currentPage(currentPage){
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
