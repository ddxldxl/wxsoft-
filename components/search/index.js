// components/search/index.js
import {
  keywordsModel
} from "../../models/keywords.js"

import {
  BookModel
} from "../../models/book.js"

import {
  paginationBev
} from "../behaviors/pagination.js"

const keywordsM = new keywordsModel()
const bookM = new BookModel()

Component({
  behaviors: [paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: "loadMore"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    word: "",
    loadingCenter:false
  },

  /**
   * 在组件实例进入页面节点树时执行
   */
  attached() {
    let historyData = keywordsM.getHistoryWords()
    this.setData({
      historyWords: historyData
    })

    keywordsM.getHotWords().then(res => {
      console.log(res)
      this.setData({
        hotWords: res.hot
      })
    })
  },


  /**
   * 组件的方法列表
   */
  methods: {
    onCancel() {
      this.initDataArr()
      this.triggerEvent("onSearch", {}, {})
    },
    onDelete() {
      this.initDataArr()
      this._hideResult()
    },
    onSearch(event) {
      this.initDataArr()
      this.showLoadingCeneter()
      this._showResult()
      let word = event.detail.value || event.detail.text
      bookM.search(0, word).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          word
        })
        keywordsM.saveSearchWords(word)
        this.hideLoadingCeneter()
      })
    },
    /**
     * 加载更多数据
     */
    loadMore() {
      if (!this.data.word) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.locked()
        bookM.search(this.getCurrentStart(), this.data.word).then(res => {
          this.setMoreData(res.books)
          this.unLocked()
        }, () => {
          this.unLocked()
        })
      }
    },

    /**
     * 显示结果
     */
    _showResult() {
      this.setData({
        searching: true
      })
    },

    /**
     * 隐藏结果
     */
    _hideResult() {
      this.setData({
        searching: false
      })
    },

    showLoadingCeneter(){
      this.setData({
        loadingCenter:true
      })
    },

    hideLoadingCeneter(){
      this.setData({
        loadingCenter: false
      })
    }
  }
})