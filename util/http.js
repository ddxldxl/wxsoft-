//封装wx.request
import config from "../config.js"

const tips = {
  1:'抱歉，出现一个未知错误',
  1006:'服务器内部错误',
  1005:'appkey无效，请前往www.7yue.pro申请',
  3000:'当前期刊不存在'
}

class HTTP {
  request(parames) {
    if (!parames.method) {
      parames.method = "GET" //默认GET
    }
    wx.request({
      url: config.api_base_url + parames.url,
      data: parames.data,
      header: {
        'Content-Type': 'application/json',
        appkey: 'AbhC31IG7ruCDp57'
      },
      method: parames.method,
      success: (res) =>{
        let code = res.statusCode.toString() //获取状态码
        if (code.startsWith('2')) {
          parames.success&&parames.success(res.data)
        } else {
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: function(res) {

      }
    })
  }
  _show_error(error_code){
    if (!error_code){
      error_code = 1
    }
    let title = tips[error_code] ? tips[error_code]:"未知错误"
    wx.showToast({
      title: title,
      icon:"none",
      duration:2000
    })
  }
}

export {HTTP}