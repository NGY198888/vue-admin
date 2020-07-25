<template>
    <div class='table-v'>
        <div class="table-search" style="width:100%;margin-bottom:8px;">
            <table-search
            :fields="gridConfig.tableSearchFields"
             />
        </div>
         <TableBtn :table_buttons="gridConfig.table_buttons" />
        <el-table :data="tableData"
        class='table-table'
        border
        height="250"
        >
            <el-table-column
              type="selection"
              v-if="gridConfig.multCheck"
              width="55">
            </el-table-column>
            <el-table-column :prop="field.field" :label="field.label" :width="field.width?field.width:140" v-for="field in  gridConfig.tableFields" :key="field.field">
            </el-table-column>
            <el-table-column label="操作" v-if="gridConfig.row_buttons&&gridConfig.row_buttons.length>0">
              <template slot-scope="scope">
                <el-button size="mini"
                 @click="rowBtnClick(scope.row,btn.action)" 
                 :icon="btn.icon?btn.icon:''"
                  v-for="btn in gridConfig.row_buttons" :key="btn.action">{{btn.name}}</el-button>
              </template>
            </el-table-column>
        </el-table>
       <div class="table-pagination">
       <table-pagination
       :total="gridConfig.total"
       :pageSizes="gridConfig.pageSizes"
       @sizeChange="sizeChange"
       @currentChange="currentChange"
        /></div>
        <DialogView
        title="test"
        :needConfirm="true"
        ref="dialog"
        >
111111111
        </DialogView>
    </div>
 
</template>

<script>
// import { mapState } from "vuex";
import TableSearch from './TableSearch';
import TablePagination from './TablePagination';
import TableBtn from './TableBtn';
import DialogView from './DialogView';
import request from '@/utils/request';
import   '@/styles/TableView.scss';
export default {
  name: 'TableView',
  props: {
 
  },
  components:{
    TableSearch,
    TablePagination,
    TableBtn,
    DialogView,
  },
  data () {
    return {
      now_action:null,
      gridConfig:{
        multCheck:false,
        total:0,
        pageSizes:20,
        page:1,
        tableSearchFields:[],
        tableFields:[],
        row_buttons:[
          {
            name:"修改",
            action:"edit"
          },
          {
            name:"删除",
            action:"delete"
          }
        ],
        table_buttons:[
          {
            name:"新增",
            action:"add"
          },
          {
            name:"导出",
            action:"export"
          }
        ],
      },
      tableData: [
        {
            date:'2010',
            name:'2010',
            addr:'2010',
        },{
            date:'2010',
            name:'2010',
            addr:'2010',
        },{
            date:'2010',
            name:'2010',
            addr:'2010',
        },{
            date:'2010',
            name:'2010',
            addr:'2010',
        },{
            date:'2010',
            name:'2010',
            addr:'2010',
        },{
            date:'2010',
            name:'2010',
            addr:'2010',
        },{
            date:'2010',
            name:'2010',
            addr:'2010',
        },{
            date:'2010',
            name:'2010',
            addr:'2010',
        },{
            date:'2010',
            name:'2010',
            addr:'2010',
        },{
            date:'2010',
            name:'2010',
            addr:'2010',
        },{
            date:'2010',
            name:'2010',
            addr:'2010',
        },{
            date:'2010',
            name:'2010',
            addr:'2010',
        },
        {
            date:'2010',
            name:'2010',
            addr:'2010',
        },{
            date:'2010',
            name:'2010',
            addr:'2010',
        },{
            date:'2010',
            name:'2010',
            addr:'2010',
        },{
            date:'2010',
            name:'2010',
            addr:'2010',
        },{
            date:'2010',
            name:'2010',
            addr:'2010',
        },{
            date:'2010',
            name:'2010',
            addr:'2010',
        }
      ],
    }
  },
  methods:{
    sizeChange(pageSize){
      this.gridConfig.pageSizes=pageSize
      this.query()
    },
     currentChange(current){
        this.gridConfig.page=current;
        this.query()
    },
    rowBtnClick(row,action) {
      this.now_action=action;
      this.$refs.dialog.openDialog();
      this.$refs.dialog.openDialog();
      console.log(row,action);
    },
    initView(){
       request.get(this.grid_conf_api).then((rs)=>{
           this.gridConfig.tableFields=rs.data.fields
           this.gridConfig.tableSearchFields=rs.data.searchFields
           this.query()
       })
    },
    query(){
      let query={
        page:this.gridConfig.page,
        perPage:this.gridConfig.pageSizes
      }
      request.get( `/${this.resource}`,{ params:{query:JSON.stringify(query)}}).then((rs)=>{
           this.gridConfig.total=rs.data.total
           this.gridConfig.pageSizes=rs.data.perPage
           this.gridConfig.page=rs.data.page
           this.tableData=rs.data.data
            
       })
    }
  },
  computed: {
    resource(){
         console.log('resource',this.$route.params);
        return  this.$route.params.resource
    },
    grid_conf_api(){
      return `/${this.resource}/grid`
    },
    grid_data_api(){
      return `/${this.resource}/index`
    },
    form_conf_api(){
      return `/${this.resource}/form`
    },
    view_conf_api(){
      return `/${this.resource}/view`
    },
  },
  created () {
    this.initView();
  }
}
</script>