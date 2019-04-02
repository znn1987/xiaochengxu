const app = getApp();
Page({
  data: {
    code:"",
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.setData({
          code: res.code
        })

      }
    })
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function () {
              //从数据库获取用户信息
              that.queryUsreInfo();
              //用户已经授权过
              wx.switchTab({
                url: '/pages/team/team'
              })
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
   
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      //发起网络请求
      wx.request({
        url: app.globalData.url +'/user/add',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          code: this.data.code
        },
        success: function (result) {
          app.globalData.userWxId = result.data.openid,
          app.globalData.userType = result.data.userType,
          app.globalData.userState = result.data.userState,
          app.globalData.userInfo = e.detail.userInfo,
          app.globalData.hasUserInfo = true
        }
      })
      
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '/pages/user/user'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function (e) {
    wx.request({
      url: app.globalData.url +'/user/add',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        encryptedData: "",
        iv: "",
        code: this.data.code
      },
      success: function (result) {
        app.globalData.userWxId = result.data.openid,
        app.globalData.userType = result.data.userType,
        app.globalData.userState = result.data.userState
      }
    }) 
  }

})
