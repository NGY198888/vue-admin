<template>
    <el-form-item :label="field.label">
            <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="onCheckedAll">全选</el-checkbox>
            <div style="margin: 15px 0;"></div> -->
            <el-checkbox-group v-model="inner_val" 
            @change="change"
            >
            <el-checkbox v-for="v in field.data" :label="v" :key="v"  >{{v}}</el-checkbox>
            </el-checkbox-group>
    </el-form-item>
</template>

<script>
//适用于data是['111','222','333']，即元素不是kv键值对的这种类型
import PevMixin from '@/mixins/PevMixin';
export default {
  name: 'CheckboxGroupPev',
  model:{
      prop:'val',
      event:'change'
  },
  props: {
     field:Object,
     val:[Array,null]
  },
  data(){
      return {
          checkAll:false,
          inner_val:this.val||[]
      }
  },
  methods:{
       change(value){
         this.throttledDataChange()
         this.$emit('change',value)
         return value;
       },
       onCheckedAll(value) {
         this.inner_val=[];
         return value;
      }
  },
  mixins:[PevMixin]
}
</script>