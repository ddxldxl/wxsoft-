// components/classic/music/index.js
import {
  classicBeh
} from "../classic-beh.js"

const audioManager = wx.getBackgroundAudioManager()

Component({
  /**
   * behavior行为
   */
  behaviors: [classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    audioSrc: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playStatus: false, 
    pauseSrc: "images/player@pause.png",
    playSrc: "images/player@play.png"
  },
  attached:function(){
    this._recoverPlayStatus()
    this._monitorSwitch()
  },
  detached:function(){
    // audioManager.pause()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 音乐播放
     */
    onPlay: function() {
      if (!this.data.playStatus) {
        this.setData({
          playStatus: true
        })
        audioManager.src = this.properties.audioSrc
        audioManager.title = this.properties.title
      }else {
        this.setData({
          playStatus: false
        })
        audioManager.pause()
      }
    },
    /**
     * 判断音乐是否在播放以及播放按钮
     */
    _recoverPlayStatus:function(){
      //音乐不在播放，显示播放键
      if (audioManager.paused){
        this.setData({
          playStatus:false
        })
        return
      }
      //音乐在播放，显示暂停键
      if (audioManager.src == this.properties.audioSrc){
        this.setData({
          playStatus: true
        })
      }
    },
    /**
     * 音乐总控制面板操作
     */
    _monitorSwitch:function(){
      audioManager.onPlay(()=>{
        this._recoverPlayStatus()
      })
      audioManager.onPause(() => {
        this._recoverPlayStatus()
      })
      audioManager.onStop(() => {
        this._recoverPlayStatus()
      })
      audioManager.onEnded(() => {
        this._recoverPlayStatus()
      })
    }
  }
})