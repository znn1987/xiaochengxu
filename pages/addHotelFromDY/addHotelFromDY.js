// pages/addHotelFromDY/addHotelFromDY.js
var util = require('../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamCode: app.globalData.teamCode,
    dateStart:'',
    dateEnd:'',
    typeNo1:{
      type: 1,
      number:''
    } ,
    typeNo2: {
      type: 2,
      number: ''
    },
    typeNo3: {
      type: 3,
      number: ''
    },
    typeNo4: {
      type: 4,
      number: ''
    },
    hotel_Name:'',
    hotel_Number:'',
  },

  button_query: function () {
    var that = this
    if (that.data.hotel_Number == '' || that.data.hotel_Number == 'underfined') {
      wx.showToast({
        title: '电话不能为空！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return;
    }
    wx.request({
      url: app.globalData.url + '/room/queryRoomsByTour',
      data: {
        hotelPhone: that.data.hotel_Number,
        teamCode: app.globalData.teamCode,
        startDate: that.data.dateStart,
        endDate: that.data.dateEnd,
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.length>0){
          that.setData({
            hotel_Name: res.data[0].hotelName
          })
        }
        for(var i=0;i<res.data.length;i++){
          if (res.data[i].roomType == 1) {
            that.setData({
              hotel_Name: res.data[i].hotelName,
              typeNo1: {
                type: 1,
                number: res.data[i].roomNums
              }
            })
          }
          if (res.data[i].roomType == 2) {
            that.setData({
              typeNo2: {
                type: 2,
                number: res.data[i].roomNums
              }
            })
          }
          if (res.data[i].roomType == 3) {
            that.setData({
              typeNo3: {
                type: 3,
                number: res.data[i].roomNums
              }
            })
          }
          if (res.data[i].roomType == 4) {
            console.log(res.data[i].roomNums)
            that.setData({
              typeNo4: {
                type: 4,
                number: res.data[i].roomNums
              }
            })
          }
        }
        console.log(that.data.typeNo2.number)
        
      },
      fail: function (res) {
        console.log("--------fail--------" + res);
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
    console.log(this.data.dateStart)
  },
  //  点击开始日期组件确定事件  
  bindDateStartChange: function (e) {
    this.setData({
      dateStart: e.detail.value
    })
  },
  //点击结束日期组件确定事件  
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
  checkFormat:function(e){
    var that = this
    var number = e.detail.value
    console.log(number)
    var list = number.split(',')
    var listSize = list.length
    var listNo2 = number.split('，')
    var list2 = listNo2.length
    if (listSize!=list2&&listSize>list2){
      list = number.split(',')
      for(var i=0;i<listSize;i++){
        if(list[i]==""){
          wx.showModal({
            title: '提示',
            content: '房间号不能为空',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        
        }
      }
    }else{
      list = number.split('，')
      for (var i = 0; i < listSize; i++) {
        if (list[i] == "") {
          
          wx.showModal({
            title: '提示',
            content: '房间号不能为空',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })

        }
      }
    }
    console.log(e)
    var obj =e.currentTarget.id
    if(obj==1){
      that.setData({
        typeNo1:{
          type:1,
          number:number
        }
      })
    }
    if (obj == 2) {
      that.setData({
        typeNo2: {
          type: 2,
          number: number
        }
      })
    }
    if (obj == 3) {
      that.setData({
        typeNo3: {
          type: 3,
          number: number
        }
      })
    }
    if (obj ==4) {
      that.setData({
        typeNo4: {
          type: 4,
          number: number
        }
      })
    }
    console.log(that.data.typeNo1)
  },
  setHotelName:function(e){
    var that = this
    that.setData({
      hotel_Name: e.detail.value
      
    })
  },
  setHotelNumber: function (e) {
    var that = this
    that.setData({
      hotel_Number: e.detail.value
    })

  },
  button_cancel: function () {
    var that = this
    if (that.data.hotel_Number == '' || that.data.hotel_Number == 'underfined' ){
      wx.showToast({
        title: '电话不能为空！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {

        if (sm.confirm) {
            wx.request({
              url: app.globalData.url + '/room/delRoomsByTour',
              data: {
                hotelPhone: that.data.hotel_Number,
                teamCode: app.globalData.teamCode,
                inDate: that.data.dateStart,
                outDate: that.data.dateEnd,
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
                console.log("--------fail--------" + res);
              }
            })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  button_save:function(){
    var that = this
    if (that.data.hotel_Number == '' || that.data.hotel_Number == 'underfined') {
      wx.showToast({
        title: '电话不能为空！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return;
    }
    console.log(this.data.typeNo1.number)
    console.log(this.data.typeNo2.number)
    console.log(this.data.typeNo3.number)
    console.log(this.data.typeNo4.number)
    wx.request({
      url: app.globalData.url + '/room/saveRoomsByTour',
      data: {
        hotelName: that.data.hotel_Name,
        hotelPhone: that.data.hotel_Number,
        teamCode: app.globalData.teamCode,
        roomType1: that.data.typeNo1.type,
        roomType2: that.data.typeNo2.type,
        roomType3: that.data.typeNo3.type,
        roomType4: that.data.typeNo4.type,
        rooms1: that.data.typeNo1.number,
        rooms2: that.data.typeNo2.number,
        rooms3: that.data.typeNo3.number,
        rooms4: that.data.typeNo4.number,
        inDate: that.data.dateStart,
        outDate: that.data.dateEnd,
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        setTimeout(function () {
        wx.navigateTo({
          url: '../tourQueryRooms/tourQueryRooms?inDate=' + that.data.dateStart + '&outDate=' + that.data.dateEnd,
        })
        }, 1000)
      },
      fail: function (res) {
        console.log("--------fail--------"+res);
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