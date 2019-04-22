// pages/book/book.js
import {
  BookModel
} from "../../models/book.js"

import {
  random
} from "../../util/common.js"

let bookM = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:{},
    searchShow:false,
    more:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    bookM.getHotList()
      .then(
        res => {
          this.setData({
            books:res
          })
        }
      )
  },
  /**
   * 显示搜索页面
   */
  onSearchShow(){
    this.setData({
      searchShow:true
    })
  },
  /**
   * 隐藏搜索页面
   */
  onSearchHide() {
    this.setData({
      searchShow: false
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
    this.setData({
      more: random(16)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})