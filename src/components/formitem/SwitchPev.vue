<template>
    <el-form-item :label="field.label">
           <el-switch
            :value="val"
            @change="change"
            active-value=1
            inactive-value=0
            active-color="#13ce66"
            inactive-color="#ff4949">
            </el-switch>
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
     val:[String,Number,Boolean,null],
  },
  methods:{
       change(value){
         console.log(value);
         this.$emit('change',value)
       }
  }
}
</script>
