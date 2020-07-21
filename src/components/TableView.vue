<template>
    <div class='table-v'>
        <div class="table-search">
            <table-search />
        </div>
        <el-table :data="tableData"
        class='table-table'
        >
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
        </el-table>
       <div
       class="table-pagination"
       ><table-pagination
       :total="total"
       :pageSizes="pageSizes"
       @sizeChange="sizeChange"
       @currentChange="currentChange"
        /></div>
        
    </div>
 
</template>

<script>
// import { mapState } from "vuex";
import TableSearch from './TableSearch';
import TablePagination from './TablePagination';
export default {
  name: 'TableView',
  props: {
 
  },
  components:{
    TableSearch,
    TablePagination,
  },
  data () {
    return {
      total:0,
      pageSizes:20,
      tableData: [],
    }
  },
  methods:{
    sizeChange(pageSize){
      console.log(pageSize);
    },
    currentChange(current){
        console.log(current);
    }
  },
  computed: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .table-v{
      display: flex;
      flex-direction: column;
  }
  /* .table-search{

  } */
  .table-table{
         flex: 1;
  }
  /* .table-pagination{

  } */

</style>
