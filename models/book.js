import {
  HTTP
} from '../util/http_p.js'

class BookModel extends HTTP {
  //获取书单列表
  getHotList() {
    return this.request({
      url:"/book/hot_list"
    })
  }

  //获取喜欢书籍数量
  getMyBookCount() {
    return this.request({
      url:"/book/favor/count"
    })
  }

  //获取书籍的详细信息
  getDetail(bid) {
    return this.request({
      url:`/book/${bid}/detail`
    })
  }

  //获取书籍的详细信息
  getDetail(bid) {
    return this.request({
      url: `/book/${bid}/detail`
    })
  }

  //获取书籍点赞状态
  getLikeStatus(bid) {
    return this.request({
      url: `/book/${bid}/favor`
    })
  }

  //获取书籍短评
  getComment(bid) {
    return this.request({
      url: `/book/${bid}/short_comment`
    })
  }

  //评论
  postComment(id, content) {
    return this.request({
      url: "/book/add/short_comment",
      data: {
        book_id: id,
        content
      },
      method:"POST"
    })
  }


  //搜索
  search(start, q) {
    return this.request({
      url: "/book/search?summary=1",
      data: {
        start,
        q
      }
    })
  }
}

export {
  BookModel
}