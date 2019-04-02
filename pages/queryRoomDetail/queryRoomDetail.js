// pages/queryRoomDetail/queryRoomDetail.js
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
    var that = this
    if (options.hotelPhone != undefined) {
      that.setData({
        hotelPhone: options.hotelPhone
      })
    }
    if (options.inDate != undefined) {
      that.setData({
        inDate: options.inDate
      })
    }
    if (options.outDate != undefined) {
      that.setData({
        outDate: options.outDate
      })
    }

    var that = this
    wx.request({
      url: app.globalData.url + '/hotelTeamUser/queryRoomDetail',
      data: {
        hotelPhone: options.hotelPhone,
        startDate: options.inDate,
        endDate: options.outDate
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data != ""){
          that.setData({
            users: res.data
          })
        }else{
          wx.navigateBack({

          })
          wx.showToast({
            title: '还没有信息！！！',
            icon: 'none',
            duration: 2000,
            mask: false
          })
          return
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