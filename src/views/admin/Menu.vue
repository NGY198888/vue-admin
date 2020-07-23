<template>
    <el-menu 
    class="menu"
    @select="select"
    @open="open"
    >
        <template v-for="menu in menus"  >
            <!-- 一级，有字节点 -->
                <el-submenu :index="menu.url?menu.url:menu.name" :key="menu.name" v-if="menu.children">
                    <template slot="title"><i :class="menu.icon?menu.icon:'el-icon-circle-plus-outline'"></i>{{menu.name}}</template>
                        <template v-for="menu2 in menu.children" >
                            <!-- 二级，有子节点 -->
                        <el-submenu :index="menu2.url?menu2.url:menu2.name" :key="menu2.name" v-if="menu2.children">
                            <template slot="title"><i :class="menu2.icon?menu2.icon:'el-icon-circle-plus-outline'"></i>{{menu2.name}}</template>
                                <!-- 三级，直接渲染，不往下细分了 -->
                                <el-menu-item :index="menu3.url" :key="menu3.name" v-for="menu3 in menu2.children"  >
                                    <template slot="title"><i :class="menu3.icon?menu3.icon:'el-icon-collection-tag'"></i>{{menu3.name}}</template>
                                </el-menu-item>
                        
                        </el-submenu>
                            <!-- 二级，没有子节点 -->
                        <el-menu-item :index="menu2.url" :key="menu2.name"  v-else>
                            <template slot="title"><i :class="menu2.icon?menu2.icon:'el-icon-collection-tag'"></i>{{menu2.name}}</template>
                        </el-menu-item>
                    </template>
                </el-submenu>
                <!-- 一级没有子节点 -->
                <el-menu-item :index="menu.url" :key="menu.name"  v-else>
                        <template slot="title"><i :class="menu.icon?menu.icon:'el-icon-link'"></i>{{menu.name}}</template>
                </el-menu-item>
        </template>
    </el-menu>
</template>

<script>
import { mapState,mapActions } from "vuex";
import types from '@/store/types';
import '@/styles/admin/menu.scss';
export default {
  name: 'Menu',
  props: {
 
  },
  components:{
   
  },
  mounted () {
     this[types.site_feth_site]();
  },
  methods:{
     ...mapActions([types.site_feth_site]),
     select(index){
        this.pathJump(index)
     },
     open(index){
        this.pathJump(index)
     },
     pathJump(url){
      let rs=  this.checkIfPath(url)
      if(rs['is_abs_path']){
          let _url=url.replace(/\//g,"ngy2020")//替换网址的 / 字符，不然路由匹配出错
          this.$router.push(`/webview/${_url}`)
      }else if(rs['is_path']){
          this.$router.push(url)
      }
     },
     checkIfPath(url){
          let rs=[];
          rs['is_path']=false
          rs['is_abs_path']=false//是否为完整路径
          if(url&&url.includes('/')){
              //是路径
               rs['is_path']=true
              if(url.toLowerCase().indexOf("http://") ==0||url.toLowerCase().indexOf("https://") ==0) {
                    rs['is_abs_path']=true;
              }
          }
          return rs;
     }
  },
  computed: {
    ...mapState({
        menus:state=>state.site.menu
  })
    
  }
}
</script>
