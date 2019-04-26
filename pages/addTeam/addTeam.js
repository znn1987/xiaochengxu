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
    console.log(app)
    if (app.globalData.teamCode == null) {
      console.log('开始日期')
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
    }else{
      wx.showToast({
        title: '日期不可更改！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
    }  
  },
  //  点击结束日期组件确定事件  
  bindDateEndChange: function (e) {
    if (app.globalData.teamCode == null) {
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
    }else{
      wx.showToast({
        title: '日期不可更改！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
    }
  },
  //删除团队
  deleteBtn: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '删除队伍会将关于本队伍的所有信息全部删除，确定要删除队伍吗？',
      success: function (sm) {

        if (sm.confirm) {

          wx.request({
            url: app.globalData.url + '/team/del',
            data: {
              teamCode: app.globalData.teamCode
            },
            method: 'post',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              
              wx.navigateBack({

              })
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
    wx.showModal({
      title: '提示',
      content: '队伍创建后，日期不可更改，确定要创建吗？',
      success: function (sm) {

        if (sm.confirm) {

          wx.request({
            url: app.globalData.url + '/team/add',
            data: {
              userWxId: app.globalData.userWxId,
              teamName: that.data.teamName,
              startDate: that.data.dateStart,
              endDate: that.data.dateEnd
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
              wx.navigateBack({

              })
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
        console.log(res.data);
          that.setData({
            //captchaImage: "../images/erweima/" + res.data.tourTeamCode + "img.png"
            token: res.data.token,
            teamCode: res.data.teamCode,
            imgurl: res.data.re
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

          //发起网络请求判断当前队伍是否为自己创建的队伍
          wx.request({
            url: app.globalData.url + '/team/queryIsMyTeam',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
              userWxId: app.globalData.userWxId,
              teamCode: res.data[0].tourTeamCode
            },
            success: function (result) {
              console.log(result)
              if (result.data.success) {
                
              } else {
                wx.navigateBack({

                })
                wx.showToast({
                  title: '当前已加入他人队伍，不允许再次创建队伍！！！！！',
                  icon: 'none',
                  duration: 2000,
                  mask: false
                })
                
              }
            }
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