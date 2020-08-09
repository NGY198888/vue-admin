import _ from 'lodash';
import request from '@/utils/request';
export default {
    
    methods:{
      
       
        
        //双击行
        rowDblclick(row){
          this.row=row;
        //   console.log('rowDblclick');
           let btn= this.gridConfig.buttons.find(btn=>btn.action=='Show')
           if(btn)
               this.rowBtnClick(row,btn);
        },
        rowBtnClick(row,btn) {
          this.row=row;
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
          this.now_btn=btn;
          if(btn.actionType=='FORM'){
              btn.action=='Show'? this.$refs['dialogKey'].setConf(this.gridConfig.viewFields,row)
              :this.$refs['dialogKey'].setConf(this.getFormFields(),row);
              this.$refs['dialogKey'].openDialog();
          }else{
              this.remote? this.submitAPI(btn,row):this.submitLocal(row)
          }
        },
        newPostPrams(){
            let  id=this.row?this.row[this.gridConfig.key]:''
            let prams={
              row:this.row,
              where:this.gridConfig.tableSearchFields,
              id:id,
              ids:this.getCheckedIds()
            }
            return prams;
        },
        getCheckedIds(){
            let key=this.gridConfig.key
            let  ids= _.map(this.selection,function(el){
                return el[key];
            })
            return ids;
        },
        onFormSubmit(fields,row,form){
          //  console.log('onFormSubmit',this.now_btn,fields,row,form);
            if(this.remote){
                  if(this.now_btn.commit_url)
                  {
                    let prams= this.newPostPrams()
                    prams.form=prams,
                    request.post( `/custom/${this.resource}/${this.now_btn.commit_url}`,prams).then(()=>{
                        this.$message.success('操作成功');
                        this.query()
                    })
                }
                else if(this.now_btn.action=='Add'){
                
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
             }else{
                this.submitLocal(row,fields,form)
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
        submitLocal(row,fields,form){
            let value= _.cloneDeep(this.value||[])
            switch(this.now_btn.action){
                case 'Add':
                value.push(form)
                break;
              case 'Edit':
                //不能直接修改引用，因为this.value是props，只能由外部改变
                value=this.change_row(value,row,form);
                break;
              case 'Delete':
                this.deleteLocal(this.now_btn,value,row)
                break;
            }
            this.emitChange(value);
        },
        submitAPI(btn,row){
          if(btn.confirmTips){
            this.$confirm(btn.confirmTips, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.submitAPIConfirm(btn,row)
            })
          }else{
              this.submitAPIConfirm(btn,row)
          }
        },
        submitAPIConfirm(btn,row){
          
          if(btn.commit_url){
            let prams= this.newPostPrams()
            request.post(`/custom/${this.resource}/${btn.commit_url}`,prams).then(()=>{
                  this.$message.success('操作成功');
                  this.query()
            })
          }
          else if(btn.action=='Delete'){
              let  id=row?row[this.gridConfig.key]:''
              btn.isMultSelect?
              request.post(`/${this.resource}/deleteAll`,{ids:this.getCheckedIds()}).then(()=>{
                this.$message.success('删除成功');
                this.query()
              })
              : request.delete( `/${this.resource}/${id}`).then(()=>{
                  this.$message.success('删除成功');
                  this.query()
              })
          }
        },
        deleteLocal(btn,value,row){
          let selection=this.selection
          if(btn.isMultSelect){
             _.remove(value, function(n) {
               return selection.find(s=>JSON.stringify(n)==JSON.stringify(s))
            });
          }else{
            _.remove(value, function(n) {
              return JSON.stringify(n)==JSON.stringify(row)
            });
          }
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
        getShowRow(row){
        return  new Promise((resolve)=>{
            request.get(`/${this.resource}/${row[this.gridConfig.key]}`).then((rs)=>{
                resolve(rs.data);  
            })
        })
        },
    },
    computed: {
        table_buttons:(vm)=>{
            return  _.filter(vm.gridConfig.buttons, ['position', 'Table']);
        },
        row_buttons:(vm)=>{
            return  _.filter(vm.gridConfig.buttons, ['position', 'Row']);
        },
        row_buttons_length:(vm)=>{
            return vm.row_buttons.length*90
        }
       
    },
}