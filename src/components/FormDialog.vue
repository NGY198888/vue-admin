<template>
        <DialogView
        :top="top"
         v-bind="$attrs" 
         v-on="$listeners"
         :needConfirm="needConfirm"
         ref="dialog"
         :cont_height="calc_tabs_height"
         @onOk="onSubmit"
        >
       <!-- <FormView 
        :fields="fields"
        :row="row"
        :key="key"
        /> -->
        <TabsFormView
        :fields="fields"
        :row="row"
        :key="key"
        :form_height="form_height"
         v-bind="$attrs" 
         v-on="$listeners"
        />
        </DialogView>
</template>

<script>
import DialogView from './DialogView';
// import FormView from './FormView';
import TabsFormView from './TabsFormView';
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
//    FormView,
   DialogView,
   TabsFormView,
  },
  data () {
    return {
        fields:{},
        row:{},
        needConfirm:false,
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
        if(row){
            for (let index = 0; index < fields.length; index++) {
                // this.row.hasOwnProperty(this.fields[index].field) 此写法报错
                Object.prototype.hasOwnProperty.call(row, fields[index].field)&& (fields[index].val=row[fields[index].field])
            }
        }
        this.fields=fields
        this.row=row
     },
     onSubmit(){
        let form= _.reduce(this.fields,function(obj,field) {
          obj[field.field] = field.val
          return obj;
        },{});
          this.$emit('onSubmit',this.fields,this.row,form)
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
