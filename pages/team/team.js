// pages/team/team.js
var util = require('../../utils/util.js')
var amapFile = require('../../utils/amap-wx.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: ''
  },

  //创建队伍页面按钮跳转
  addTeam:  function (e)  {
    if (app.globalData.userType==1 && app.globalData.userState==1){
      wx.navigateTo({
        url: '../addTeam/addTeam',
      })
    }else{
      wx.showToast({
        title: '此次版本只允许注册导游创建队伍！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }  
    
  },
  //我的队伍页面按钮跳转
  myTeam: function (e) {
    wx.navigateTo({
      url: '../myTeam/myTeam',
    })
  },

  //历史队伍页面按钮跳转
  oldTeam: function (e) {
    wx.navigateTo({
      url: '../oldTeam/oldTeam',
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
      time: time
    });
    //获取位置省市区及天气
    this.getLocation();
  },

  getLocation: function () {
    const that = this;
    var myAmapFun = new amapFile.AMapWX({ key: 'f149525102fd153e6f12230efd1996bf' });
    //获取位置省市区
    myAmapFun.getRegeo({
      success: function (res) {
        that.setData({
          address: res[0].regeocodeData.addressComponent.province+res[0].regeocodeData.addressComponent.city + res[0].regeocodeData.addressComponent.district
        })
      }
      ,
    })
    //获取天气
    myAmapFun.getWeather({
      success: function (res) {
        //成功回调
        that.setData({
          weather: res
        })
      },
      fail: function (info) {
        //失败回调
        console.log(info)
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