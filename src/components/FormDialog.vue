<template>
        <Dialog
        :dataHadChange="dataHadChange"
        :top="top"
         v-bind="$attrs" 
         v-on="$listeners"
         :needConfirm="needConfirm"
         ref="dialog"
         :cont_height="calc_tabs_height"
         @onOk="onSubmit"
         @onCancel="onCancel"
        >
          <!-- <Form
          :fields="fields"
          :row="row"
          :key="key"
          /> -->
          <TabsForm
          :fields="fields"
          :row="row"
          :key="key"
          :form_height="form_height"
          v-bind="$attrs" 
          v-on="$listeners"
          @dataChange='dataChange'
          />
        </Dialog>
</template>

<script>
import Dialog from './Dialog';
// import Form from './Form';
import TabsForm from './TabsForm';
import _ from 'lodash';
export default {
  name: 'FormDialog',
  inheritAttrs: false,
  props: {
      height:{
        type:[Number,String],
        require:false,
        default:500
      }
    //   fields:[Object],
    //   row:[Object,null],
  },
  components:{
//    Form,
   Dialog,
   TabsForm,
  },
  data () {
    return {
        fields:{},
        row:{},
        needConfirm:true,
        dataHadChange:false,
    }
  },
  methods:{
     openDialog(){
        this.$refs.dialog.openDialog();
     },
     closeDialog(){
        this.$refs.dialog.closeDialog();
     },
     setConf(fields,row){
        let _fields= _.cloneDeep(fields);
        if(row){
            for (let index = 0; index < _fields.length; index++) {
                // this.row.hasOwnProperty(this.fields[index].field) 此写法报错
                Object.prototype.hasOwnProperty.call(row, _fields[index].field)&& (_fields[index].val=row[_fields[index].field])
            }
        }
        this.fields=_fields
        this.row=row
     },
     onSubmit(){
          let after_form= this.getForm(this.fields)
          this.$emit('onSubmit',this.fields,this.row,after_form)
     },
     getForm(fields){
        let form= _.reduce(fields,function(obj,field) {
          let val= field.val;
          switch(field.type){
              case 'switch':
                val=parseInt(val);
              break;
          }
          obj[field.field] =val
          return obj;
        },{});
        return form;
     }
     ,dataChange(){
        this.dataHadChange=true
     },
     onCancel(){
       this.dataHadChange=false
     }
  },
  computed:{
     key(){
          return JSON.stringify(this.row);
     },
      calc_tabs_height:(vm)=>{
          let _height=isNaN(vm.height)?vm.height:vm.height+"px";
          return `calc(${_height} - 112px)`
      },
      form_height:(vm)=>{
          let _height=isNaN(vm.height)?vm.height:vm.height+"px";
          return `calc(${_height} - 112px - 72px)`
      },
      top:(vm)=>{
          let _height=isNaN(vm.height)?vm.height:vm.height+"px";
          return `calc( (95vh - ${_height} ) / 2 )`
      },
  }
//   mixins:[DialogMixin]
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 

</style>
