<template>
    <el-dialog 
    class="dialog"
     append-to-body
     :top="top"
     :width="width?width:'50%'"
     :visible.sync="dialog_visible"
     :before-close="beforeClose"
     >
        <div slot="title" >{{title}}</div>
        <div :style="{height:cont_height,'overflow-y':'hidden'}" class="dialog_view_content">
           <slot></slot>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="onCancel">{{cancelTxt?cancelTxt:(disabled?'关 闭':'取 消')}}</el-button>
            <el-button type="primary" @click="onOk" v-show="!disabled">{{okTxt?okTxt:'确 定'}}</el-button>
        </div>
    </el-dialog>
</template>

<script>
import DialogMixin from '@/mixins/DialogMixin';
import   '@/styles/DialogView.scss';
export default {
  name: 'Dialog',
  inheritAttrs:false,
  props: {
      disabled:[Boolean,null],
      title:String,
      width:[String,Number,null],
      cancelTxt:[String,null],
      okTxt:[String,null],
      needConfirm:[Boolean,null],
      top:{
        type:[String],
        require:false,
        default:"15vh"
      },
      cont_height:{
        type:[Number,String],
        require:false,
        default:500
      }
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
      // content_height:(vm)=>{
      //     vm.height=isNaN(vm.height)?vm.height:vm.height+"px";
      //     return `${vm.height} - 112px`
      // },
      //  calc_content_height:(vm)=>{ 
      //     return `calc(${vm.content_height})`
      // }
  },
  mixins:[DialogMixin]
}
</script>