<template>
    <div class='table-v'>
        <div class="table-search" style="width:100%;margin-bottom:8px;">
            <table-search
            :fields="gridConfig.tableSearchFields"
            @onSearch="onSearch"
             />
        </div>
         <TableBtn :table_buttons="table_buttons" />
        <el-table :data="tableData"
        class='table-table'
        border
        height="1000"
        style="width: 100%"
        @sort-change="sortChange"
        >
            <el-table-column
              type="selection"
              v-if="gridConfig.multCheck"
              width="55">
            </el-table-column>
            <el-table-column 
            :prop="field.field" 
            :label="field.label" 
            :sortable="field.sortable?'custom':false"
            :width="field.width?field.width:140" 
            v-for="field in  gridConfig.tableFields" 
            :key="field.field">
            </el-table-column>
            <el-table-column label="操作" v-if="row_buttons&&row_buttons.length>0">
              <template slot-scope="scope">
                <el-button size="mini"
                 @click="rowBtnClick(scope.row,btn.action)" 
                 :icon="btn.icon?btn.icon:''"
                  v-for="btn in row_buttons" :key="btn.action">{{btn.name}}</el-button>
              </template>
            </el-table-column>
        </el-table>
       <div class="table-pagination">
       <table-pagination
       :total="gridConfig.total"
       :pageSize="gridConfig.pageSize"
       :pageSizes="gridConfig.pageSizes"
       @sizeChange="sizeChange"
       @currentChange="currentChange"
        /></div>
        <!-- <DialogView
        title="test"
        :needConfirm="true"
        ref="dialog"
        >
111111111
        </DialogView> -->

        <FormDialog
        title="去去"
        :needConfirm="true"
        ref="dialog2"
        :height="600"
        > </FormDialog>
    </div>
 
</template>

<script>
// import { mapState } from "vuex";
import TableSearch from './TableSearch';
import TablePagination from './TablePagination';
import TableBtn from './TableBtn';
// import DialogView from './DialogView';
import FormDialog from './FormDialog';

import request from '@/utils/request';
import   '@/styles/TableView.scss';
import _ from 'lodash';
export default {
  name: 'TableView',
  props: {
 
  },
  components:{
    TableSearch,
    TablePagination,
    TableBtn,
    // DialogView,
    FormDialog,
  },
  data () {
    return {
      now_action:null,
      gridConfig:{
        sortStr:null,
        multCheck:false,
        total:0,
        pageSize:20,
        pageSizes:[20,40,100,500,100000],
        page:1,
        tableSearchFields:[],
        tableFields:[],
        formFields:[],
        viewFields:[],
        buttons:[],
        table:'',
        pagination:true,
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
    calcHeightx() {
        let tabWarp = window.document.getElementsByClassName('table-table');
        
        
        //通过原生方法，获取dom节点的高度------获取element-ui table表格body的元素
        let wapper = window.document.getElementsByClassName('el-table__body-wrapper');
        //通过原生方法，获取dom节点的高度------获取element-ui table表格header的元素
        let header = window.document.getElementsByClassName('el-table__header-wrapper');
        //必须加延时，要不然赋不上去值
        setTimeout(() => {
          //通过上边计算得到的table高度的value值，减去table表格的header高度，剩下的通过dom节点直接强行赋给table表格的body
          let  value=tabWarp[0].clientHeight;
          let head_h=header[0].clientHeight
          console.log("calcHeightx",value,head_h,(value - head_h));
          wapper[0].style.height = (value - head_h) + 'px';
        }, 300)
    },
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
       this.$refs.dialog2.setConf(this.gridConfig.formFields,row);
      this.$refs.dialog2.openDialog();
      console.log(row,action);
    },
    initView(){
       request.get(this.grid_conf_api).then((rs)=>{
           this.gridConfig=Object.assign(this.gridConfig,rs.data)
           this.query()
       })
    },
    sortChange({prop, order }){
        let orderStr=order=="descending"?"desc":"asc"
        this.gridConfig.sortStr=`${prop} ${orderStr}`;
        this.gridConfig.page=1;
        this.query()
    },
    onSearch(fields){
        this.gridConfig.tableSearchFields=fields;
        this.query()
    },
    query(){
      let query={
        page:this.gridConfig.page,
        perPage:this.gridConfig.pageSizes,
        sort:this.gridConfig.sortStr,
        where:this.gridConfig.tableSearchFields,
      }
      request.get( `/${this.resource}`,{ params:{query:JSON.stringify(query)}}).then((rs)=>{
           this.gridConfig.total=rs.data.total
           this.gridConfig.pageSize=rs.data.perPage
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
    table_buttons:(vm)=>{
      return  _.filter(vm.gridConfig.buttons, ['position', 'Table']);
    },
    row_buttons:(vm)=>{
      return  _.filter(vm.gridConfig.buttons, ['position', 'Row']);
    }
  },
  created () {
    this.initView();
  },
  mounted(){
    window.addEventListener('resize', () => {
      this.calcHeightx();
    });
    this.calcHeightx();
  }
}
</script>