<template>
  <table-pev
  :resource="resource"
  />
 
</template>

<script>
export default {
  name: 'TableView',
  props: {
 
  },
  data () {
    return { }
  },
  computed:{
    resource:(vm)=>{
       return  vm.$route.params.resource
    }
  }
}
</script>