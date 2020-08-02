<template>
   <div class="tabs_form_view">
       <el-tabs type="card">
            <el-tab-pane :label="tab.label" v-for="tab in tabs" :key="tab.label" >
                <Form 
                    :fields="tab.fields"
                    :row="row"
                    :style="{height:form_height,'overflow-y':'scroll'}"
                    class="tabs_form"
                     v-bind="$attrs" 
                     v-on="$listeners"
                />
            </el-tab-pane>
       </el-tabs>
   </div>
</template>

<script>
//表单编辑页
// import { mapState } from "vuex";
import Form from './Form';

export default {
  name: 'TabsFormView',
  props: {
    fields:[Object,Array,null],
    row:[Object,null],
    form_height:{
        type:[Number,String],
        require:false,
        default:388
    }
  },
  components:{
     Form
  },
  data () {
    return {
    }
  },
  methods:{
  
  },
  computed: {
    tabs(){
         let _tabs=[];
        //  let nowTab=null;
         let tab= {"fields":[],"label":"基本信息"};
         this.fields.forEach(field => {
             if(field.type=="tab"){
                 if(tab.fields.length>0){
                    _tabs.push(tab);
                 }
                tab= {"fields":[],"label":field.label};
             }else{
                tab.fields.push(field);
             }
         }); 
        if(tab.fields.length>0){
            _tabs.push(tab);
        } 
        return _tabs;
    },
    
  }
}
</script>
<style   scoped>
.tabs_form::-webkit-scrollbar{
    display:none;/*隐藏滚动条*/ 
}
</style>
