// pages/hotelInfo/hotelInfo.js
var util = require('../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //获取用户输入的名称
  hotelNameInput: function (e) {
    var that = this
    that.setData({
      hotelName: e.detail.value
    })
  },
  //获取用户输入的地址
  hotelDressInput: function (e) {
    var that = this
    that.setData({
      hotelDress: e.detail.value
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
  queryRoomDetail: function (e) {
    wx.navigateTo({
      url: '../queryRoomDetail/queryRoomDetail?hotelPhone=' + this.data.hotelPhone + '&inDate=' + this.data.dateStart + '&outDate=' + this.data.dateEnd,
    })
  },
  //查询订房队伍
  queryTeam: function (e) {
    var that = this
    wx.request({
      url: app.globalData.url + '/needRoom/queryTeamNeedRoom',
      data: {
        hotelPhone: this.data.hotelPhone,
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
  //保存酒店（宾馆）信息
  saveHotel: function (e) {
    var that = this
    wx.request({
      url: app.globalData.url + '/sysHotel/saveHotel',
      data: {
        hotelPhone: this.data.hotelPhone,
        hotelName: this.data.hotelName,
        hotelDress: this.data.hotelDress
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.onLoad()

      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },
  //打开填写房间号码页面
  saveRoomNum: function(e) {
    var text = e.currentTarget.dataset.text
    var list =  text.split(",");
    var i=0;
    var teamCode = "";
    var roomType = "";
    var roomSum = 0;
    var inDate = "";
    var outDate = "";
    for(i;i<list.length;i++){
      teamCode=list[0];
      roomType=list[1];
      roomSum=list[2];
      inDate = list[3];
      outDate = list[4];
    }
    wx.navigateTo({
      url: '../saveRoomNum/saveRoomNum?hotelPhone=' + this.data.hotelPhone+'&teamCode='+teamCode+'&roomType='+roomType+'&roomSum='+roomSum+'&inDate='+inDate+'&outDate='+outDate,
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
    })
    //查询酒店信息
    
      var that = this
      wx.request({
        url: app.globalData.url + '/sysHotel/queryHotel',
        data: {
          wxId: app.globalData.userWxId
        },
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          that.setData({
            hotelPhone: res.data.sysHotelPhone,
            hotelName: res.data.sysHotelName,
            hotelDress: res.data.sysHotelDress
          })

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