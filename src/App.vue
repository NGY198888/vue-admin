<template>
  <div id="app">
     <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import LocalStore from '@/utils/LocalStore';

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  created () {
    //读取vuex
    if(LocalStore.get("state",null)){
        this.$store.replaceState(Object.assign({},this.$store.state,LocalStore.get("state",null)));
    }
    //保存vuex
    window.addEventListener('beforeunload',()=>{
        LocalStore.set("state",this.$store.state);
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
