import request from '@/utils/request';
export default {
    methods:{
        calcHeightx() {
            let tabWarp = window.document.getElementsByClassName('table-table');
            //通过原生方法，获取dom节点的高度------获取element-ui table表格body的元素
            let wapper = window.document.getElementsByClassName('el-table__body-wrapper');
            //通过原生方法，获取dom节点的高度------获取element-ui table表格header的元素
            let header = window.document.getElementsByClassName('el-table__header-wrapper');
            //必须加延时，要不然赋不上去值
            setTimeout(() => {
              //通过上边计算得到的table高度的value值，减去table表格的header高度，剩下的通过dom节点直接强行赋给table表格的body
              let  value=tabWarp[0].clientHeight;
              let head_h=header[0].clientHeight
              // console.log("calcHeightx",value,head_h,(value - head_h));
              wapper[0].style.height = (value - head_h) + 'px';
            }, 300)
        },
        sizeChange(pageSize){
          this.gridConfig.pageSize=pageSize
          this.query()
        },
        currentChange(current){
            this.gridConfig.page=current;
            this.query()
        },
        selectionChange(selection){
             this.selection=selection;
        },
        sortChange({prop, order }){
            let orderStr=order=="descending"?"desc":"asc"
            this.gridConfig.sortStr=`${prop} ${orderStr}`;
            this.gridConfig.page=1;
            this.query()
        },
        onSearch(fields){
            this.gridConfig.tableSearchFields=fields;
            this.query()
        },
        query(){
          if(this.remote){
                let query={
                    page:this.gridConfig.page,
                    perPage:this.gridConfig.pageSize,
                    sort:this.gridConfig.sortStr,
                    where:this.gridConfig.tableSearchFields,
                }
                request.get( `/${this.resource}`,{ params:{query:JSON.stringify(query)}}).then((rs)=>{
                    this.gridConfig.total=rs.data.total
                    //  this.gridConfig.pageSize=rs.data.perPage
                    this.gridConfig.page=rs.data.page
                    this.tableData= this.gridConfig.pidField? this.setTreeData(rs.data.data,this.gridConfig.key,this.gridConfig.pidField):rs.data.data
                        
                })
          }
        },
        /** 表格合计 */
        getSummaries(param){
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = '合计';
              return;
            }
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              // sums[index] += ' 元';
            } else {
              sums[index] = 'N/A';
            }
        });
        return sums;
        }
    },
    computed: {
        grid_conf_api(){
            return `/${this.resource}/grid`
        },
        grid_data_api(){
            return `/${this.resource}/index`
        },
        form_conf_api(){
            return `/${this.resource}/form`
        },
        view_conf_api(){
            return `/${this.resource}/view`
        }
        ,dialogKey:()=>{
                return `${ Math.ceil(Math.random()*25)}`
        }
        ,showSummary:(vm)=>{
            return vm.remote&&vm.gridConfig.showSummary
        }
    },
    created () {
        this.initView();
    },
    mounted(){
        window.addEventListener('resize', () => {
            this.calcHeightx();
        });
        this.calcHeightx();
    },
}