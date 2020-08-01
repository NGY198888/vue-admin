<template>
    <el-form-item :label="field.label">
            <el-input :value="val" 
            :placeholder="field.placeholder"
            @input="input"
            clearable
            autocomplete
            :rows="field.rows?field.rows:2"
            :type="field.type"
            ></el-input>
    </el-form-item>
</template>

<script>
// import { mapState } from "vuex";
export default {
  name: 'TextPev',
  model:{
      prop:'val',
      event:'input'
  },
  props: {
     field:Object,
     val:[String,Number,Boolean,null],
  },
  methods:{
       input(value){
         this.$emit('input',value)
       }
  }
}
</script>
