<template>
    <el-form-item :label="field.label">
            <el-select :value="val" 
            :placeholder="field.name"
            clearable
            filterable
            multiple
            @change="change"
            >
            <el-option :label="kv.txt" :value="kv.id" v-for="kv in field.data" :key="kv.id"></el-option>
            </el-select>
    </el-form-item>
</template>

<script>
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