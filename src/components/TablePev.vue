<template>
    <div class='table-v'
    :style="tableStyle">
        <!-- 搜索 -->
        <div class="table-search" style="width:100%;margin-bottom:8px;" v-if="gridConfig.pagination">
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
// import { mapState } from "vuex";
import TableSearch from '@/components/TableSearch';
import TablePagination from '@/components/TablePagination';
import TableBtn from '@/components/TableBtn';
// import DialogView from './DialogView';
import FormDialog from '@/components/FormDialog';

import request from '@/utils/request';
import   '@/styles/TableView.scss';
import _ from 'lodash';
import ColumnTpl from '@/components/tpl/ColumnTpl';
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
      },
      tableData:[],
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
          // console.log("calcHeightx",value,head_h,(value - head_h));
          wapper[0].style.height = (value - head_h) + 'px';
        }, 300)
    },
    sizeChange(pageSize){
      this.gridConfig.pageSize=pageSize
      this.query()
    },
     currentChange(current){
        this.gridConfig.page=current;
        this.query()
    },
    //双击行
    rowDblclick(row){
    //   console.log('rowDblclick');
       let btn= this.gridConfig.buttons.find(btn=>btn.action=='Show')
       if(btn)
           this.btnLogic(btn,row);
    },
    rowBtnClick(row,btn) {
      if(this.remote){
        this.getShowRow(row).then((showRow)=>{
            this.btnLogic(btn,showRow);
        })
      }else{
         this.btnLogic(btn,row);
      }
     
      
    },
    tableBtnClick(btn){
      this.btnLogic(btn,{});
    },
    btnLogic(btn,row){
    //   console.log(btn,row);
      this.now_btn=btn;
      if(btn.actionType=='FORM'){
          btn.action=='Show'? this.$refs['dialogKey'].setConf(this.gridConfig.viewFields,row):this.$refs['dialogKey'].setConf(this.getFormFields(),row);
          this.$refs['dialogKey'].openDialog();
      }else{
           this.submitAPI(btn,row)
      }
    },
    onFormSubmit(fields,row,form){
      //  console.log('onFormSubmit',this.now_btn,fields,row,form);
        if(this.remote){
            if(this.now_btn.action=='Add'){
            
                request.post( `/${this.resource}/`,form).then(()=>{
                    this.$message.success('添加成功');
                    this.query()
                })
            }else if(this.now_btn.action=='Edit'){
                request.put( `/${this.resource}/${row[this.gridConfig.key]}`,form).then(()=>{
                    this.$message.success('修改成功');
                    this.query()
                })
            }
            else{
                form= Object.assign(form,{fields,row})
                request.post( `/${this.resource}/${this.now_btn.commit_url}`,form).then(()=>{
                    this.query()
                })
            }
         }else{
            // console.log('row_new');
           let value= _.cloneDeep(this.value)||[]
           switch(this.now_btn.action){
              case 'Add':
                value.push(form)
                break;
              case 'Edit':
                //不能直接修改引用，因为this.value是props，只能由外部改变
                value=this.change_row(value,row,form);
                break;
           }
            this.emitChange(value);
         }
       this.$refs['dialogKey'].closeDialog();
    },
    change_row(value,row,form){
        let new_row={};
        const row_json= JSON.stringify(row)
        Object.assign(new_row,row)
        Object.assign(new_row,form)
        return _.map(value,function(el){
            return (JSON.stringify(el)==row_json) ? new_row : el;
        })
    },
    selectionChange(selection){
         this.selection=selection;
    },
    submitAPI(btn,row){
      if(this.remote){
          let  id=row?row[this.gridConfig.key]:''
          if(btn.confirmTips){
            this.$confirm(btn.confirmTips, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if(btn.action=='Delete'){
                if(btn.isMultSelect){
                  let key=this.gridConfig.key
                  let ids= _.map(this.selection,function(el){
                      return el[key];
                  })
                   request.post(`/${this.resource}/deleteAll`,{ids}).then(()=>{
                      this.$message.success('删除成功');
                      this.query()
                  })
                }else{
                  request.delete( `/${this.resource}/${id}`).then(()=>{
                    this.$message.success('删除成功');
                    this.query()
                  })
                }
              }else{
                  let query={
                    id:id,
                    where:this.gridConfig.tableSearchFields,
                  }
                  request.post( `/${this.resource}/${btn.commit_url}`,{ params:{query:JSON.stringify(query)}}).then(()=>{
                      this.query()
                  })
              }
            })
          }
      }else{
        console.log('Delete');
        let value= _.cloneDeep(this.value)
           switch(this.now_btn.action){
              // case 'Add':
              //   this.tableData.push(row)
              //   break;
              case 'Delete':
                _.remove(value, function(n) {
                  return JSON.stringify(n)==JSON.stringify(row)
                });
                break;
           }
           this.emitChange(value);
      }
    
    },
    initView(){
       request.get(this.grid_conf_api).then((rs)=>{
           this.gridConfig=Object.assign(this.gridConfig,rs.data)
           if(!this.remote){
               this.gridConfig.pagination=false
           }
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
    getFormFields(){
       if(!this.now_btn.ui_url){
          return this.gridConfig.formFields;
       }else{
          request.get( `/${this.resource}/${this.now_btn.ui_url}`).then((rs)=>{
              return rs.data;  
          })
       }
    },
    query(){
      if(this.remote){
            let query={
                page:this.gridConfig.page,
                perPage:this.gridConfig.pageSizes,
                sort:this.gridConfig.sortStr,
                where:this.gridConfig.tableSearchFields,
            }
            request.get( `/${this.resource}`,{ params:{query:JSON.stringify(query)}}).then((rs)=>{
                this.gridConfig.total=rs.data.total
                //  this.gridConfig.pageSize=rs.data.perPage
                this.gridConfig.page=rs.data.page
                this.tableData=rs.data.data
                    
            })
      }
    },
    emitChange(value){
        this.$emit('change',value);
    },
    getShowRow(row){
      return  new Promise((resolve)=>{
        request.get(`/${this.resource}/${row[this.gridConfig.key]}`).then((rs)=>{
              resolve(rs.data);  
        })
      })
    }
  },
  computed: {
    // mixData:(vm)=>{
    //   console.log('mixData',vm.value);
    //     return vm.value?vm.value:vm.tableData
    // },
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
    },
    row_buttons_length:(vm)=>{
       return vm.row_buttons.length*90
    }
    ,dialogKey:()=>{
          return `${ Math.ceil(Math.random()*25)}`
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