

## radvideo

一个为vue所用的播放器组件。

闲来无事做个简单到爆的播放器组件，主要是学习下npm包的上传流程。

![](https://cdn.jsdelivr.net/gh/radoapx/rad-figure-bed/PicGo/radvideo/20200410211612.png)

### 安装

```bash
npm i radvideo -s
```

### 说明与使用

1.由于只是封装单个组件，所以不采用复杂的脚手架项目结构

2.案例中使用到了字体图标，来自于https://icomoon.io/

| props | 说明     |
| ----- | -------- |
| src   | 视频地址 |

### 示例

```vue
<template>
  <div class="app">
    欢迎使用rad-radVideo,此为测试环境
    <radvideo style="margin-left:40px;height:600px;width:1000px;"
      src="https://video.pearvideo.com/mp4/adshort/20200103/cont-1638717-14760593_adpkg-ad_hd.mp4"
    ></radvideo>
  </div>
</template>

<script>
import radvideo from 'radvideo';
import 'radvideo/dist/css/built.css'
//引入以上组件及样式即可
export default {
  components: {
    radvideo
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
```

### 基本功能实现

#### 播放与暂停

```js
togglePlay () {
    // video原生方法调用（播放、暂停）
    this.isPaused = !this.isPaused
    if (this.isPaused) {
  		this.radVideo.play();
  		this.isPaused = false;
	} else {
  		this.radVideo.pause();
  		this.isPaused = true;
	}
}
```

#### 停止播放

```js
stopPlay() {
  // currentTime标记当前视频播放的时间
  this.isPaused = true;
  this.radVideo.currentTime = 0;
  this.radVideo.pause();
}
```

#### 播放时间

> 下面说到了事件和属性都是视频标签的属性和事件
>
> ontimeupdate事件在视频进行播放的时候持续触发，我们可以监听这个事件，并在这个事件中获取视频的当前播放时间
>
> 这个事件是视频标签的事件
>
> currrentTime:可以获取到当前视频播放到的时间，以秒做为单位 
>
> duration:可以获取到视频的总时长，以秒做为单位
>
> 总时长可以在视频信息加载完毕之后(oncanplay)获取一次，但是当前播放时间需要在ontimeupdate事件中持续更新，当视频信息加载完毕之后，会自动的触发oncanplay事件

1. 定义变量

```js
// 当前播放时间
currentTime: '',
// 总时长
totalTime: ''
```

2. 实现播放时间的显示

```js
// 时间格式化方法，将时间变为12：23：45的形式
timeFormat(time) {
  let hour = Math.floor(time / 3600);
  let minute = Math.floor((time % 3600) / 60);
  let second = Math.floor(time % 60);
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  return `${hour}:${minute}:${second}`;
},
getTotalTime() {
  //获取总时长
  this.totalTime = this.timeFormat(this.radVideo.duration);
},
timeUpdate() {//将video原生属性的当前时间赋给vue变量
  this.currentTime = this.timeFormat(this.radVideo.currentTime);
},
```

#### 静音

> video本身就有一个muted属性来标记当前是否是静音状态，如果是静音状态，则muted值为true,否则为false,很明显我们可以根据这个属性值来进行样式的处理和功能的实现

```js
// 静音
toggleMute() {
  this.isMuted = !this.isMuted;
  this.radVideo.muted = !this.radVideo.muted;
}
```

#### 全屏和退出全屏

> 由于浏览器的兼容性问题，切换全屏会有兼容性，这里主要考虑webkit内核的浏览器
>
> 我们可以进行浏览器的能力测试，以达到全屏的效果
>
> 如果是全屏状态，就退出全屏，如果非全屏状态就进入到全屏

```js
toggleFullScreen(event) {
  // 如果当前是全屏状态，就退出全屏，否则进入全屏状态
  // 获取当前的全屏状态
  let isFullscreen = document.webkitIsFullScreen || document.fullscreen;
  if (!isFullscreen) {
    const inFull =
      this.radVideo.requestFullscreen ||
      this.radVideo.webkitRequestFullScreen;
    // 让当前整个播放器进入到全屏状态
    inFull.call(this.radVideo);
  } else {
    const exitFull =
      document.exitFullscreen || document.webkitExitFullscreen;
    // 退出全屏状态需要使用document
    exitFull.call(document);
  }
}
```

#### 为控制面板的显示和隐藏添加动画

> 这里使用过渡类名的方式来实现

1.引入animate.css

```js
import '@/styles/animate.css'
```

2.添加transition标签，并设置样式

```html
<transition
            enter-active-class="animated fadeIn slow"
            leave-active-class="animated fadeOut slow"
            >
    播放器...
</transition>
```

3.添加定时器，如果用户在指定时间类没有进行操作，则隐藏

```js
mounted() {
  this.radVideo = this.$refs.rad_video;
  this.showFlag = Date.now()
  setInterval(() => {
      // 如果超过指定的时候
      if (Date.now() - this.showFlag > 3000) {
          // 隐藏控制面板
          this.isShow = false
      }
  }, 800)
}
```

4.当用户单击整个视频区域的时候，让控制面板重新显示

```js
showControls() {
  // 显示控制面板
  this.isShow = true;
  // 重置时间标记
  this.showFlag = Date.now();
}
```
