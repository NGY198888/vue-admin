<template>
   <el-container class="admin_view">
    <el-aside width="250px" class="aside">
      <div class="site_name">
        <img :src="BASE_URL+'favicon.ico'" style="margin-right:8px;" />
        管理系统
        </div>
      <Menu />
    </el-aside>
    <el-container>
      <el-header class="header">
          <span style="margin-right: 50px">{{user.username}}</span>
          <el-dropdown @command="handleCommand">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user-solid" command="settingUser">账号设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-eleme" command="logout">退出系统</el-dropdown-item>
              <!-- <el-dropdown-item>删除</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
          
      </el-header>
      <el-main class="main">
        <el-card shadow="hover" class="table_warp">
          <TabsView></TabsView>
        </el-card>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
</el-container>
</template>

<script>
import { mapState } from "vuex";
// import TableView from '@/components/TableView';
import Menu from './admin/Menu';
import TabsView from './TabsView';
import   '@/styles/admin.scss';
export default {
  name: 'AdminView',
  props: {
 
  },
  components:{
  //  TableView,
   Menu,
   TabsView,
  },
  data () {
    return {
     
    }
  },
  methods:{
      handleCommand(command) {
           switch(command){
             case "settingUser":
               this.$router.push("/form/user.setting");
               break;
             case "logout":
               this.$router.push("/logout");
               break;
           }
      }
  },
  computed: {
     ...mapState({
        user:state=>state.user.user
     }),
     BASE_URL(){
         return process.env.BASE_URL
     }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 

</style>
