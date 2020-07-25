<template>
<div style="display: inline-block;">
    <el-form-item :label="field.label" class="field_item">
            <el-rate
            :value="val"
            @change="change"
            :max="field.max?field.max:5"
            :allow-half="field.allowHalf"
            :icon-classes="iconClasses"
            void-icon-class="icon-rate-face-off"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
    </el-form-item>
</div>

</template>
//这个控件icon-rate-face等图标样式依赖@/assets/fonts/style.css
<script>
// import { mapState } from "vuex";
export default {
  name: 'SwitchPev',
  model:{
      prop:'val',
      event:'change'
  },
  data(){
    return{
        iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'] 
    }
  },
  props: {
     field:Object,
     val:[Number,null],
  },
  methods:{
       change(value){
         this.$emit('change',value)
       }
  }
}
</script>
<style  scoped>
 .field_item{
   display:flex;
   flex-direction:row;
   justify-content :center;
   align-items :center;
 }
</style>
