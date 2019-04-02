// pages/oldTeam/oldTeam.js
var util = require('../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    teamSum: 0,
    userSum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app)
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      dateStart: time,
      dateEnd: time,
      userType: app.globalData.userType
    });
  },
  //  点击开始日期组件确定事件  
  bindDateStartChange: function (e) {
    this.setData({
      dateStart: e.detail.value
    })
  },
  //  点击结束日期组件确定事件  
  bindDateEndChange: function (e) {
    if (e.detail.value < this.data.dateStart) {
      wx.showToast({
        title: '结束日期不能小于开始日期！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
    } else {
      this.setData({
        dateEnd: e.detail.value
      })
    }

  },
  //查询历史队伍
  queryOldTeam: function (e) {
    var that = this
      wx.request({
      url: app.globalData.url + '/teamUser/queryOldTeam',
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
        that.setData({
          teams: res.data
        })
        
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
    //如果是导游查询时间段内带队数量，以及带队成员数量
    if (app.globalData.userType == 1){
      wx.request({
        url: app.globalData.url + '/teamUser/queryOldTeamSum',
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
          that.setData({
            teamSum: res.data.teamSum,
            userSum: res.data.userSum
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