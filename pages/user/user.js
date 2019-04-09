//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    code: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    count: 0
  },
  //完善个人信息
  addUserInfo: function () {
    wx.navigateTo({
      url: '../addUserInfo/addUserInfo'
    })
  },
  //完善宾馆信息
  hotelInfo: function () {
    wx.navigateTo({
      url: '../hotelInfo/hotelInfo'
    })
  },
  onLoad: function (options) {
    var that = this
    wx.login({
      success: res => {
        console.log(options)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (options.scene) {
          let scene = decodeURIComponent(options.scene);
          //发起网络请求
          wx.request({
            url: app.globalData.url + '/user/add',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
              encryptedData: null,
              iv: null,
              code: res.code
            },
            success: function (result) {
              console.log(result)
              app.globalData.userWxId = result.data.openid,
                app.globalData.userType = result.data.userType,
                app.globalData.userState = result.data.userState,
                app.globalData.hasUserInfo = true,
                //发起网络请求
                wx.request({
                  url: app.globalData.url + '/teamUser/addTeamUserByEr',
                  header: {
                    "content-type": "application/x-www-form-urlencoded"
                  },
                  method: "POST",
                  data: {
                    userWxId: result.data.openid,
                    teamCode: scene
                  },
                  success: function (result) {

                  }
                })
            }
          })

          //授权成功后，跳转进入小程序首页
          wx.switchTab({
            url: '/pages/user/user'
          })
        }
      }
    })
    

    var count = 0 
    if (app.globalData.userInfo) {
      this.setData({
        userType: app.globalData.userType,
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else 
    if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {

      //   console.log("else if"+res.data);
      //   console.log(code);
      //   //发起网络请求
      //   wx.request({
      //     url:'http://localhost:8888/user/add',
      //     header: {
      //       "content-type": "application/x-www-form-urlencoded"
      //     },
      //     method: "POST",
      //     data: {
      //       encryptedData: res.encryptedData,
      //       iv: res.iv,
      //       code: code
      //     },
      //     success: function (result) {
      //       // wx.setStorage({
      //       //   key: 'openid',
      //       //   data: res.data.openid,
      //       // })
      //       console.log(result)
      //     }
      //   })
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          // //发起网络请求
          // wx.request({
          //   url: '/http://localhost:8888/user/add',
          //   header: {
          //     "content-type": "application/x-www-form-urlencoded"
          //   },
          //   method: "POST",
          //   data: {
          //     encryptedData: res.encryptedData,
          //     iv: res.iv,
          //     code: code
          //   },
          //   success: function (result) {
          //     // wx.setStorage({
          //     //   key: 'openid',
          //     //   data: res.data.openid,
          //     // })
          //     console.log(result)
          //   }
          // })
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function () {
    if (this.data.count != 0) {
      var that = this
      that.onLoad("show")
    }
    this.setData({
      count: 1
    })
  }
})