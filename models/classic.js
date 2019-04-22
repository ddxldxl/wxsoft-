import {
  HTTP
} from '../util/http.js'

class ClassicModel extends HTTP {
  //获取最新期刊
  getLatest(sCallBack) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallBack(res)
        this._saveLatest(res.index)
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }
  //获取当前期的上一期
  getCLassic(index, nextOrPrevious, sCallBack) {
    let key = nextOrPrevious == "next" ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: `/classic/' + index + '/' + nextOrPrevious`,
        success: (res) => {
          sCallBack(res)
          wx.setStorageSync(key, res)
        }
      })
    }else {
      sCallBack(classic)
    }
  }

  //获取喜欢的期刊
  getLikeClassic(success){
    this.request({
      url:"/classic/favor",
      success: success
    })
  }

  //获取某一期期刊详情
  getIndexClassic(type,cid,success){
    this.request({
      url: `/classic/${type}/${cid}`,
      success: success
    })
  }

  //当前期刊是否是第一个
  isFirst(index) {
    return index == 1 ? true : false
  }

  //当前期刊是否是最新的
  isLatest(index) {
    return this._getLatest() == index ? true : false
  }

  //将最新期刊序号存入缓存中
  _saveLatest(index) {
    wx.setStorageSync("latest", index)
  }

  //从缓存中读取最新期刊序号
  _getLatest() {
    let index = wx.getStorageSync("latest")
    return index
  }

  //设置缓存中的key
  _getKey(index) {
    let key = "classic" + index
    return key
  }
}

export {
  ClassicModel
}