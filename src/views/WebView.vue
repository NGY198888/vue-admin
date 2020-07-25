<template>
    <div class="web_view">
        <iframe :src="url" 
        id="mobsf" 
        scrolling="no"
         frameborder="0" 
        class="web_iframe"
         ></iframe>
    </div>
</template>
<script>
    export default {
        name: 'WebView',
        data () {
            return {
            }
        },
        computed:{
            url(){
               return   this.$route.params.resource.replace(/ngy2020/g,"/");
            }
        },
        mounted(){
            /**
            * iframe-宽高自适应显示   
            */
            function changeMobsfIframe(){
                const mobsf = document.getElementById('mobsf');
                const deviceWidth = document.body.clientWidth;
                const deviceHeight = document.body.clientHeight;
                mobsf.style.width = (Number(deviceWidth)-240) + 'px'; //数字是页面布局宽度差值
                mobsf.style.height = (Number(deviceHeight)-64) + 'px'; //数字是页面布局高度差
            }
            //changeMobsfIframe()
            window.onresize = function(){
                changeMobsfIframe()
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
