// hmvideo 插件对应组件的名字
import radvideo from './video.vue'
import '../styles/style.css'
// 为Vue.js 的插件添加一个公开的方法install，这个方法用来实现以后的组件引入和注册
// 它一般可以有两个参数，特别需要注意的是：第一个参数是 Vue 构造器
// 此处注意，组件需要添加name属性，代表注册的组件名称,名称可以自定义
radvideo.install = Vue => Vue.component('radvideo', radvideo) //注册组件

//下面的代码的作用是：支持使用标签的方式引入，当Vue是全局变量时，自动install
if (typeof window !== 'undefined' && window.Vue) {
  radvideo.install(window.Vue)
}

export default radvideo
