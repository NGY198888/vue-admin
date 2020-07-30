<template>
    <el-form-item :label="field.label">
            <el-select :value="val" 
            :placeholder="field.placeholder"
            clearable
            filterable
            @change="change"
            >
            <el-option :label="kv.txt" :value="kv.id" v-for="kv in field.data" :key="kv.id"></el-option>
            </el-select>
    </el-form-item>
</template>

<script>
// import { mapState } from "vuex";
export default {
  name: 'SelectPev',
  model:{
      prop:'val',
      event:'change'
  },
  props: {
     field:Object,
     val:[String,Number,Boolean,null]
  },
  methods:{
       change(value){
         this.$emit('change',value)
       }
  }
}
</script>