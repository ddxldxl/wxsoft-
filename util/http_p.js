//封装wx.request
import config from "../config.js"

const tips = {
  1: '抱歉，出现一个未知错误',
  1006: '服务器内部错误',
  1005: 'appkey无效，请前往www.7yue.pro申请',
  3000: '当前期刊不存在'
}

class HTTP {
  request({url,data = {},method = "GET"}){
    return new Promise((resolve, reject)=>{
      this._request(url, resolve, reject, data, method)
    })
  }
  _request(url, resolve, reject, data = {}, method = "GET") {
    wx.request({
      url: config.api_base_url + url,
      data: data,
      header: {
        'Content-Type': 'application/json',
        appkey: 'AbhC31IG7ruCDp57'
      },
      method: method,
      success: (res) => {
        let code = res.statusCode.toString() //获取状态码
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject()
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: function (res) {
        reject()
      }
    })
  }
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    let title = tips[error_code] ? tips[error_code] : "未知错误"
    wx.showToast({
      title: title,
      icon: "none",
      duration: 2000
    })
  }
}

export { HTTP }