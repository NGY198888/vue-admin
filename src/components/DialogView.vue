<template>
    <el-dialog 
     append-to-body
     :width="width?width:'50%'"
     :title="title"
     :visible.sync="dialog_visible"
     :before-close="beforeClose"
     >
        <slot></slot>
        <div slot="footer" class="dialog-footer">
            <el-button @click="onCancel">{{cancelTxt?cancelTxt:'取 消'}}</el-button>
            <el-button type="primary" @click="onOk">{{okTxt?okTxt:'确 定'}}</el-button>
        </div>
    </el-dialog>
</template>

<script>
import DialogMixin from '@/mixins/DialogMixin';
export default {
  name: 'DialogView',
  inheritAttrs:false,
  props: {
      title:String,
      width:[String,Number,null],
      cancelTxt:[String,null],
      okTxt:[String,null],
      needConfirm:[Boolean,null],
  },
  components:{
    
  },
  data () {
    return {
      dialog_visible:false,
    }
  },
//   methods:{
//      onOk(){
//         this.$emit("onOk")
//      },
//      onCancel(){
//         this.$emit("onCancel")
//      },
//      openDialog(){
//         this.dialog_visible=true;
//      },
//      closeDialog(){
//         this.dialog_visible=false;
//      },
//      beforeClose(done){
//         if(this.needConfirm){
//             this.$confirm('此操作将不保存修改的数据, 是否继续?', '提示',
//             {
//             confirmButtonText: '确定',
//             cancelButtonText: '取消',
//             type: 'warning'
//             }).then(() => {
//                 done(); 
//             }) 
//         }else{
//            done(); 
//         }
//      }
//   },
  computed: {
    
  },
  mixins:[DialogMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
.dialog-footer{
  text-align: center;
}
</style>
