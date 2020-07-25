<template>
    <el-form-item :label="field.label">
        <el-date-picker
        :type="field.type"
        v-model="inner_val"
        clearable
        @change="change"
        :placeholder="field.placeholder||'选择日期时间'"
        ></el-date-picker>   
    </el-form-item>
</template>

<script>
//year/month/date/week/ datetime/datetimerange/daterange
// import { mapState } from "vuex";
export default {
  name: 'DateTimePev',
  model:{
      prop:'val',
      event:'change'
  },
  props: {
     field:Object,
     val:[Array,Date,String,null],//date(DateTimePicker) / array(DateTimeRangePicker)
  },
  methods:{
       change(date){
         let datetime="";
         if(date instanceof Array){
            datetime=[];
            date.forEach(d => {
                datetime.push(this.timeStamp2String(d));
            });
         }else{
            datetime=this.timeStamp2String(date)
         }
         this.$emit('change',datetime)
         return date;
       },
         timeStamp2String(datetime){  
             if(!datetime)
                  return datetime;
            var year = datetime.getFullYear();  
            var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;  
            var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();  
            var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();  
            var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();  
            var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();  
            return year + "-" + month + "-" + date
                +" "+hour+":"+minute+":"+second;  
        },
        // getChinaDate(date) {  
        //     var t = Date.parse(date);  
        //     if (!isNaN(t)) {  
        //         return new Date(Date.parse(date.replace(/-/g, "/")));  
        //     } else {  
        //         return new Date();  
        //     }
        // }
  },
  data(){
      return{
          inner_val:this.val||''
      }
  }
}
</script>
