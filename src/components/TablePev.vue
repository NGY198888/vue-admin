<template>
    <div class='table-v'
    :style="tableStyle">
        <!-- 搜索 -->
        <div class="table-search" style="width:100%;margin-bottom:8px;" v-if="gridConfig.tableSearchFields.length>0">
            <table-search
            :fields="gridConfig.tableSearchFields"
            @onSearch="onSearch"
             />
        </div>
        <!-- 表格上方按钮 -->
         <TableBtn 
         @tableBtnClick="tableBtnClick"
         :table_buttons="table_buttons"
          />
          <!-- 表格 -->
        <el-table :data="remote?tableData:value"
        class='table-table'
         @row-dblclick="rowDblclick"
         @selection-change="selectionChange"
         @summary-method="getSummaries"
        :show-summary="showSummary"
        :row-key="gridConfig.key"
        border
        height="1000"
        style="width: 100%"
        size="small"
        @sort-change="sortChange"
        >
            <el-table-column
              type="selection"
              v-if="gridConfig.multSelect"
              width="55">
            </el-table-column>
            <el-table-column 
            :prop="field.field" 
            :label="field.label" 
            :sortable="field.sortable?'custom':false"
            :min-width="field.width?field.width:140" 
            v-for="field in  gridConfig.tableFields" 
            :key="field.field">
            <template slot-scope="scope">
                <ColumnTpl 
                :scope="scope" 
                :tpl="field.tpl" 
                 :tplRules="field.tplRules" 
                 :valDic="field.valDic"
                 />
            </template>
            </el-table-column>
            <el-table-column label="操作"
            :min-width="row_buttons_length" 
             v-if="row_buttons&&row_buttons.length>0">
              <template slot-scope="scope">
                <el-button 
                  size="mini"
                  :type="btn.color"
                  @click="rowBtnClick(scope.row,btn)" 
                  :icon="btn.icon?btn.icon:''"
                  v-for="btn in row_buttons" 
                  :key="btn.action">{{btn.name}}</el-button>
              </template>
            </el-table-column>
        </el-table>
        <!-- 底部分页 -->
       <div class="table-pagination" v-if="gridConfig.pagination">
       <table-pagination
       :total="gridConfig.total"
       :pageSize="gridConfig.pageSize"
       :pageSizes="gridConfig.pageSizes"
       @sizeChange="sizeChange"
       @currentChange="currentChange"
        /></div>
        <!-- 对话框 -->
        <FormDialog
        :title="now_btn.form_title"
        :disabled="now_btn.form_disabled"
        :needConfirm="true"
        :key="dialogKey"
        ref="dialogKey"
        :height="now_btn.form_height"
        @onSubmit="onFormSubmit"
        > </FormDialog>
    </div>
 
</template>

<script>
import TableSearch from '@/components/TableSearch';
import TablePagination from '@/components/TablePagination';
import TableBtn from '@/components/TableBtn';
import FormDialog from '@/components/FormDialog';
import ColumnTpl from '@/components/tpl/ColumnTpl';

import request from '@/utils/request';
import   '@/styles/TableView.scss';
import TableBtnMixin from '@/mixins/TableBtnMixin';
import TableCommMixin from '@/mixins/TableCommMixin';

// import _ from 'lodash';
export default {
  name: 'table-pev',
  props: {
      resource:String,
      value:{
        type:[Array,null],
        default: function () {
          return []
        },
        required:false,
      } ,
      //   是否远程读写数据
      remote:{
        type:Boolean,
        default: function () {
          return true
        },
      },
      height:{
        type:[Number,null],
        default: function () {
            return null
        },
      }
  },
  components:{
    TableSearch,
    TablePagination,
    TableBtn,
    // DialogView,
    FormDialog,
    ColumnTpl,
  },
  data () {
    let tableStyle={};
    if(this.height){
      tableStyle.height=this.height+'px'
    }
    return {
      selection:[],
      tableStyle:tableStyle,
      selected_row:[],
      row:null,
      now_btn:{},
      gridConfig:{
        sortStr:null,
        multSelect:false,
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
        key:'id',
        pagination:true,
        pidField:null,
        lazy:false
      },
      tableData:[],
    }
  },
  methods:{
    initView(){
       request.get(this.grid_conf_api).then((rs)=>{
           this.gridConfig=Object.assign(this.gridConfig,rs.data)
           if(!this.remote){
               this.gridConfig.pagination=false
           }
           this.query()
       })
    },
    emitChange(value){
        this.$emit('change',value);
    },
    
  },
  computed: {
   
  },
  created () {
    
  },
  mounted(){
   
  },
  mixins:[TableBtnMixin,TableCommMixin]
}
</script>