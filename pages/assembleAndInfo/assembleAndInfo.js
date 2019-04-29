// pages/assembleAndInfo/assembleAndInfo.js
var util = require('../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    assembleTime: '数据加载中！！！',
    assembleDress: '数据加载中！！！',
    photos: 1,
    count: 0
  },
  //打电话
  calling: function (e) {
    console.log(e)
    var phone = e.currentTarget.dataset.text
    if (phone == null || phone == 'undefined' || phone == '') {
      wx.showToast({
        title: '未填写联系电话！！！',
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
  //图片放大
  previewImage: function (e) {
    if (this.data.photos!=''){
      wx.navigateTo({
        url: '../assemblePhoto/assemblePhoto?photos=' + this.data.photos
      })
    }
    
  },
  //导航跳转
  GPS: function (e) {
    var url = ''
    if (this.data.longitude){
      url = '../assemble/assemble?longitude=' + this.data.longitude + '&latitude=' + this.data.latitude + '&assembleDress=' + this.data.assembleDress
    }else{
      url = '../assemble/assemble'
    }
    wx.navigateTo({
      url: url
    })
  },
 
  //设置跳转
  setAssemble: function (e) {
    if (app.globalData.teamCode == null) {
      wx.showToast({
        title: '请先创建队伍！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    if (app.globalData.userType == 1 && app.globalData.userState == 1) {
      wx.navigateTo({
        url: '../assembleSet/assembleSet',
      })
    } else {
      wx.showToast({
        title: '此次版本只允许注册导游设置！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }  
    
  },
  //定点集合设置签到、点名
  // sign: function (e) {
  //   if (app.globalData.userType == 1 && app.globalData.userState == 1) {
  //     var that = this
  //     wx.request({
  //       url: app.globalData.url + '/userByTour/updateAssemble',
  //       data: {
  //         teamCode: app.globalData.teamCode
  //       },
  //       method: 'post',
  //       header: {
  //         'content-type': 'application/x-www-form-urlencoded'
  //       },
  //       success: function (res) {
  //         if (result.data.success) {

  //         } else {
  //           wx.navigateBack({

  //           })
  //           wx.showToast({
  //             title: result.data.msg,
  //             icon: 'none',
  //             duration: 2000,
  //             mask: false
  //           })

  //         }
  //       },
  //       fail: function (res) {
  //         console.log("--------fail--------");
  //       }
  //     })
  //   } else {
  //     wx.showToast({
  //       title: '此次版本只允许注册导游设置！！！！',
  //       icon: 'none',
  //       duration: 2000,
  //       mask: false
  //     })
  //     return
  //   } 
  // },
  signUserBtn: function (e) {
    var that = this
    var text = e.currentTarget.dataset.text
    var list = text.split(",");
    var i = 0;
    var wxId = "";
    var name = "";
    for (i; i < list.length; i++) {
      wxId = list[0];
      name = list[1];
    }
    var url = ''
    if (wxId == name) {
      url = '/userByTour/updateUserAssemble'
    } else {
      url = '/teamUser/updateUserAssemble'
    }
    wx.request({
      url: app.globalData.url + url,
      data: {
        wxId: wxId,
        teamCode: app.globalData.teamCode
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.onLoad()
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },
  noAssembleUserBtn: function (e) {
    if (this.data.assembleUser > 0) {
      wx.navigateTo({
        url: '../noAssembleUser/noAssembleUser',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getSystemInfoSync().windowWidth)
    var that = this
    that.setData({
      userWxId: app.globalData.userWxId,
      userType: app.globalData.userType
    })
    wx.request({
      url: app.globalData.url + '/teamAssemble/queryByCode',
      data: {
        teamCode: app.globalData.teamCode,
        userWxId: app.globalData.userWxId,
        userType: app.globalData.userTypet
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.assembleDress) {
        
          if (!res.data.photo){
            console.log('res')
            that.setData({
              assembleTime: res.data.assembleTime,
              assembleDress: res.data.assembleDress,
              photos: '',
              longitude: res.data.longitude,
              latitude: res.data.latitude
              
            })
         }else{
            that.setData({
              assembleTime: res.data.assembleTime,
              assembleDress: res.data.assembleDress,
              photos: res.data.photo,
              longitude: res.data.longitude,
              latitude: res.data.latitude
            })
         }
         
        } else {
          that.setData({
            assembleTime: '没有集合任务！！！',
            assembleDress: '没有集合任务！！！'
          })
        }
        wx.request({
          url: app.globalData.url + '/userByTour/signSum',
          data: {
            teamCode: app.globalData.teamCode
          },
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res)
            if (res.data.allUser == null) {
              that.setData({
                allUser: 0
              })
            } else {
              that.setData({
                allUser: res.data.allUser
              })
            }
            if (res.data.signUser == null) {
              that.setData({
                signUser: 0
              })
            } else {
              that.setData({
                signUser: res.data.signUser
              })
            }
            if (res.data.assembleUser == null) {
              that.setData({
                assembleUser: 0
              })
            } else {
              that.setData({
                assembleUser: res.data.assembleUser-1
              })
            }
          },
          fail: function (res) {
            console.log("--------fail--------");
          }
        })
      }
    })
    wx.request({
      url: app.globalData.url + '/teamUser/queryTeamUser',
      data: {
        userWxId: app.globalData.userWxId
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
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