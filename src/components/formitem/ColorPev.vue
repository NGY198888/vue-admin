<template>
    <el-form-item :label="field.name">
            <el-color-picker 
             :value="val"
             @change="change"
             show-alpha></el-color-picker>
    </el-form-item>
</template>

<script>
// import { mapState } from "vuex";
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
         this.$emit('change',value)
       }
  }
}
</script>
