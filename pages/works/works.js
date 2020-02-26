// pages/works/works.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList:[],
    cid:17,
    idx:0,
    scrollX:0,
    worksList:[],
    num:5,
    page:1,
    loadStatus:true

  },
  //获取全部分类
  getTypeList:function(){
    var that = this
    wx.request({
      url: 'https://ku.qingnian8.com/school/infoclass.php',
      success:function(res){
        res.data[0].classname = "全部"
          that.setData({
            typeList:res.data
          })
        that.navBtn()
      }
      
    })
    
  },
  //根据分类获取作品
  getWorksFromType:function(number=this.data.num,page=this.data.page,cid=this.data.cid){
    wx.request({
      url: 'https://ku.qingnian8.com/school/works.php',
      data:{
        num:number,
        cid:cid,
        page:page
      },
      success:(res) => {
        if(res.data.length < number) this.setData({
          loadStatus:false
        })
        var oldList = this.data.worksList
        var newList = [];
        newList = oldList.concat(res.data)
        this.setData({
          worksList:newList,
          pageNum:page
        })

      }
    })
  },

  //分类点击事件
  navBtn:function(e){
    //获取屏幕的宽度
    if (!e){
      var cid = this.data.cid
      var idx = this.data.idx
    }else{
      var cid = e.currentTarget.dataset.cid
      var idx = e.currentTarget.dataset.idx
    }
    var width = wx.getSystemInfoSync().windowWidth/5;
    var newRemove = width * idx  - width * 2; 
    this.setData({
      cid:cid,
      idx:idx,
      scrollX:newRemove,
      worksList:[]
    });

    this.getWorksFromType(this.data.num, this.data.page, this.data.cid);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cid: options.cid == undefined ? this.data.cid : options.cid,
      idx: options.idx == undefined ? this.data.idx : options.idx,
    });
    
    this.getTypeList()
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page = this.data.pageNum
    page ++
    var cid = this.data.cid
    var num = this.data.num
    this.getWorksFromType(num,page,cid)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})