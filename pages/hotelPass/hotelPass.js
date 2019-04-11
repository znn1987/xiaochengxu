// pages/hotelPass/hotelPass.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    type: '',
    count: 0
  },
  //获取用户输入的密码
  hotelPassInput: function (e) {
    var that = this
    that.setData({
      hotelPass: e.detail.value
    })
  },
  //获取用户输入的旧密码
  hotelOldPassInput: function (e) {
    var that = this
    that.setData({
      hotelOldPass: e.detail.value
    })
  },
  //获取用户输入的新密码
  hotelNewPassInput: function (e) {
    var that = this
    that.setData({
      hotelNewPass: e.detail.value
    })
  },
  //获取用户输入的第二次新密码
  hotelNewPassAginInput: function (e) {
    var that = this
    that.setData({
      hotelNewPassAgin: e.detail.value
    })
  },
  //修改密码
  updatePass: function () {
    var that = this
    that.setData({
      type: 1
    })
  },
  //保存新密码
  saveNewPass: function () {
    console.log(this.data.hotelNewPass)
    if (this.data.hotelOldPass == this.data.hotelNewPass){
      wx.showToast({
        title: '新设密码不能与原密码相同！！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return 
    }
    if (this.data.hotelNewPass != this.data.hotelNewPassAgin){
      wx.showToast({
        title: '新设密码两次输入不同！！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return 
    }
    if (this.data.hotelNewPass == ' ' || !this.data.hotelNewPass) {
      wx.showToast({
        title: '新设密码不能为空！！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    wx.request({
      url: app.globalData.url + '/sysHotel/saveNewPass',
      data: {
        hotelPhone: this.data.hotelPhone,
        hotelPass: this.data.hotelOldPass ,
        hotelNewPass: this.data.hotelNewPass

      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.success) {
          wx.navigateBack({

          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000,
            mask: false
          })
        }
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },
  //验证登陆
  checkHotel: function () {
    var that = this
    wx.request({
      url: app.globalData.url + '/sysHotel/queryCheckHotel',
      data: {
        hotelPhone: this.data.hotelPhone,
        hotelPass: this.data.hotelPass
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if(res.data.success){
          wx.navigateTo({
            url: '../hotelInfo/hotelInfo'
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000,
            mask: false
          })
        }
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
    //查询酒店信息

    var that = this
    wx.request({
      url: app.globalData.url + '/sysHotel/queryHotel',
      data: {
        wxId: app.globalData.userWxId
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // if (res.data.sysHotelName == undefined) {
        //   that.setData({
        //     hotelPhone: res.data.sysHotelPhone,
        //     hotelName: res.data.sysHotelPhone,
        //     hotelDress: res.data.sysHotelPhone
        //   })
        //   that.saveHotel('')
        // } else {
        that.setData({
          hotelPhone: res.data.sysHotelPhone,
          hotelName: res.data.sysHotelName,
          hotelDress: res.data.sysHotelDress
        })
        // }

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
      that.setData({
        hotelPass: ''
      })
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