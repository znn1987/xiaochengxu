// pages/signTeam/signTeam.js
var util = require('../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //设置签到、点名
  sign: function (e) {
    if (app.globalData.userType == 1 && app.globalData.userState == 1) {
      var that = this
      wx.request({
        url: app.globalData.url + '/userByTour/updateSign',
        data: {
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
    } else {
      wx.showToast({
        title: '此次版本只允许注册导游创建队伍！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return

    }
  },
  signUserBtn: function (e) {
    var that = this
    var text = e.currentTarget.dataset.text
    console.log(text)
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
      url = '/userByTour/updateUserSign'
    } else {
      url = '/teamUser/updateUserSign'
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
  noSignUserBtn: function(e) {
    wx.navigateTo({
      url: '../noSignUser/noSignUser',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      dateStart: time,
      dateEnd: time,
      userWxId: app.globalData.userWxId,
      userType: app.globalData.userType,

    });
    var that = this
    wx.request({
      url: app.globalData.url + '/team/queryTeam',
      data: {
        userWxId: app.globalData.userWxId,
        teamName: '',
        startDate: this.data.dateStart,
        endDate: this.data.dateStart
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var code = '';
        if (res.data.length > 0) {
          code = res.data[0].tourTeamCode
          app.globalData.teamCode = res.data[0].tourTeamCode
          that.setData({
            teamName: res.data[0].tourTeamName,
            start: res.data[0].tourTeamDate,
            end: res.data[0].tourTeamLoseDate
          })

          wx.request({
            url: app.globalData.url + '/userByTour/signSum',
            data: {
              teamCode: code
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
                  signUser: res.data.signUser-1
                })
              }

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