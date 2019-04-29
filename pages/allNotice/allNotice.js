// pages/allNotice/allNotice.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    notices: ''
  },

  //公告详情跳转
  newNotice: function (e) {
    var text = e.currentTarget.dataset.text
    wx.navigateTo({
      url: '../newNotice/newNotice?noticeCode=' + text,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.url + '/notice/queryNoticeUser',
      data: {
        userWxId: app.globalData.userWxId,
        code: '',
        teamCode: app.globalData.teamCode
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.length > 0) {
          that.setData({
            notices: res.data
          })
        } else {
          wx.navigateBack({

          })
          setTimeout(function () {
          wx.showToast({
            title: '暂无公告！！！',
            icon: 'none',
            duration: 2000,
            mask: false
          })
          }, 1000) 
         
        }

      },
      fail: function (res) {
        console.log("--------fail--------");
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
    if (this.data.count != 0) {
      var that = this
      that.onLoad("show")
    }
    this.setData({
      count: 1
    })
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