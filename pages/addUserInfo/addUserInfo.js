// pages/addUserInfo/addUserInfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  //获取用户选择的类别
  radioTypeChange: function (e) {
    var that = this
    that.setData({
      userType: e.detail.value
    })
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
  //获取用户输入的旅行社
  tourTravelInput: function (e) {
    var that = this
    that.setData({
      tourTravel: e.detail.value
    })
  },
  //获取用户输入的导游证号
  tourCodeInput: function (e) {
    var that = this
    that.setData({
      tourCode: e.detail.value
    })
  },
  //获取用户输入的宾馆名称
  hotelNameInput: function (e) {
    var that = this
    that.setData({
      hotelName: e.detail.value
    })
  },
  //获取用户输入的宾馆地址
  hotelDressInput: function (e) {
    var that = this
    that.setData({
      hotelDress: e.detail.value
    })
  },
  //返回
  cancel: function () {
    wx.navigateBack({

    })
  },
  
  //保存个人信息
  saveUserInfo: function (e) {
    // var list ={ userWxId: app.globalData.userWxId, userType: this.data.userType, userName: this.data.userCodeName, userSex: this.data.userSex, userCode: this.data.userCode, userPhone: this.data.userPhone, tourTravel: this.data.tourTravel, tourCode: this.data.tourCode }
    // var js = JSON.stringify(list)
    // console.log(js)
    // console.log(JSON.parse(js))
    // let map = new Map();
    // for (let k of Object.keys(JSON.parse(js))) {
    //   map.set(k, JSON.parse(js)[k]);
    // }
    if (this.data.userType == 1 && (this.data.tourTravel == "" || this.data.tourCode == "" || this.data.userCode == "" || this.data.userPhone=="")){
      wx.showToast({
        title: '导游用户：旅行社、导游证号、手机号、身份证号必填',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    else if (this.data.userType == 2 && (this.data.userPhone == "" || this.data.hotelName == "" || this.data.hotelName == undefined || this.data.hotelDress==undefined)) {
      wx.showToast({
        title: '宾馆用户：电话号码（订房电话）、宾馆名称、地址必填',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    console.log("宾馆："+this.data.hotelName)
    wx.request({
      url: app.globalData.url +'/user/update',
      data: {
        userWxId: app.globalData.userWxId,
        userType: this.data.userType,
        userName: this.data.userCodeName,
        userSex: this.data.userSex,
        userCode: this.data.userCode,
        userPhone: this.data.userPhone,
        tourTravel: this.data.tourTravel,
        tourCode: this.data.tourCode,
        userCheckState: this.data.userCheckState,
        hotelName: this.data.hotelName,
        hotelDress: this.data.hotelDress
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        app.globalData.userType = res.data.userType
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
      url: app.globalData.url + '/user/query',
      data: {
        userWxId: app.globalData.userWxId
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data!=""){
          app.globalData.userType = res.data.userType
          app.globalData.userState = res.data.userCheckState
          that.setData({
            userType: res.data.userType,
            userCodeName: res.data.userCodeName,
            userSex: res.data.userSex,
            userCode: res.data.userCode,
            userPhone: res.data.userPhone,
            tourTravel: res.data.userTourTravel,
            tourCode: res.data.userTourCode,
            userCheckState: res.data.userCheckState
          })
        }
        if (res.data.userType == 2){
          //查询酒店信息
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
                hotelName: res.data.sysHotelName,
                hotelDress: res.data.sysHotelDress
              })
              // }

            },
            fail: function (res) {
              console.log("--------fail--------");
            }
          })
        }
        
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    }),
      function ObjData(key, value) {
        this.Key = key;
        this.Value = value;
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