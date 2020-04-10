<template>
  <div class="video" @click="showControls">
    <video ref="rad_video" @canplay="getTotalTime" @timeupdate="timeUpdate">
      <source :src="src" />
    </video>
    <transition
      enter-active-class="animated fadeIn slow"
      leave-active-class="animated fadeOut slow"
    >
      <div class="controls" v-show="isShow" >
        <div class="con_left">
          <!-- 播放与暂停 -->
          <span :class="{'icon-play3':isPaused,'icon-pause2':!isPaused}" @click="togglePlay"></span>
          <!-- 停止 -->
          <span class="icon-stop2" @click="stopPlay"></span>
          <!-- 播放时间/总时长 -->
          <span>{{currentTime}}/{{totalTime}}</span>
        </div>
        <div class="con_right">
          <!-- 声音 -->
          <span
            :class="{'icon-volume-low':!isMuted,'icon-volume-mute2':isMuted}"
            @click="toggleMute"
          ></span>
          <!-- 全屏 -->
          <span class="icon-loop" @click="toggleFullScreen"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import "animate.css";
import '../styles/style.css'
export default {
  props: ["src"],
  data() {
    return {
      radVideo: null,
      isPaused: true,
      currentTime: 0,
      totalTime: 0,
      isMuted: false,
      isShow: true,
      showFlag: 0
    };
  },
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
  },
  methods: {
    togglePlay() {
      // video原生方法调用（播放、暂停）
      if (this.isPaused) {
        this.radVideo.play();
        this.isPaused = false;
      } else {
        this.radVideo.pause();
        this.isPaused = true;
      }
    },
    stopPlay() {
      // currentTime标记当前视频播放的时间
      this.isPaused = true;
      this.radVideo.currentTime = 0;
      this.radVideo.pause();
    },
    // 时间格式化方法
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
    timeUpdate() {
      this.currentTime = this.timeFormat(this.radVideo.currentTime);
    },
    toggleMute() {
      this.isMuted = !this.isMuted;
      this.radVideo.muted = !this.radVideo.muted;
    },
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
    },
    showControls() {
      // 显示控制面板
      this.isShow = true;
      // 重置时间标记
      this.showFlag = Date.now();
    }
  }
};
</script>

<style lang='less' scoped>
.video {
  position: relative;

  video {
    width: 100%;
    height: 100%;
  }

  .controls {
    width: 100%;
    height: 40px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      padding: 0 5px;
      color: #fff;
    }
  }
}
</style>