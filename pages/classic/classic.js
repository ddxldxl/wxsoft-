// pages/classic/classic.js
import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'

let classicM = new ClassicModel()
let likeM = new LikeModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount:0,
    likeStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classicM.getLatest((res) => {
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  onLike: function(event) {
    likeM.like(event.detail.behavior, this.data.classic.id, this.data.classic.type)
  },

  //下一期内容
  onNext: function() {
    this._updateClassic("next")
  },
  //上一期内容
  onPrevious: function() {
    this._updateClassic("previous")
  },

  _updateClassic: function(nextOrprevious) {
    let index = this.data.classic.index
    classicM.getCLassic(index, nextOrprevious, (res) => {
      this._updateLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        latest: classicM.isLatest(res.index),
        first: classicM.isFirst(res.index)
      })
    })
  },

  /**
   * 更新喜欢状态
   */
  _updateLikeStatus: function (atrID, category){
    likeM.getClassicLikeStatus(atrID, category,(res)=>{
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})