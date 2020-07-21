<template>
    <el-form :inline="true"  class="table-tool-form">
       <template  v-for="field in fields" >
           <text-pev :field="field" v-model="field.val"  :key="field.field" v-if="field.type=='text'" />
           <SelectPev :field="field" v-model="field.val" :key="field.field" v-else-if="field.type=='select'" /> 
           <MultSelectPev :field="field" v-model="field.val" :key="field.field"  v-else-if="field.type=='mult_select'"  /> 
           <DateTimePev :field="field" v-model="field.val" :key="field.field" v-else-if="['year','month','date','week','datetime','datetimerange','daterange','dates'].includes(field.type)"  /> 
           <SwitchPev :field="field" v-model="field.val" :key="field.field"  v-else-if="['switch','bool'].includes(field.type)"  /> 
           <CheckboxGroupPev :field="field" v-model="field.val" :key="field.field"  v-else-if="field.type=='check_group'"  /> 
       </template> 
        
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
// import { mapState } from "vuex";
import TextPev from './formitem/TextPev';
import SelectPev from './formitem/SelectPev';
import MultSelectPev from './formitem/MultSelectPev';
import DateTimePev from './formitem/DateTimePev';
import SwitchPev from './formitem/SwitchPev';
import CheckboxGroupPev from './formitem/CheckboxGroupPev';
export default {
  name: 'TableSearch',
  props: {
    //  fields:Array
  },
  components:{
     TextPev,
     SelectPev,
     MultSelectPev,
     DateTimePev,
     SwitchPev,
     CheckboxGroupPev,
  },
  data () {
    return {
     
      form:{},
      fields:[
        // {
        //   name:'测试',
        //   type:'text',
        //   val:'111',
        //   field:'test'
        // },
        // {
        //   name:'测试2',
        //   type:'select',
        //   field:'test2',
        //   val:'a',
        //   data:[
        //     {
        //      val:'a',
        //      txt:'1'
        //     },
        //     {
        //      val:'a2',
        //      txt:'12'
        //     },
        //     {
        //      val:'a3',
        //      txt:'13'
        //     },
        //     {
        //      val:'a4',
        //      txt:'15'
        //     },
        //   ],
        // },
         {
          name:'测试3',
          type:'mult_select',
          field:'test3',
          val:['a','a2'],
          data:[
            {
             val:'a',
             txt:'1'
            },
            {
             val:'a2',
             txt:'12'
            },
            {
             val:'a3',
             txt:'13'
            },
            {
             val:'a4',
             txt:'15'
            },
          ],
        },
        //时间控件
         {
          name:'测试',
          type:'dates',
          field:'t1'
        },
        {
          name:'测试2',
          type:'date',
          field:'t2'
        },
        {
          name:'测试3',
          type:'week',
          field:'t3'
        },
        {
          name:'测试4',
          type:'daterange',
          field:'t4'
        },
         {
          name:'测试5',
          type:'datetime',
          field:'t5'
        },
         {
          name:'测试45',
          type:'datetimerange',
          field:'t45'
        },
        {
          name:'测试5',
          type:'switch',
          field:'t5'
        },
        {
          name:'测试3',
          type:'check_group',
          field:'test3',
          val:['111'],
          data:['111','222','333']
        }
      ]

    }
  },
  methods:{
    onSubmit(){
      console.log('onSearch',this.fields);
        this.$emit("onSearch",this.fields);
    }
  },
  computed: {
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .table-tool-form{
       text-align: left;
  }
</style>
