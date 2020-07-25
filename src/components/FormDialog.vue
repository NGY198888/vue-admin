<template>
        <DialogView
         v-bind="$attrs" 
         v-on="$listeners"
         :needConfirm="needConfirm"
         ref="dialog"
        >
        <FormView 
        :fields="fields"
        :row="row"
        :key="key"
        />
        </DialogView>
</template>

<script>
import DialogView from './DialogView';
import FormView from './FormView';
// import DialogMixin from '@/mixins/DialogMixin';
export default {
  name: 'FormDialog',
  inheritAttrs: false,
  props: {
    //   fields:[Object],
    //   row:[Object,null],
  },
  components:{
   FormView,
   DialogView,
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
     }
  },
  computed:{
     key(){
          return JSON.stringify(this.row);
     }
  }
//   mixins:[DialogMixin]
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 

</style>
