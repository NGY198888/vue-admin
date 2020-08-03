<template>
    <el-form-item :label="field.label">
           <el-switch
            :value="val"
            @change="change"
            active-color="#13ce66"
            inactive-color="#ff4949">
            </el-switch>
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
     val:[String,Number,Boolean,null],
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
