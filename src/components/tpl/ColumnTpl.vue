<template>
<div>
    <el-tag
    :type="tagType"
    disable-transitions
    v-if="tpl=='Tag'"
    >{{label}}</el-tag>
    <span v-else>
      {{label}}
    </span>
</div>
  
</template>


<script>
import _ from 'lodash';
export default {
  name: 'ColumnTpl',
  props: {
     scope:Object,
     tpl:[String,null],
     tplRules:[Object,Array,null],
     valDic:[Object,Array,null],
  },
  created(){
     
  },
  mounted(){
    console.log('scope',this.scope.column.property,this.scope.row);
  },
  components:{
   
  },
  data () {
    return {
     
    }
  },
  methods:{
  
  },
  computed: {
    field:(vm)=>{
         return vm.scope.column.property
    }
    ,label:(vm)=>{
        let val= vm.scope.row[vm.field]
         let mach=false;
         if(_.isArray(vm.valDic)&&vm.valDic.length>0){
           let findrs= vm.valDic.find(item=>item.id==val)
           if(findrs){
              val=findrs.txt;
            }else {
              let nullrs= vm.valDic.find(item=>item.id=='null')
                if(nullrs){
                   val=nullrs.txt;
                }
            }
         }else if(vm.valDic){
             for (const key in vm.valDic) {
               let vol = vm.valDic[key];
               if(key==val){
                  val=vol;
                  mach=true;
                  break;
               }
             }
             if(!mach&& Object.prototype.hasOwnProperty.call(vm.valDic, 'null')){
                  val=vm.valDic['null'];
             }
         }
         return val;
    },
    tagType:(vm)=>{
           if(vm.tplRules){
               for (const key in vm.tplRules) {
                   const rule = vm.tplRules[key];
                   if(rule&&(rule==vm.label||(_.isArray(rule)&&rule.find(item=>item==vm.label))) ){
                      return key;
                   }
               }
           }
           return null;
    }
  }
}
</script>
