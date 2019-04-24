// pages/assemblePhoto/assemblePhoto.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.photos)
    wx.showToast({
      title: '图片加载中……',
      icon: 'none',
      duration: 5000,
      mask: false
    })
    var that = this
    that.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth
    })
    wx.request({
      url: app.globalData.url + '/teamAssemble/queryByCode',
      data: {
        teamCode: app.globalData.teamCode,
        userWxId: app.globalData.userWxId,
        userType: app.globalData.userTypet
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
            that.setData({
              photos: res.data.photo
            })
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