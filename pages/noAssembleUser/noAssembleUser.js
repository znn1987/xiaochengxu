// pages/noAssembleUser/noAssembleUser.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //打电话
  calling: function (e) {
    console.log(e)
    var phone = e.currentTarget.dataset.text
    if (phone == null || phone == 'undefined' || phone == '') {
      wx.showToast({
        title: '请先填写队员联系电话！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.url + '/teamUserAssemble/queryTeamUser',
      data: {
        userWxId: app.globalData.userWxId
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('res')
        console.log(res)
        that.setData({
          users: res.data
        })

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