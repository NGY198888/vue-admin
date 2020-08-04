import _ from 'lodash';
export default {
    created() {
        this.throttledDataChange = _.throttle(this.dataChange, 5000)
    },
    methods:{
        setConf(fields,row){
            let _fields= _.cloneDeep(fields);
            if(row){
                for (let index = 0; index < _fields.length; index++) {
                    // this.row.hasOwnProperty(this.fields[index].field) 此写法报错
                    Object.prototype.hasOwnProperty.call(row, _fields[index].field)&& (_fields[index].val=row[_fields[index].field])
                }
            }
            this.fields=_fields
            this.row=row
         },
         getForm(fields){
            let form= _.reduce(fields,function(obj,field) {
              let val= field.val;
              switch(field.type){
                  case 'switch':
                    val=parseInt(val);
                  break;
              }
              obj[field.field] =val
              return obj;
            },{});
            return form;
         }
         ,dataChange(){
            this.dataHadChange=true
         },
         onCancel(){
           this.dataHadChange=false
         }
    }

}