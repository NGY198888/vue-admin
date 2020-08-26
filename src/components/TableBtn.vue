<template>
   <div class="table_btn">
        <div  v-for="btn in table_buttons" :key="btn.action">
            <template v-if="btn.action=='Import'">
              <el-popover
                placement="top"
                width="160"
                v-model="import_visible">
                <p>1、下载导入模板</p>
                <p>2、选择文件导入</p>
                <div style="text-align: center; margin: 10px auto">
                  <!-- <el-button size="mini" type="success" @click="import_visible = false">导入</el-button> -->
                  <el-upload
                  style="display: inline-block;margin-right: 10px;"
                  :multiple=false
                  :action="upLoadUrl"
                  :headers="headers"
                  :on-success="onSuccess"
                  :on-progress="onProgress"
                  :show-file-list="false"
                  :file-list="fileList"
                  :key="key"
                  ref="upload"
                  :limit="1">
                  <el-button size="mini" type="success" @click="import_visible = false">导入</el-button>
                  </el-upload>
                  <el-button  type="primary" size="mini" @click="importTpl()">模板</el-button>
                </div>
                <el-button  
                size="mini"  
                class="btn"
                :type="btn.color"
                :icon="btn.icon?btn.icon:''"
                 slot="reference"
                 @click="newKey">{{btn.name}}</el-button>
              </el-popover>
            </template>
           <template v-else>
              <el-button size="mini"
                @click="tableBtnClick(btn)" 
                class="btn"
                :type="btn.color"
                :icon="btn.icon?btn.icon:''"
              >{{btn.name}}</el-button>
          </template>
        </div>
        <!-- <el-button size="mini"
        @click="tableBtnClick(btn)" 
        class="btn"
        :type="btn.color"
        :icon="btn.icon?btn.icon:''"
        v-for="btn in table_buttons" :key="btn.action">{{btn.name}}</el-button> -->
   </div>
</template>

<script>
// import { mapState } from "vuex";
import  store from "@/store";
import  types from "@/store/types";
export default {
  name: 'TableBtn',
  props: {
     table_buttons:[Array,null]
  },
  components:{
   
  },
  data () {
    return {
       import_visible:false,
        headers:{Authorization:'Bearer ' + store.state.auth.token},
        upLoadUrl: process.env.VUE_APP_UPLOAD_URL,
        fileList:[],
        key:Math.ceil(Math.random()*5),
    }
  },
  methods:{
       tableBtnClick(btn){
          this.$emit("tableBtnClick",btn);
       }
       ,importTpl(){
          this.import_visible=false;
          let btn={
            action:'importTpl'
          }
          this.$emit("tableBtnClick",btn);
       }
       ,onSuccess(){
           store.commit(types.STOP_LOADING)
           this.$message.success("导入成功");
           this.$refs.upload.clearFiles();
       }
       ,onProgress(){
           store.commit(types.START_LOADING)
       }
       ,newKey(){
         this.key=Math.ceil(Math.random()*5);
       }
  },
  computed: {
   
  }
}
</script>
<style  scoped>
    .table_btn{
        width: calc(100% - 40px);
        display: flex;
        flex-direction: row;
        justify-content:flex-start;
        align-items: center;
        margin:10px 10px 8px 30px;
    }
    .btn{
        margin-right: 10px;
    }
</style>
