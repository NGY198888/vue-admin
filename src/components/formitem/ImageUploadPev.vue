<template>
    <el-form-item :label="field.label">
            <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :action="upLoadUrl"
            :on-remove="change"
            :multiple=false
            :on-change="change"
            :on-exceed="handleExceed"
            :headers="headers">
            <img v-if="val.url" :src="val.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
      
      beforeUpload(file) {
          let fileTypeOk=true;
          if(this.field.fileType){
            let _find=  this.field.fileType.find(item=>item==file.type)
            fileTypeOk=_find?true:false;
          }
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!fileTypeOk) {
          this.$message.error(`当前设置不支持${file.type}格式!`);
        }
        console.log(file.type);
        if (!isLt2M) {
          this.$message.error('上传大小不能超过 2MB!');
        }
        //return isJPG && isLt2M;
        return fileTypeOk&&isLt2M;
      },
    




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
<style  scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>