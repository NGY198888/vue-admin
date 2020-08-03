import _ from 'lodash';
export default {
    created() {
        this.throttledDataChange = _.throttle(this.dataChange, 5000)
    },
    methods:{
        dataChange(){
            console.log('数据变动');
            this.$emit('dataChange')
        }
    }

}