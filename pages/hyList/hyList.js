var common = require("../../utils/common.js")
// pages/hyList/hyList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr:[],
    loadStatus:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  getHyList:function(num=8,page=1){
    wx.showLoading({
      title: '正在加载...',
    })
    var that = this
    var oldArrList = that.data.listArr;
    var newsArrList = [];
    wx.request({
      url: 'https://ku.qingnian8.com/school/list.php',
      data:{
        num:num,
        page:page
      },
      success:function(res){
        if(!res.data.length || res.data.length < num) {
          that.setData({
            loadStatus:false
            })
        }
        for(var i=0;i< res.data.length;i++){
          res.data[i].posttime = common.formatTime(res.data[i].posttime,"Y-M-D")
        }
        newsArrList = oldArrList.concat(res.data)

        that.setData({
            listArr:newsArrList,
            currentPage:page
        })
      } 
    })
    console.log(this.data.loadStatus)
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getHyList()
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
      this.getHyList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      var prevPage = this.data.currentPage;
      prevPage ++
      this.getHyList(8,prevPage)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})