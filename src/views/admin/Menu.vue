<template>
    <el-menu class="menu">
        <template v-for="menu in menus"  >
            <!-- 一级，有字节点 -->
                <el-submenu :index="menu.name" :key="menu.name" v-if="menu.children">
                    <template slot="title"><i class="el-icon-message"></i>{{menu.name}}</template>
                        <template v-for="menu2 in menu.children" >
                            <!-- 二级，有子节点 -->
                        <el-submenu :index="menu2.name" :key="menu2.name" v-if="menu2.children">
                            <template slot="title"><i class="el-icon-message"></i>{{menu2.name}}</template>
                                <!-- 三级，直接渲染，不往下细分了 -->
                                <el-menu-item :index="menu3.name" :key="menu3.name" v-for="menu3 in menu2.children"  >
                                    <template slot="title"><i class="el-icon-message"></i>{{menu3.name}}</template>
                                </el-menu-item>
                        
                        </el-submenu>
                            <!-- 二级，没有子节点 -->
                        <el-menu-item :index="menu2.name" :key="menu2.name"  v-else>
                            <template slot="title"><i class="el-icon-message"></i>{{menu2.name}}</template>
                        </el-menu-item>
                    </template>
                </el-submenu>
                <!-- 一级没有子节点 -->
                <el-menu-item :index="menu.name" :key="menu.name"  v-else>
                        <template slot="title"><i class="el-icon-message"></i>{{menu.name}}</template>
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
     ...mapActions([types.site_feth_site])
  },
  computed: {
    ...mapState({
        menus:state=>state.site.menu
    })
    
  }
}
</script>
