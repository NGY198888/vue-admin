<template>
    <el-form-item :label="field.label">
            <el-upload
            class="upload-demo"
            :action="upLoadUrl"
            :before-remove="beforeRemove"
            :on-remove="change"
            :multiple=false
            :on-change="change"
            :on-exceed="handleExceed"
            :limit="1"
            :headers="headers"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
    </el-form-item>
</template>

<script>
import PevMixin from '@/mixins/PevMixin';
import  store from "@/store";
export default {
  name: 'UploadPev',
  model:{
      prop:'val',
      event:'change'
  },
  props: {
     field:Object,
     val:[Object,null],
  },
   data() {
       console.log(process.env);
      return {
         headers:{Authorization:'Bearer ' + store.state.auth.token},
         upLoadUrl: process.env.VUE_APP_UPLOAD_URL,
         fileList:(this.val?[this.val]: [])
      };
    },
    methods: {
      handleExceed() {
        this.$message.error(`请先移除已上传的文件，再尝试`);
      },
      beforeRemove(file) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      change(file,fileList){
        this.throttledDataChange()
        if(fileList&&fileList.length>0){
            let rs=fileList[0].response?fileList[0].response:fileList[0];
            this.$emit('change', rs)
        }else{
            this.$emit('change',null)
        }
      }
    },
  mixins:[PevMixin]
 
}
</script>
