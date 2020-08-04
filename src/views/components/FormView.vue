<template>
<el-card class="form_warp">
    <div class="btns">
        <el-button type="warning" @click="onReset" >重 置</el-button>
        <el-button type="primary" @click="onSave"  >保 存</el-button>
    </div>
    <Form 
        :fields="fields"
        :row="row"
        class="scroll_y form"
    />
</el-card>
</template>

<script>
import Form from '@/components/Form';
import request from '@/utils/request';
import FormMixin from '@/mixins/FormMixin';
import   '@/styles/common.scss';
export default {
  name: 'FormView',
  props: { },
  components:{
    Form,
  },
  data () {
    return {
     fields:[],
     row:{},
     form_height:'600px',
    }
  },
  created(){
     this.init()
  },
  methods:{
      init(){
          this.fethForm().then(data=>{
              this.setConf(data.fields,data.row)
          })
      },
      fethForm(){
        return  new Promise((resolve)=>{
            request.get(this.form_url).then((rs)=>{
                resolve(rs.data);  
            })
        })   
      },
      onReset(){
          console.log('onReset');
         this.init()
      },
      onSave(){
            let form= this.getForm(this.fields)
            request.post(this.form_save_url,form).then(()=>{
                this.$message.success('设置成功');
            })   
      }

  },
  computed: {
     form_url:(vm)=>{
          return `/form/${vm.$route.params.resource}`
     },
     form_save_url:(vm)=>{
          return `/form/save/${vm.$route.params.resource}`
     }
  },
  mixins:[FormMixin]
}
</script>
<style   scoped>
.form_warp{
    padding:20px;
    height:calc(100vh - 220px) ;
}
.btns{
    height: 60px;
    line-height: 40px;
}
.form{
     height: calc(100% - 110px );
}
</style>