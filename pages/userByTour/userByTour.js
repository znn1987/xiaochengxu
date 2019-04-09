// pages/userByTour/userByTour.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0
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
              that.onLoad()
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
  onLoad: function () {
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
        console.log(res);
        that.setData({
          sumNum:res.data.length,
          users:res.data
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