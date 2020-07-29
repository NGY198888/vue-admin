<template>
   <div>
      <el-form 
       :inline="inline?inline:false" 
       @submit.native.prevent
       :disabled="disabled"
       class="table-tool-form" 
       label-width="150px" 
       label-position="left">
       <template  v-for="field in fields" >
           <text-pev :field="field" v-model="field.val"  :key="field.field" v-if="['password','number','text','textarea' ].includes(field.type)" />
           <ColorPev :field="field" v-model="field.val" :key="field.field" v-else-if="field.type=='color'" /> 
           <RatePev :field="field" v-model="field.val" :key="field.field" v-else-if="field.type=='rate'" /> 
           <RadioPev :field="field" v-model="field.val" :key="field.field" v-else-if="field.type=='radio'" /> 
           <UploadPev :field="field" v-model="field.val" :key="field.field" v-else-if="field.type=='file'" /> 
           <SelectPev :field="field" v-model="field.val" :key="field.field" v-else-if="field.type=='select'" /> 
           <HiddenPev :field="field" v-model="field.val" :key="field.field" v-else-if="field.type=='hidden'" /> 
           <MultSelectPev :field="field" v-model="field.val" :key="field.field"  v-else-if="field.type=='mult_select'"  /> 
           <DateTimePev :field="field" v-model="field.val" :key="field.field" v-else-if="['year','month','date','week','datetime','datetimerange','daterange','dates'].includes(field.type)"  /> 
           <SwitchPev :field="field" v-model="field.val" :key="field.field"  v-else-if="['switch','bool'].includes(field.type)"  /> 
           <CheckboxGroupPev :field="field" v-model="field.val" :key="field.field"  v-else-if="field.type=='check_group'"  /> 
       </template> 
    </el-form>
   </div>
</template>

<script>
//表单编辑页
// import { mapState } from "vuex";
import TextPev from './formitem/TextPev';
import SelectPev from './formitem/SelectPev';
import MultSelectPev from './formitem/MultSelectPev';
import DateTimePev from './formitem/DateTimePev';
import SwitchPev from './formitem/SwitchPev';
import CheckboxGroupPev from './formitem/CheckboxGroupPev';
import ColorPev from './formitem/ColorPev';
import RatePev from './formitem/RatePev';
import RadioPev from './formitem/RadioPev';
import UploadPev from './formitem/UploadPev';
import HiddenPev from './formitem/HiddenPev';
export default {
  name: 'FormView',
  props: {
    disabled:[Boolean,null],
    fields:[Object,Array,null],
    row:[Object,null],
    inline:[Boolean,null],//行内模式，该模式使组件横向布局
  },
  components:{
     TextPev,
     SelectPev,
     MultSelectPev,
     DateTimePev,
     SwitchPev,
     CheckboxGroupPev,
     ColorPev,
     RatePev,
     RadioPev,
     UploadPev,
     HiddenPev,
  },
  data () {
    return {
    }
  },
  methods:{
  
  },
  computed: {
    
  }
}
</script>
