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
           <text-pev v-on="$listeners" :field="field" v-model="field.val"  :key="field.field" v-if="['password','number','text','textarea' ].includes(field.type)" />
           <ColorPev v-on="$listeners" :field="field" v-model="field.val" :key="field.field" v-else-if="field.type=='color'" /> 
           <RatePev  v-on="$listeners" :field="field" v-model="field.val" :key="field.field" v-else-if="field.type=='rate'" /> 
           <RadioPev v-on="$listeners" :field="field" v-model="field.val" :key="field.field" v-else-if="field.type=='radio'" /> 
           <UploadPev v-on="$listeners" :field="field" v-model="field.val" :key="field.field" v-else-if="field.type=='file'" /> 
           <ImageUploadPev v-on="$listeners" :field="field" v-model="field.val" :key="field.field" v-else-if="field.type=='image'" /> 
           <SelectPev v-on="$listeners" :field="field" v-model="field.val" :key="field.field" v-else-if="field.type=='select'" /> 
           <IconPickerPev v-on="$listeners" :field="field" v-model="field.val" :key="field.field" v-else-if="field.type=='icon_select'" /> 
           <HiddenPev v-on="$listeners" :field="field" v-model="field.val" :key="field.field" v-else-if="field.type=='hidden'" /> 
            <TreePev v-on="$listeners" :field="field" v-model="field.val" :key="field.field" v-else-if="field.type=='tree'" /> 
           <MultSelectPev v-on="$listeners" :field="field" v-model="field.val" :key="field.field"  v-else-if="field.type=='mult_select'"  /> 
           <Table1ToNPev v-on="$listeners" :field="field" v-model="field.val" :key="field.field"  v-else-if="field.type=='table_1_to_n'"  /> 
           <DateTimePev v-on="$listeners" :field="field" v-model="field.val" :key="field.field" v-else-if="['year','month','date','week','datetime','datetimerange','daterange','dates'].includes(field.type)"  /> 
           <SwitchPev v-on="$listeners" :field="field" v-model="field.val" :key="field.field"  v-else-if="['switch','bool'].includes(field.type)"  /> 
           <CheckboxGroupPev v-on="$listeners" :field="field" v-model="field.val" :key="field.field"  v-else-if="field.type=='check_group'"  /> 
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
import ImageUploadPev from './formitem/ImageUploadPev';
import HiddenPev from './formitem/HiddenPev';
import IconPickerPev from './formitem/IconPickerPev';
import Table1ToNPev from './formitem/Table1ToNPev';
import TreePev from './formitem/TreePev';

export default {
  name: 'Form',
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
     ImageUploadPev,
     HiddenPev,
     IconPickerPev,
     Table1ToNPev,
     TreePev,
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
