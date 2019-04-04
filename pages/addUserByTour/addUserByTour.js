// pages/addUserByTour/addUserByTour.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //获取用户输入的姓名
  userNameInput: function (e) {
    var that = this
    that.setData({
      userCodeName: e.detail.value
    })
  },
  //获取用户选择的性别
  radioSexChange: function (e) {
    var that = this
    that.setData({
      userSex: e.detail.value
    })
  },
  //获取用户年龄
  userAgeInput: function (e) {
    var that = this
    that.setData({
      userAge: e.detail.value
    })
  },
  //获取用户输入的身份证号码
  userCodeInput: function (e) {
    var that = this
    that.setData({
      userCode: e.detail.value
    })
  },
  //获取用户输入的手机号码
  userPhoneInput: function (e) {
    var that = this
    that.setData({
      userPhone: e.detail.value
    })
  },
  //获取用户选择的角色
  radioTypeChange: function (e) {
    var that = this
    that.setData({
      userType: e.detail.value
    })
  },
  //获取用户选择的是否住宿
  radioIsHotelChange: function (e) {
    var that = this
    that.setData({
      isHotel: e.detail.value
    })
  },
  //获取用户选择的是否代签到
  radioIsTourSignChange: function (e) {
    var that = this
    that.setData({
      isTourSign: e.detail.value
    })
  },
  //返回
  cancel: function () {
    wx.navigateBack({

    })
  },

  //保存个人信息
  saveUserInfo: function (e) {
    wx.request({
      url: app.globalData.url + '/userByTour/add',
      data: {
        userName: this.data.userCodeName,
        userSex: this.data.userSex,
        userAge: this.data.userAge,
        userCode: this.data.userCode,
        phone: this.data.userPhone,
        teamCode: app.globalData.teamCode,
        userType: this.data.userType,
        isHotel: this.data.isHotel,
        isTourSign: 1
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
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
    
    if (app.globalData.teamCode == null){
      wx.showToast({
        title: '请先创建队伍再添加队员！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    if (options.userCode != undefined){
      wx.request({
        url: app.globalData.url + '/userByTour/queryUserByCode',
        data: {
          userCode: options.userCode,
          teamCode: app.globalData.teamCode
        },
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res)
          that.setData({
            userCodeName: res.data.userName,
            userCode: res.data.userCode,
            userPhone: res.data.phone,
            userAge: res.data.userAge,
            userSex: res.data.userSex,
            userType: res.data.userType,
            isHotel: res.data.isHotel,
            isTourSign: res.data.isTourSign
          })

        },
        fail: function (res) {
          console.log("--------fail--------");
        }
      })
    }
    
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