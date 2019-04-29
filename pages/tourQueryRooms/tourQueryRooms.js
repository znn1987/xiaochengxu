// pages/roomAssign/roomAssign.js
var util = require('../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //查询房间数量
  queryTypes: function (e) {
    
    var that = this
    wx.request({
      url: app.globalData.url + '/needRoom/queryTeamNeedRoomByTeam',
      data: {
        hotelPhone: "",
        teamCode: app.globalData.teamCode,
        startDate: this.data.dateStart,
        endDate: this.data.dateEnd
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          datas: res.data
        })

      },
      fail: function (res) {
        console.log("--------fail--------");
      }
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
      url: '../roomOnLine/roomOnLine?hotelPhone=' + hotelPhone + '&roomType=' + roomType + '&roomTypeName=' + roomTypeName + '&roomNum=' + roomNum + '&inDate=' + this.data.inDate + '&outDate=' + this.data.outDate
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    // var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    // this.setData({
    //   dateStart: time,
    //   dateEnd: time
    // });
    var that = this
    if (options.inDate != undefined) {
      that.setData({
        inDate: options.inDate
      })
    }
    if (options.outDate != undefined) {
      that.setData({
        outDate: options.outDate
      })
    }

    
    //查询酒店分配房间
    wx.request({
      url: app.globalData.url + '/room/queryRoomsNum',
      data: {
        teamCode: app.globalData.teamCode,
        inDate: options.inDate,
        outDate: options.outDate
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.length>0){
          that.setData({
            rooms: res.data
          })
        }else{
          wx.navigateBack({

          })
          setTimeout(function () {
            wx.showToast({
              title: '暂无房间，请联系宾馆分房或自定义分房！！！',
              icon: 'none',
              duration: 2000,
              mask: false
            })
          }, 1000)
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