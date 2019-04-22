// pages/book-detail/book-detail.js
import {
  BookModel
} from "../../models/book.js"
import {
  LikeModel
} from "../../models/like.js"
const bookM = new BookModel()
const likeM = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    comments: [],
    likeStatus: false,
    count: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading()
    const bid = options.bid
    const detail = bookM.getDetail(bid)
    const comments = bookM.getComment(bid)
    const likeStatus = bookM.getLikeStatus(bid)

    Promise.all([detail, comments, likeStatus]).then(res=>{
      console.log(res)
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        count: res[2].fav_nums
      })
      wx.hideLoading()
    })
    // detail.then(res => {
    //   console.log(res)
    //   this.setData({
    //     book: res
    //   })
    // })
    // comments.then(res => {
    //   this.setData({
    //     comments: res.comments
    //   })
    // })
    // likeStatus.then(res => {
    //   // console.log(res)
    //   this.setData({
    //     likeStatus: res.like_status,
    //     count: res.fav_nums
    //   })
    // })
  },

  /**
   * 点赞
   */
  onLike: function(event) {
    likeM.like(event.detail.behavior, this.data.book.id, 400)
  },

  /**
   * 短评显示
   */
  onFake: function() {
    this.setData({
      posting: true
    })
  },

  /**
   * 短评隐藏
   */
  onCancle: function() {
    this.setData({ 
      posting: false
    })
  },

  //评论
  onTag:function(event){
    let content = event.detail.text || event.detail.value
    if (!content.length){
      wx.showToast({
        title: '评论不能为空',
        icon: "none"
      })
      return
    }
    if (content.length>12){
      wx.showToast({
        title: '评论字数不能大于12',
        icon:"none"
      })
      return
    }
    bookM.postComment(this.data.book.id, content).then(res=>{
      wx.showToast({
        title: '+1',
        icon: "none"
      })
      this.data.comments.unshift({
        content,
        nums:1
      })
      this.setData({
        comments: this.data.comments,
        posting:false
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