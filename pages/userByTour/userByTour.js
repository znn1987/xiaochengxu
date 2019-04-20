// pages/userByTour/userByTour.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0
  },
 //打电话
  calling: function (e) {
    console.log(e)
    var phone = e.currentTarget.dataset.text
    if (phone == null || phone == 'undefined' || phone == '') {
      wx.showToast({
        title: '请先填写队员联系电话！！！',
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
  //由队长添加游客信息按钮跳转
  addUserBtn: function (e) {
    if (app.globalData.teamCode == null) {
      wx.showToast({
        title: '请先创建队伍再添加队员！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    wx.navigateTo({
      url: '../addUserByTour/addUserByTour',
    })

  },
  //生成二维码：后台生成，返回前台
  erBtn: function (e) {
    console.log("生成二维码");
    var that = this
    wx.request({
      url: app.globalData.url + '/team/er',
      data: {
        userWxId: app.globalData.userWxId,
        startDate: this.data.dateStart,
        endDate: this.data.dateEnd
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          //captchaImage: "../images/erweima/" + res.data.tourTeamCode + "img.png"
          token: res.data.token,
          teamCode: res.data.teamCode,
          imgurl: res.data.re
        })
        wx.navigateTo({
          url: '../erTeam/erTeam?er=' + res.data.re,
        })


      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },

  //由队长修改游客信息按钮跳转
  updateUserBtn: function (e) {
    var text = e.currentTarget.dataset.text
    var list = text.split(",");
    var i = 0;
    var type = "";
    var userCode = "";
    for (i; i < list.length; i++) {
      type = list[0];
      userCode = list[1];
    }
    wx.navigateTo({
      url: '../addUserByTour/addUserByTour?userCode=' + userCode + '&type=' + type,
    })
  }, 
  //由队长删除游客信息按钮跳转
  delUserBtn: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        
        if (sm.confirm) {
          
          wx.request({
            url: app.globalData.url + '/userByTour/delUserByCode',
            data: {
              userCode: e.currentTarget.dataset.text,
              teamCode: app.globalData.teamCode
            },
            method: 'post',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              that.onLoad(that.data.optdata)
            },
            fail: function (res) {
              console.log("--------fail--------");
            }
          })
         
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })

    
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    if (options.start) {
      that.setData({
        optdata: options,
        startDate: options.start,
        endDate: options.end
      })
    }
    //发起网络请求判断当前队伍是否为自己创建的队伍
    wx.request({
      url: app.globalData.url + '/team/queryIsMyTeam',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        userWxId: app.globalData.userWxId,
        teamCode: app.globalData.teamCode
      },
      success: function (result) {
        console.log('result')
        console.log(result)
        if (result.data.success) {
          wx.request({
            url: app.globalData.url + '/userByTour/queryUser',
            data: {
              teamCode: app.globalData.teamCode
            },
            method: 'post',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res);
              that.setData({
                sumNum: res.data.length,
                users: res.data
              })

            },
            fail: function (res) {
              console.log("--------fail--------");
            }
          })
        } else {
          wx.navigateBack({

          })
          wx.showToast({
            title: '当前已加入他人队伍，不允许管理队员！！！！！',
            icon: 'none',
            duration: 2000,
            mask: false
          })

        }
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
      wx.request({
        url: app.globalData.url + '/userByTour/queryUser',
        data: {
          teamCode: app.globalData.teamCode
        },
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          that.setData({
            sumNum: res.data.length,
            users: res.data
          })

        },
        fail: function (res) {
          console.log("--------fail--------");
        }
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