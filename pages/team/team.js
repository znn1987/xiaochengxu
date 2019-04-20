// pages/team/team.js
var util = require('../../utils/util.js')
var amapFile = require('../../utils/amap-wx.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: 1,
    address: '',
    count: 0
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
    if(this.data.code==1){
      wx.showToast({
        title: '请先创建队伍！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    
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
    console.log(app)
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });
    //获取位置省市区及天气
    this.getLocation();

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
        console.log(res)
        var code = '';
        if (res.data.length > 0) {
          code = res.data[0].tourTeamCode
          app.globalData.teamCode = res.data[0].tourTeamCode
          that.setData({
            code: res.data[0].tourTeamCode,
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
                  signUser: res.data.signUser
                })
              }

            },
            fail: function (res) {
              console.log("--------fail--------");
            }
          })

        }else{
          that.setData({
            teamName: '当前没有加入任何队伍！！'
          })
        }

      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },

  getLocation: function () {
    const that = this;
    var myAmapFun = new amapFile.AMapWX({ key: 'f149525102fd153e6f12230efd1996bf' });
    //获取位置省市区
    myAmapFun.getRegeo({
      success: function (res) {
        console.log(res)
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