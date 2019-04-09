//index.js
//获取应用实例
const app = getApp()


Page({
  
  data: {
    // motto: '团队信息',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // //事件处理函数
  // bindViewTap: function () {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onLoad: function () {
  //   let timer = setTimeout(() => {
  //     clearTimeout(timer)
  //     this.direct()
  //   }, 8000)
  // },
  // direct() {
  //   let auth = utils.ifLogined()
  //   let url = '/pages/team/team'
  //   if (auth) {
  //     url = '/pages/index/index'
  //   }
  //   wx.switchTab({ url, })
  // },
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
      
  //   } else if (this.data.canIUse) {
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function (e) {
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})


// //1、调用微信登录接口，获取code
// wx.login({
//   success: function (r) {
//     var code = r.code;//登录凭证
//     if (code) {
//       //2、调用获取用户信息接口
//       wx.getUserInfo({
//         success: function (res) {
//           console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code })
//           //3.解密用户信息 获取unionId
//           //...
//         },
//         fail: function () {
//           console.log('获取用户信息失败')
//         }
//       })

//     } else {
//       console.log('获取用户登录态失败！' + r.errMsg)
//     }
//   },
//   fail: function () {
//     callback(false)
//   }
// })









// var openId = (wx.getStorageSync('openId'))
// logs.unshift(openId)
// if (openId) {
//   wx.getUserInfo({
//     success: function (res) {
//       that.setData({
//         nickName: res.userInfo.nickName,
//         avatarUrl: res.userInfo.avatarUrl,
//       })
//     },
//     fail: function () {
//       // fail
//       console.log("获取失败！")
//     },
//     complete: function () {
//       // complete
//       console.log("获取用户信息完成！")
//     }
//   })
// } else {
//   wx.login({
//     success: function (res) {
//       console.log(res.code)
//       if (res.code) {
//         wx.getUserInfo({
//           withCredentials: true,
//           success: function (res_user) {
//             wx.request({
//               //后台接口地址
//               url: '',
//               data: {
//                 code: res.code,
//                 encryptedData: res_user.encryptedData,
//                 iv: res_user.iv
//               },
//               method: 'GET',
//               header: {
//                 'content-type': 'application/json'
//               },
//               success: function (res) {
//                 // this.globalData.userInfo = JSON.parse(res.data);
//                 that.setData({
//                   nickName: res.data.nickName,
//                   avatarUrl: res.data.avatarUrl,
//                 })
//                 wx.setStorageSync('openId', res.data.openId);

//               }
//             })
//           }, fail: function () {
//             wx.showModal({
//               title: '警告通知',
//               content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
//               success: function (res) {
//                 if (res.confirm) {
//                   wx.openSetting({
//                     success: (res) => {
//                       if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
//                         wx.login({
//                           success: function (res_login) {
//                             if (res_login.code) {
//                               wx.getUserInfo({
//                                 withCredentials: true,
//                                 success: function (res_user) {
//                                   wx.request({
//                                     url: '',
//                                     data: {
//                                       code: res_login.code,
//                                       encryptedData: res_user.encryptedData,
//                                       iv: res_user.iv
//                                     },
//                                     method: 'GET',
//                                     header: {
//                                       'content-type': 'application/json'
//                                     },
//                                     success: function (res) {
//                                       that.setData({
//                                         nickName: res.data.nickName,
//                                         avatarUrl: res.data.avatarUrl,

//                                       })
//                                       wx.setStorageSync('openId', res.data.openId);
//                                     }
//                                   })
//                                 }
//                               })
//                             }
//                           }
//                         });
//                       }
//                     }, fail: function (res) {

//                     }
//                   })

//                 }
//               }
//             })
//           }, complete: function (res) {


//           }
//         })
//       }
//     }
//   })

// }


  
// globalData: {
//   userInfo: null
// }