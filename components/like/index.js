// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLike: { //是否喜欢
      type: Boolean
    },
    count: { //喜欢数量
      type: Number
    },
    readOnly:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: './images/like.png',
    noSrc: './images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onlike: function(event) {
      if (this.properties.readOnly){
        return
      }
      let isLike = this.properties.isLike
      let count = this.properties.count
      count = isLike ? count - 1 : count + 1
      this.setData({
        isLike: !isLike,
        count: count
      })
      let behavior = this.properties.isLike?"ok":"cancle"
      this.triggerEvent("like",{
        behavior: behavior
      })
    }
  }
})