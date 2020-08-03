<template>
    <el-form-item :label="field.label" v-if="field.show_label">
        <table-pev 
            :resource="field.resource"
            :height="field.height"
            :value="val"
            :key="key"
            :remote=false
            @change="change"
             />    
    </el-form-item>
    <table-pev  v-else
    :resource="field.resource"
    :height="field.height"
    :value="val"
    :key="key"
    :remote=false
    @change="change"
    /> 
</template>

<script>
import PevMixin from '@/mixins/PevMixin';
export default {
  name: 'Table1ToNPev',
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
        this.throttledDataChange()
         this.$emit('change',JSON.parse(JSON.stringify(value)))
       }
  },
  computed: {
      key:(vm)=>{
          return `${ Math.ceil(Math.random()*5)}${vm.field.resource}`
      }
  },
  mixins:[PevMixin]
}
</script>