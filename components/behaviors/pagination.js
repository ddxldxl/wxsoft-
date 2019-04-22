const paginationBev = Behavior({
  data: {
    dataArray: [],
    total:null,
    noResult:false,
    loading:false     //锁
  },
  methods: {
    /**
     * 获取更多数据
     */
    setMoreData(dataArray){
      const tmpArr =  this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tmpArr
      })
    },

    /**
     * 返回当前条数
     */
    getCurrentStart(){
      return this.data.dataArray.length
    },

    /**
     * 获取总条数
     */
    setTotal(total) {
      this.data.total = total
      if(total==0){
        this.setData({
          noResult:true
        })
      }
    },

    /**
     * 判断是否最后一条
     */
    hasMore(){
      if (this.getCurrentStart() >= this.data.total){
        return false
      }else {
        return true
      }
    },

    /**
     * 初始化
     */
    initDataArr(){
      this.setData({
        dataArray:[],
        total: null,
        noResult:false,
        loading: false
      })
    },

    /**
     * 是否锁住
     */
    isLocked() {
      return this.data.loading ? true : false
    },

    /**
     * 锁
     */
    locked() {
      this.setData({
        loading: true
      })
    },
    /**
     * 解锁
     */
    unLocked() {
      this.setData({
        loading: false
      })
    },
  }
})

export { paginationBev}