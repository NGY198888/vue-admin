<template>
    <el-form-item :label="field.label">
            <el-color-picker 
             :value="val"
             @change="change"
             show-alpha></el-color-picker>
    </el-form-item>
</template>

<script>
import PevMixin from '@/mixins/PevMixin';
export default {
  name: 'SwitchPev',
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
       }
  },
  mixins:[PevMixin]
}
</script>
