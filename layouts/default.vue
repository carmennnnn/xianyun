// 公共布局组件,该布局组件默认作用于所有页面

<template>
  <div>
    <!-- 引入头部公共样式 -->
    <Header/>
    <!-- 内容占位组件 -->
    <!-- <router-view></router-view> -->
    <nuxt />
    <!-- 引入页脚公共样式 -->
    <Footer/>
  </div>
</template>
<script>
// 导入头部组件，.vue文件扩展名可以省略
import Header from "@/components/header"
import Footer from "@/components/footer"

export default {
  components:{
    Header,
    Footer
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
/* 公共样式，不要加scoped */
*{
    margin:0;
    padding:0;
}

ul,li,ol{
    list-style:none;
}

a{
    color: inherit;
    text-decoration: none;
}

em,i{
    font-style: normal;
}
</style>
