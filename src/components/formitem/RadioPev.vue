<template>
    <el-form-item :label="field.label">
             <el-radio-group 
             :fill="field.color?field.color:'#409EFF'"
             v-model="inner_val"
             @change="change" >
                 <el-radio  :label="kv.id" v-for="kv in field.data" :key="kv.id">{{kv.txt}}</el-radio>
             </el-radio-group>
    </el-form-item>
</template>

<script>
// import { mapState } from "vuex";
export default {
  name: 'RadioPev',
  model:{
      prop:'val',
      event:'change'
  },
  data(){
    return {
      inner_val:this.val||null
    }
  },
  props: {
     field:Object,
     val:[String,Number,Boolean,null],
  },
  methods:{
       change(value){
         this.$emit('change',value)
       }
  }
}
</script>
