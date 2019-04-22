// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      type:String,
      observer(newVal,oldVal,changePath){
        let val = newVal < 10 ? "0" + newVal :"newVal"
        this.setData({
          _index:val
        })
      }
    }
  },

  /**
   * 组件的初始数据 
   */
  data: {
    monthCN: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    year:0,
    month:'',
    _index:''
  },

  //
  attached:function(){
    let now = new Date()
    let y = now.getFullYear()
    let m = this.data.monthCN[now.getMonth()]
    this.setData({
      year:y,
      month: m
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
