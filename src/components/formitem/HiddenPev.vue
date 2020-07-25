<template>
    <el-form-item :label="field.label" class="hidden-pev" >
           {{val}}
    </el-form-item>
</template>

<script>
// import { mapState } from "vuex";
export default {
  name: 'HiddenPev',
  model:{
      prop:'val',
      event:'input'
  },
  props: {
     field:Object,
     val:[String,Number,Boolean,null],
  },
  methods:{
       change(value){
         this.$emit('input',value)
       }
  }
}
</script>
<style   scoped>
.hidden-pev{
    display: none;
}
</style>