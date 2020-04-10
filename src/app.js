import App from './App.vue'

import Vue from 'vue'
import './styles/style.css'
// - 渲染：Vue实例
new Vue({
  // 指定渲染的组件最终填充到那个位置
  el: '#app',
  // 添加渲染函数
  // render函数可以实现组件的渲染，它本身是一个函数，函数有一个回调函数h,这个h是 真正的能够渲染的函数
  render: (h) => {
    // h(你想渲染的组件)
    // 我们只需要将渲染结构来返回，Vue实例就会将这个结果填充到指定的位置
    return h(App)
  },
})
