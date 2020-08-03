export default {
    methods:{
        onOk(){
           this.$emit("onOk")
        },
        onCancel(){
            console.log(this.dataHadChange);
           if(this.needConfirm&&this.dataHadChange){
                this.$confirm('此操作将不保存修改的数据, 是否继续?', '提示',
                {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.closeDialog();
                    this.$emit("onCancel")
                }) 
            }else{
                this.closeDialog();
                this.$emit("onCancel")
            }
        },
        openDialog(){
            // console.log('openDialog');
           this.dialog_visible=true;
        },
        closeDialog(){
            // console.log('closeDialog');
           this.dialog_visible=false;
        },
        beforeClose(done){
           if(this.needConfirm&&this.dataHadChange){
               this.$confirm('此操作将不保存修改的数据, 是否继续?', '提示',
               {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
               }).then(() => {
                  this.$emit("onCancel")
                   done(); 
               }) 
           }else{
              this.$emit("onCancel")
              done(); 
           }
        }
     },
}