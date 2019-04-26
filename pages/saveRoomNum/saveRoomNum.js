// pages/saveRoomNum/saveRoomNum.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //获取用户输入的房间号
  roomNumInput: function (e) {
    var that = this
    that.setData({
      rooms: e.detail.value
    })
  },
  //返回
  cancel: function () {
    wx.navigateBack({

    })
  },

  //保存个人信息
  saveRooms: function (e) {
    if ( this.data.roomSum == 0){

    }else{
      if (this.data.rooms == "" || this.data.tourCode == "" ) {
        wx.showToast({
          title: '房间号码不能为空！！',
          icon: 'none',
          duration: 2000,
          mask: false
        })
        return
      }
      var list = this.data.rooms.split(",");
      if (list.length != this.data.roomSum) {
        list = this.data.rooms.split("，");
      }
      if (list.length != this.data.roomSum){
        wx.showToast({
          title: '房间数与需要数目不同，请检查是否输入有误！！',
          icon: 'none',
          duration: 2000,
          mask: false
        })
        return
      }
      var i=0;
      for (i; i < list.length;i++){
        if(list[i]==""){
          wx.showToast({
            title: '房间号不能为空，请检查是否输入有误！！',
            icon: 'none',
            duration: 2000,
            mask: false
          })
          return
        }
      }
    }
    wx.request({
      url: app.globalData.url + '/room/saveRooms',
      data: {
        hotelPhone: this.data.hotelPhone,
        teamCode: this.data.teamCode,
        roomType: this.data.roomType,
        rooms: this.data.rooms,
        inDate: this.data.inDate,
        outDate: this.data.outDate
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.hotelPhone != undefined) {
      that.setData({
        hotelPhone: options.hotelPhone
      })
    }
    if (options.teamCode != undefined) {
      that.setData({
        teamCode: options.teamCode
      })
    }
    if (options.roomType != undefined) {
      that.setData({
        roomType: options.roomType
      })
    }
    if (options.roomSum != undefined) {
      that.setData({
        roomSum: options.roomSum
      })
    }
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
    //加载查询房间号
    var that = this
    wx.request({
      url: app.globalData.url + '/room/queryRooms',
      data: {
        hotelPhone: this.data.hotelPhone,
        teamCode: this.data.teamCode,
        roomType: this.data.roomType,
        inDate: this.data.inDate,
        outDate: this.data.outDate
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          teamName: res.data.teamName,
          userCodeName: res.data.userCodeName,
          travel: res.data.travel,
          roomTypeName: res.data.typeName
        })
        if (res.data.roomNum != null) {
          that.setData({
            roomNum: res.data.roomNum
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