import {
  HTTP
} from '../util/http_p.js'

class keywordsModel extends HTTP{
  key="q"

  //获取历史搜索
  getHistoryWords(){
    let keywords = wx.getStorageSync(this.key)
    if (!keywords){
      return []
    }
    return keywords
  }

  //获取热门搜索
  getHotWords(){
    return this.request({
      url:"/book/hot_keyword"
    })
  }

  //存储历史搜索
  saveSearchWords(keywords){
    let words = this.getHistoryWords(this.key)
    let has = words.includes(keywords)
    if (!has) {
      let length = words.length
      if (length>10){
        words.pop()
      }
      words.unshift(keywords)
      wx.setStorageSync(this.key, words)
    }
  }
} 

export { keywordsModel}