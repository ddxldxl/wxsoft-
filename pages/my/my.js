// pages/my/my.js
import {
  ClassicModel
} from "../../models/classic.js"
import {
  BookModel
} from "../../models/book.js"

let bookm = new BookModel()
let classicM = new ClassicModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    isAuthor: false,
    count:0,
    classics:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.userAuthorized()
    this.getLikeCount()
    this.getLikeClassic()
  },

  /**
   * 判断用户是否授权
   */
  userAuthorized() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              console.log(data)
              this.setData({
                userInfo: data.userInfo,
                isAuthor: true
              })
            }
          })
        }
      }
    })
  },

  /**
   * 跳转到关于我们
   */
  goToAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  /**
   * 跳转到学习
   */
  onStudy() {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },

  /**
   * 获取用户信息
   */
  onGetUserInfo(event) {
    let userInfo = event.detail.userInfo
    this.setData({
      userInfo,
      isAuthor: true
    })
  },

  /**
   * 获取用户喜欢的数目
   */
  getLikeCount(){
    bookm.getMyBookCount().then(res=>{
      this.setData({
        count:res.count
      })
    })
  },

  /**
   * 获取用户喜欢的期刊
   */
  getLikeClassic(){
    classicM.getLikeClassic(res=>{
      this.setData({
        classics:res
      })
    })
  },
  /**
   * 喜欢的期刊详情页
   */
  onJumpToDetail(event){
    wx.switchTab({
      url: '/pages/classic/classic',
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