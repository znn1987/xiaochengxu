// pages/team/team.js
var util = require('../../utils/util.js')
var amapFile = require('../../utils/amap-wx.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sign: 0,
    assemble: 0,
    noticeCode: 0,
    teamName: '数据加载中……',
    code: 1,
    address: '',
    count: 0
  },
  //最新公告跳转
  newNotice: function (e) {
    var text = e.currentTarget.dataset.text
    wx.navigateTo({
      url: '../newNotice/newNotice?noticeCode=' + text,
    })
  },
  //全部公告跳转
  allNotice: function (e) {
    wx.navigateTo({
      url: '../allNotice/allNotice',
    })
  },

  //创建队伍页面按钮跳转
  addTeam:  function (e)  {
    if (app.globalData.userType==1 && app.globalData.userState==1){
      wx.navigateTo({
        url: '../addTeam/addTeam',
      })
    }else{
      if (app.globalData.userType != 1){
        return
      }
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
    if (app.globalData.userType!=1){
      wx.navigateBack({

      })
      return 
    }
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
    if (app.globalData.userType == 1 && app.globalData.userState == 1) {
      wx.navigateTo({
        url: '../userByTour/userByTour?start=' + this.data.start + '&end=' + this.data.end,
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
  //队长在线分房--房间号码查看
  room: function (e) {
    if (app.globalData.teamCode == null) {
      wx.showToast({
        title: '请先创建队伍再进行分房！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    if (app.globalData.userType == 1 && app.globalData.userState == 1) {
      //发起网络请求判断当前队伍是否为自己创建的队伍
      wx.request({
        url: app.globalData.url + '/team/queryIsMyTeam',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          userWxId: app.globalData.userWxId,
          teamCode: this.data.code
        },
        success: function (result) {
          console.log(result)
          if (result.data.success) {
            wx.navigateTo({
              url: '../room/room',
            })
          } else {
            wx.showToast({
              title: '当前已加入他人队伍，不允许设置分房！！！！！',
              icon: 'none',
              duration: 2000,
              mask: false
            })

          }
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
  //队长房间查看
  queryRoom: function (e) {
    if (app.globalData.teamCode == null) {
      wx.showToast({
        title: '请先加入队伍！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    wx.navigateTo({
      url: '../queryRoom/queryRoom',
    })
  },
  //队长编辑公告
  noticeSet: function (e) {
    if (app.globalData.teamCode == null) {
      wx.showToast({
        title: '请先创建队伍再添加公告！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
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
            wx.navigateTo({
              url: '../notice/notice',
            })
        } else {
          wx.navigateTo({
            url: '../allNotice/allNotice',
          })

        }
      }
    })

 
  },
  //游客房间查看
  queryRoom: function (e) {
    if (app.globalData.teamCode == null) {
      wx.showToast({
        title: '请先加入队伍！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    wx.navigateTo({
      url: '../queryRoom/queryRoom',
    })
  },
  //游客签到
  signTeam: function (e) {
    if (app.globalData.teamCode == null) {
      wx.showToast({
        title: '请先加入队伍！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    wx.navigateTo({
      url: '../signTeam/signTeam',
    })
  },
  //游客定点集合
  assemble: function (e) {
    if (app.globalData.teamCode == null) {
      wx.showToast({
        title: '请先加入队伍！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    wx.navigateTo({
      url: '../assembleAndInfo/assembleAndInfo',
    })
  },
  //游客攻略
  strategy: function (e) {

    wx.showToast({
      title: '此功能即将开放！！',
      icon: 'none',
      duration: 2000,
      mask: false
    })
  },
  //游客特产
  shop: function (e) {

    wx.showToast({
      title: '此功能即将开放！！',
      icon: 'none',
      duration: 2000,
      mask: false
    })
  },
  //游客更多
  more: function (e) {

    wx.showToast({
      title: '此功能即将开放！！',
      icon: 'none',
      duration: 2000,
      mask: false
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

    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    
    var that = this
    setTimeout(function () {
      //要延时执行的代码
      // 再通过setData更改Page()里面的data，动态更新页面的数据
      that.setData({
        dateStart: time,
        dateEnd: time,
        userWxId: app.globalData.userWxId,
        userType: app.globalData.userType,
        noticeCode: 0
      });

    wx.request({
      url: app.globalData.url + '/team/queryTeam',
      data: {
        userWxId: app.globalData.userWxId,
        teamName: '',
        startDate: time,
        endDate: time
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
            code: res.data[0].tourTeamCode,
            teamName: res.data[0].tourTeamName,
            start: res.data[0].tourTeamDate,
            end: res.data[0].tourTeamLoseDate
          })

          if (app.globalData.userType == 1 && app.globalData.userState == 1) {
            //发起网络请求判断当前队伍是否为自己创建的队伍
            wx.request({
              url: app.globalData.url + '/team/queryIsMyTeam',
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              data: {
                userWxId: app.globalData.userWxId,
                teamCode: code
              },
              success: function (result) {
                console.log(result)
                if (result.data.success) {
                 
                } else {
                  
                }
              }
            })

          }


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

          //有队伍才能查公告
          wx.request({
            url: app.globalData.url + '/notice/queryNoticeUser',
            data: {
              userWxId: app.globalData.userWxId,
              code: '',
              teamCode: code,
              isRead: '0'
            },
            method: 'post',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if (res.data.length > 0) {
                that.setData({
                  title: res.data[0].title,
                  noticeCode: res.data[0].code
                })
              }else{
                that.setData({
                  noticeCode: 0
                })
              }

            },
            fail: function (res) {
              console.log("--------fail--------");
            }
          })
          //有队伍才能查签到
          wx.request({
            url: app.globalData.url + '/teamUser/queryTeamUserByCode',
            data: {
              userCode: app.globalData.userWxId,
              teamCode: code
            },
            method: 'post',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
             
              that.setData({
                sign: res.data.isSign
              })

            },
            fail: function (res) {
              console.log("--------fail--------");
            }
          })
          //有队伍才能查集合
          wx.request({
            url: app.globalData.url + '/teamAssemble/queryByCode',
            data: {
              teamCode: code,
              userWxId: app.globalData.userWxId,
              userType: app.globalData.userType
            },
            method: 'post',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if (res.data.assembleDress) {
                that.setData({
                  assemble: 1
                })
              }
            }
          })
        }else{
          if (app.globalData.userType==1){
            that.setData({
              noticeCode: 0,
              code: 1,
              teamName: '点击创建队伍！！'
            })
          }else{
            that.setData({
              noticeCode: 0,
              code: 1,
              teamName: '当前没有加入任何队伍！！'
            })
          }
          
        }

      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
    }, 1000) 
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
      that.setData({
        teamName: '数据加载中……',
        code: 1
      });
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