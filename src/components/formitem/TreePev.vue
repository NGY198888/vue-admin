<template>
    <el-form-item :label="field.label">
        <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :default-checked-keys="val"
        :default-expand-all="true"
        @check="check"
        :props="defaultProps">
        </el-tree>   
    </el-form-item>
</template>

<script>
import PevMixin from '@/mixins/PevMixin';
import TreeMixin from '@/mixins/TreeMixin';
import _ from 'lodash';
export default {
  name: 'TreePev',
  model:{
      prop:'val',
      event:'change'
  },
  props: {
     field:Object,
     val:[Array,null],
  },
  data(){
      return {
          defaultProps: {
            children: 'children',
            label: 'name'
          }
      }
  },
  methods:{
       check(row,checkedObj){
         this.throttledDataChange()
         this.$emit('change',checkedObj.checkedKeys)
       }
  },
  computed:{
     data:(vm)=>{
        return vm.setTreeData(vm.field.data);
     },
     checkedids:(vm)=>{
        let checkedArr=  _.filter(vm.field.data, { 'checked': true });
        let ids= _.map(checkedArr, item=>item.id);
        return ids;
     }
  },
  mixins:[PevMixin,TreeMixin]
}
</script>
