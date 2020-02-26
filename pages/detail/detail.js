// pages/detail/detail.js
var WxParse = require("../../wxParse/wxParse.js")
var common = require("../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
      wx.request({
        url: 'https://ku.qingnian8.com/school/show.php',
        data:{
          id:id
        },
        success:(res) => {
          res.data.posttime = common.formatTime(res.data.posttime,"Y-M-D h:m")
          this.setData({
            detail:res.data
          })
          WxParse.wxParse('article', 'html', res.data.content, this,5);
        }
      })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})