<template>
<div>
        <el-tabs
            v-show="tabs.length>0"
            v-model="$route.name" 
            type="card" 
            @edit="handleTabsEdit"
            @tab-click="tabClick"
            closable
            >
            <el-tab-pane
                :key="tab.route"
                v-for="tab in tabs"
                :label="tab.name"
                :name="tab.route"></el-tab-pane>
        </el-tabs>
         <router-view></router-view>
</div>
    
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import types from '@/store/types';
// import { mapState } from "vuex";
export default {
  name: 'TabsView',
  props: {
 
  },
  components:{
   
  },
  data () {
    return {
       
    }
  },
  methods:{
      ...mapMutations([types.site_close_tab]),
      handleTabsEdit(targetName) {
         this[types.site_close_tab]({route:targetName});
      },
      tabClick(tab){
         this.$router.push(tab.name);
      }
  },
  computed: {
      ...mapState({
          tabs:state=>state.site.tabs
      })
  }
}
</script>
