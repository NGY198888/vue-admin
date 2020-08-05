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
              <el-dropdown-item :icon="dd.icon" :command="dd.command" v-for=" dd in dropdownArr" :key="dd.command">{{dd.name}}</el-dropdown-item>
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
import { mapState,mapMutations } from "vuex";
import types from '@/store/types';
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
        dropdownArr:[
          {
            name:'账号设置',
            command:'settingUser',
            icon:'el-icon-user-solid',
            route:'/form/users'
          }

        ]
    }
  },
  methods:{
      ...mapMutations([types.site_add_tab]),
      handleCommand(command) {
           if(command=='logout'){
              this.$router.push("/logout");
           }else{
              let dd= this.dropdownArr.find(item=>item.command==command)
              this[types.site_add_tab]({tab:{
                    name:dd.name,
                    route:dd.route
              }});
              this.$router.push(dd.route);
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
