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
         return vm.scope.row[vm.field]
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
