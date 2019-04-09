// pages/roomOnLine/roomOnLine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxId:[]
  },
  // 获取多选框list中选中的值和对应的id
  checkboxChange: function (e) {
    var that = this
    var wxId=[];
    for (var i = 0; i < e.detail.value.length; i++) {
      wxId[i] = e.detail.value[i];
    }
    that.setData({
      wxId: wxId
    })
  },
  //在线分房--保存房间用户
  saveRoomUser: function (e) {
    var that = this
    if (this.data.flag == true){
      wx.showToast({
        title: '修改房间成员请重置后重新填写！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    wx.request({
      url: app.globalData.url + '/hotelTeamUser/saveRoomUser',
      data: {
        hotelPhone: this.data.hotelPhone,
        roomType: this.data.roomType,
        roomNum: this.data.roomNum,
        inDate: this.data.inDate,
        outDate: this.data.outDate,
        teamCode: app.globalData.teamCode,
        userWxId: this.data.wxId
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
  //在线分房--重置房间用户
  deleteRoomUser: function (e) {
    var that = this
    wx.request({
      url: app.globalData.url + '/hotelTeamUser/deleteRoomUser',
      data: {
        hotelPhone: this.data.hotelPhone,
        roomType: this.data.roomType,
        roomNum: this.data.roomNum,
        inDate: this.data.inDate,
        outDate: this.data.outDate,
        teamCode: app.globalData.teamCode,
        userPhone: this.data.hotelPhone
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
    if (options.roomType != undefined) {
      that.setData({
        roomType: options.roomType
      })
    }
    if (options.roomTypeName != undefined) {
      that.setData({
        roomTypeName: options.roomTypeName
      })
    }
    if (options.roomNum != undefined) {
      that.setData({
        roomNum: options.roomNum
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
    var that = this
    //先查询此房间是否已分配
    wx.request({
      url: app.globalData.url + '/hotelTeamUser/queryRoomUser',
      data: {
        hotelPhone: this.data.hotelPhone,
        roomType: this.data.roomType,
        roomNum: this.data.roomNum,
        inDate: this.data.inDate,
        outDate: this.data.outDate,
        teamCode: app.globalData.teamCode
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
       
        if (res.data == "") {
          //查询未分配房间的用户  
          wx.request({
            url: app.globalData.url + '/userByTour/userIsHotel',
            data: {
              teamCode: app.globalData.teamCode,
              inDate: options.inDate,
              outDate: options.outDate,
            },
            method: 'post',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              that.setData({
                hotelUsers: res.data
              })
            },
            fail: function (res) {
              console.log("--------fail--------");
            }
          })

        }else{
          that.setData({
            hotelUsers: res.data,
            flag: true
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