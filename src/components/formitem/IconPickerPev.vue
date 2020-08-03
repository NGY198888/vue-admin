<template>
    <el-form-item :label="field.label">
            <e-icon-picker 
            :value="val" 
            @input="input"
            />
    </el-form-item>
</template>

<script>
import PevMixin from '@/mixins/PevMixin';
export default {
  name: 'IconPickerPev',
  model:{
      prop:'val',
      event:'change'
  },
  props: {
     field:Object,
     val:[String,null],
  },
  methods:{
       input(value){
         this.throttledDataChange()
         this.$emit('change',value)
       }
  },
  mixins:[PevMixin]
}
</script>
