<template>
    <el-form-item :label="field.label">
            <mavon-editor
            :value="val" 
            ref="md"
            @change="change"
            @imgAdd='imgAdd'
            @imgDel="imgDel"
            @imageFilter="imageFilter"
            :placeholder="field.placeholder"
            ></mavon-editor>
    </el-form-item>
</template>

<script>
import PevMixin from '@/mixins/PevMixin';
import {mavonEditor} from 'mavon-editor';
import request from '@/utils/request';
import  'mavon-editor/dist/css/index.css';
export default {
  name: 'MarkDownPev',
  components:{
    mavonEditor
  },
  model:{
      prop:'val',
      event:'change'
  },
  props: {
     field:Object,
     val:[String,null],
  },
  methods:{
       change(value){
         this.throttledDataChange()
         this.$emit('change',value)
       },
       imgAdd(pos, file){
         var formData=new  FormData();
           formData.append('file',file)
           request.post("/upload",formData).then(res=>{
               this.$refs.md.$img2Url(pos,res.data.url)
           })
       },
       imageFilter(){
           //图片过滤函数，参数为一个File Object，要求返回一个Boolean, true表示文件合法，false表示文件不合法
           return true;
       },
       imgDel(filename){
          console.log('图片删除',filename);
       }
  },
  mixins:[PevMixin]
}
</script>
