// pages/addTeam/addTeam.js
var util = require('../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    captchaImage: "../images/image.png"
  },
  //获取用户输入的团队名称
  teamNameInput: function (e) {
    this.setData({
      teamName: e.detail.value
    })
  },
  //  点击开始日期组件确定事件  
  bindDateStartChange: function (e) {
    if (e.detail.value < util.formatTime(new Date())) {
      wx.showToast({
        title: '开始日期不能小于当前日期！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
    } else {
      this.setData({
        dateStart: e.detail.value
      })
    }    
  },
  //  点击结束日期组件确定事件  
  bindDateEndChange: function (e) {
    if (e.detail.value < this.data.dateStart){
      wx.showToast({
        title: '结束日期不能小于开始日期！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
    }else{
      this.setData({
        dateEnd: e.detail.value
      })
    }
   
  },
  //保存团队创建信息
  creatBtn: function (e) {
    if (this.data.dateEnd < this.data.dateStart) {
      wx.showToast({
        title: '结束日期不能小于开始日期,请选择日期！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    var that = this
    wx.request({
      url: app.globalData.url+'/team/add',
      data: {
        userWxId: app.globalData.userWxId,
        teamName: this.data.teamName,
        startDate: this.data.dateStart,
        endDate: this.data.dateEnd
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        app.globalData.teamCode = res.data.teamCode
        that.setData({
          teamName: res.data.teamName
          
        })
        wx.showToast({
          title: '队伍创建成功！请添加队员吧！！！',
          icon: 'none',
          duration: 2000,
          mask: false
        })
        return
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },
  //由队长添加游客信息按钮跳转
  userBtn: function (e) {
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
        url: '../userByTour/userByTour',
      })
   
  },
  //生成二维码：后台生成，返回前台
  erBtn: function (e) {
    console.log("生成二维码");
    var that = this
    wx.request({
      url: app.globalData.url +'/team/er',
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
            captchaImage: "../images/erweima/" + res.data.tourTeamCode + "img.png"
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
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      dateStart: time,
      dateEnd:time
    });
    var that = this
    wx.request({
      url: app.globalData.url + '/team/queryTeam',
      data: {
        userWxId: app.globalData.userWxId,
        teamName: '',
        startDate: this.data.dateStart,
        endDate: this.data.dateEnd
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.length>0){
          app.globalData.teamCode = res.data[0].tourTeamCode,
            that.setData({
              teamName: res.data[0].tourTeamName,
              dateStart: res.data[0].tourTeamDate,
              dateEnd: res.data[0].tourTeamLoseDate
            })
        }
        
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