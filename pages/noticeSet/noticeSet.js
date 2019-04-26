// pages/noticeSet/noticeSet.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    notice: ''
  },
  //获取用户输入的标题
  titleInput: function (e) {
    var that = this
    that.setData({
      title: e.detail.value.replace(/\s+/g, '')
    })
  },
  //获取用户内容
  noticeInput: function (e) {
    var that = this
    that.setData({
      notice: e.detail.value
    })
  },
  //返回
  cancel: function () {
    wx.navigateBack({

    })
  },

  //保存发布信息
  saveNotice: function (e) {
    if (this.data.title == '') {
      wx.showToast({
        title: '标题为必填！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    wx.request({
      url: app.globalData.url + '/notice/noticeSet',
      data: {
        code: this.data.code,
        teamCode: app.globalData.teamCode,
        title: this.data.title,
        notice: this.data.notice
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        wx.navigateBack({

        })

      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.url + '/notice/queryNotice',
      data: {
        code: '',
        teamCode: app.globalData.teamCode,
        isRead: '',
        all: ''
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data[0] == null) {

          that.setData({
            code: 1
          })
        } else {
          that.setData({
            code: res.data[0].code+1
          })
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