<template>
   <div></div>
</template>

<script>
import { mapMutations } from "vuex";
import types from '@/store/types';
export default {
  name: 'LogoutView',
  props: {
 
  },
  components:{
   
  },
  data () {
    return {
     
    }
  },
  methods:{
     ...mapMutations([types.auth_clean_token,types.site_close_all_tab])
  },
  mounted () {
     this[types.site_close_all_tab]();
     this[types.auth_clean_token]();
    //   this.$router.replace('/login');
  }
  
}
</script>
