<template>
    <div class="web_view">
        <iframe :src="url" 
        id="mobsf" 
        scrolling="no"
         frameborder="0" 
        class="web_iframe"
        :key="onresizeTimes"
         ></iframe>
    </div>
</template>
<script>
    export default {
        name: 'WebView',
        data () {
            return {
                onresizeTimes:0
            }
        },
        computed:{
            url(){
               return   this.$route.params.resource.replace(/ngy2020/g,"/");
            }
        },
        mounted(){
            window.onresize = function(){
                this.onresizeTimes++;
            }
        }
    }
</script>
<style  scoped>
 .web_view ,.web_iframe{
     height: 100%;
     width: 100%;
 }
</style>
