<template>
    <el-form-item :label="field.label">
            <e-icon-picker 
            :value="val" 
            @input="input"
            />
    </el-form-item>
</template>

<script>
export default {
  name: 'IconPickerPev',
  model:{
      prop:'val',
      event:'input'
  },
  props: {
     field:Object,
     val:[String,null],
  },
  methods:{
       input(value){
         this.$emit('input',value)
       }
  }
}
</script>
