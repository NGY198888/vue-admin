<template>
    <el-form-item :label="field.name">
            <el-select :value="val" 
            :placeholder="field.name"
            clearable
            filterable
            multiple
            @change="change"
            >
            <el-option :label="kv.txt" :value="kv.val" v-for="kv in field.data" :key="kv.val"></el-option>
            </el-select>
    </el-form-item>
</template>

<script>
// import { mapState } from "vuex";
export default {
  name: 'MultSelectPev',
  model:{
      prop:'val',
      event:'change'
  },
  props: {
     field:Object,
     val:[Array,null]
  },
  methods:{
       change(value){
         this.$emit('change',value)
       }
  }
}
</script>