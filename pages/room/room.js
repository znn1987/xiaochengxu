// pages/room/room.js
var util = require('../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //在线分房--房间号码查看
  roomOnLine: function (e) {
    var text = e.currentTarget.dataset.text
    var list = text.split(",");
    var i = 0;
    var hotelPhone = "";
    var roomType = "";
    var roomTypeName = "";
    var roomNum = "";
    for (i; i < list.length; i++) {
      hotelPhone = list[0];
      roomType = list[1];
      roomTypeName = list[2];
      roomNum = list[3];
    }

    wx.navigateTo({
      url: '../roomOnLine/roomOnLine?hotelPhone=' + hotelPhone + '&roomType=' + roomType + '&roomTypeName=' + roomTypeName +'&roomNum=' + roomNum + '&inDate=' + this.data.dateStart + '&outDate=' + this.data.dateEnd,
    })
  },
   //在线分房--查询房间数目及类型
  queryNeedRoom: function(e) {
    if (app.globalData.teamCode == null) {
      wx.showToast({
        title: '请先创建队伍！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    wx.navigateTo({
      url: '../tourQueryRooms/tourQueryRooms',
    })
  },
  //在线分房--填写需要的房间数目及类型
  needRoom: function (e) {
    if (app.globalData.teamCode == null) {
      wx.showToast({
        title: '请先创建队伍！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    if (this.data.hotelUser == 0) {
      wx.showToast({
        title: '请先添加住宿队员！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    wx.navigateTo({
      url: '../needRoom/needRoom',
    })
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
  //在线分房--查询房间号码
  queryRoomNum: function (e) {
    var that = this
    //查询酒店分配房间
    wx.request({
      url: app.globalData.url + '/room/queryRoomsNum',
      data: {
        teamCode: app.globalData.teamCode,
        inDate: this.data.dateStart,
        outDate: this.data.dateEnd
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          rooms: res.data
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
      dateEnd: time
    });

    var that = this
    //查询团队总人数 及 住宿人数
    wx.request({
      url: app.globalData.url + '/userByTour/userSum',
      data: {
        teamCode: app.globalData.teamCode
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.length==0){
          that.setData({
            allUser: 0,
            hotelUser: 0
          })
        }else{
          that.setData({
            allUser: res.data.allUser,
            hotelUser: res.data.hotelUser
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
    //查询完成分房人数
    var that = this
    //查询未分配房间的用户
    wx.request({
      url: app.globalData.url + '/userByTour/userIsHotel',
      data: {
        teamCode: app.globalData.teamCode,
        inDate: this.data.dateStart,
        outDate: this.data.dateEnd
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          overUser: res.data.length
        })
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
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