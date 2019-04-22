import {
  HTTP
} from "../util/http.js"

class LikeModel extends HTTP {
  like(behavior, artId, category) {
    let url = behavior == "ok" ? "like" : "like/cancel"
    this.request({
      url: url,
      method: "post",
      data: {
        art_id: artId,
        type: category
      }
    })
  }

  getClassicLikeStatus(artID, category, sCallback) {
    this.request({
      url: 'classic/' + category + '/' + artID + '/favor',
      success: sCallback
    })
  }
}

export {
  LikeModel
}