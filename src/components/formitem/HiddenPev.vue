<template>
    <el-form-item :label="field.label" class="hidden-pev" >
           {{val}}
    </el-form-item>
</template>

<script>
import PevMixin from '@/mixins/PevMixin';
export default {
  name: 'HiddenPev',
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
<style   scoped>
.hidden-pev{
    display: none;
}
</style>