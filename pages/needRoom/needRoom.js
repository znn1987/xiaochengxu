// pages/needRoom/needRoom.js
var util = require('../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type1: 0,
    type2: 0,
    type3: 0
  },
  //获取用户输入的酒店（宾馆）电话
  hotelPhoneInput: function (e) {
    var that = this
    that.setData({
      hotelPhone: e.detail.value
    })
  },
  //查询酒店信息
  queryHotel: function (e) {
    var that = this
    wx.request({
      url: app.globalData.url + '/sysHotel/queryHotelByPhone',
      data: {
        hotelPhone: this.data.hotelPhone
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if(res.data==""){
          that.setData({
            hotelName: "还未录入此酒店（宾馆）信息",
            hotelDress: "还未录入此酒店（宾馆）信息"
          })
        }else{
          that.setData({
            hotelName: res.data.sysHotelName,
            hotelDress: res.data.sysHotelDress
          })
        }
        
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },
  //查询房间数量
  queryTypes: function (e) {
    if (app.globalData.teamCode == null) {
      wx.showToast({
        title: '请先创建队伍！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    if (this.data.hotelPhone == null) {
      wx.showToast({
        title: '请先填写电话！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    var that = this
    wx.request({
      url: app.globalData.url + '/needRoom/queryTeamNeedRoomByTeam',
      data: {
        hotelPhone: this.data.hotelPhone,
        teamCode: app.globalData.teamCode,
        startDate: this.data.dateStart,
        endDate: this.data.dateEnd
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
          var i = 0;
          for(i;i<res.data.length;i++) {
            if(res.data[i].type==1){
              that.setData({
                type1Sum: res.data[i].sum
              })
            }
            if (res.data[i].type == 2) {
              that.setData({
                type2Sum: res.data[i].sum
              })
            }
            if (res.data[i].type == 3) {
              that.setData({
                type3Sum: res.data[i].sum
              })
            }

          }
       

      },
      fail: function (res) {
        console.log("--------fail--------");
      }
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
  //获取用户输入的大床房数量
  type1SumInput: function (e) {
    var that = this
    that.setData({
      type1: e.detail.value
    })
  },
  //获取用户输入的标准间数量
  type2SumInput: function (e) {
    var that = this
    that.setData({
      type2: e.detail.value
    })
  },
  //获取用户输入的三人间数量
  type3SumInput: function (e) {
    var that = this
    that.setData({
      type3: e.detail.value
    })
  },
  
  //保存房间数量
    saveTypes: function (e) {
      if (app.globalData.teamCode==null){
        wx.showToast({
          title: '请先创建队伍！！！',
          icon: 'none',
          duration: 2000,
          mask: false
        })
        return
      }
      if (this.data.hotelPhone == null) {
        wx.showToast({
          title: '请先填写电话！！！',
          icon: 'none',
          duration: 2000,
          mask: false
        })
        return
      }
      var that = this

      wx.request({
        url: app.globalData.url + '/needRoom/saveTeamNeedRoomByTeam',
        data: {
          hotelPhone: this.data.hotelPhone,
          teamCode: app.globalData.teamCode,
          type1: this.data.type1,
          type2: this.data.type2,
          type3: this.data.type3,
          startDate: this.data.dateStart,
          endDate: this.data.dateEnd
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
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      dateStart: time,
      dateEnd: time
    });
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