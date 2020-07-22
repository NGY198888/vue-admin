<template>
   <el-container class="admin_view">
    <el-aside width="200px">
      
    </el-aside>
    <el-container>
      <el-header class="header">
          <span style="margin-right: 15px">王小虎</span>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          
      </el-header>
      <el-main class="main">
        <el-card shadow="hover" class="table_warp">
          <el-tabs
           type="card"
           closable
          >
            <el-tab-pane>
              <span slot="label"><i class="el-icon-date"></i> 我的行程</span>
               <TableView />
            </el-tab-pane>
            <el-tab-pane label="消息中心">消息中心</el-tab-pane>
          </el-tabs>
        </el-card>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
</el-container>
</template>

<script>
// import { mapState } from "vuex";
import TableView from '@/components/TableView';
import   '@/styles/admin.scss';
export default {
  name: 'AdminView',
  props: {
 
  },
  components:{
   TableView,
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 

</style>
