// pages/assembleSet/assembleSet.js
var util = require('../../utils/util.js')
const app = getApp();
var amapFile = require('../../utils/amap-wx.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: 'f149525102fd153e6f12230efd1996bf',
    show: false,
    currentLo: null,
    currentLa: null,
    newCurrentLo: null,
    newCurrentLa: null,
    distance: 0,
    duration: 0,
    markers: null,
    scale: 16,
    polyline: null,
    statusType: 'walk',
    includePoints: []
  },

  //  点击日期组件确定事件  
  bindAssembleDateChange: function (e) {
    this.setData({
      assembleDate: e.detail.value
    })
  },
  //  点击时间组件确定事件  
  bindAssembleTimeChange: function (e) {
      this.setData({
        assembleTime: e.detail.value
      })
  },
  //获取地址
  getAddress(e) {
    var _this = this;
    wx.chooseLocation({
      success(res) {
        var markers = _this.data.markers;
        markers.push({
          id: 0,
          longitude: res.longitude,
          latitude: res.latitude,
          title: res.address,
          width: 32,
          height: 32
        });

        var points = _this.data.includePoints;
        points.push({
          longitude: res.longitude,
          latitude: res.latitude
        });
        _this.setData({
          assembleDress: res.name,
          newCurrentLo: res.longitude,
          newCurrentLa: res.latitude,
          includePoints: points,
          markers: markers,
          show: true
        });
        _this.getPolyline(_this.data.statusType);
      }
    });
  }, 
  drawPolyline(self, color) {
    return {
      origin: this.data.currentLo + ',' + this.data.currentLa,
      destination: this.data.newCurrentLo + ',' + this.data.newCurrentLa,
      success(data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        self.setData({
          distance: data.paths[0].distance,
          duration: parseInt(data.paths[0].duration / 60),
          polyline: [{
            points: points,
            color: color,
            width: 6,
            arrowLine: true
          }]
        });
      }
    }
  },
  getPolyline(_type) {
    var amap = new amapFile.AMapWX({ key: this.data.key });
    var self = this;
    switch (_type) {
      case 'walk':
        amap.getWalkingRoute(this.drawPolyline(this, "#1afa29"));
        break;
      case 'car':
        amap.getDrivingRoute(this.drawPolyline(this, "#0091ff"));
        break;
      case 'ride':
        amap.getRidingRoute(this.drawPolyline(this, "#1296db"));
        break;
      default:
        return false;
    }
  },
  goTo(e) {
    var _type = e.currentTarget.dataset.type;
    this.setData({ statusType: _type });
    this.getPolyline(_type);
  },
  //查询
  queryAssemble: function () {
    var that = this
    wx.request({
      url: app.globalData.url + '/teamAssemble/query',
      data: {
        teamCode: app.globalData.teamCode,
        userWxId: app.globalData.userWxId,
        date: this.data.assembleDate,
        time: this.data.assembleTime
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.assembleDress){
          that.setData({
            assembleDress: res.data.assembleDress
          })
        }else{
          that.setData({
            assembleDress: '没有此时间的集合任务！（点击设置集合地点）'
          })
        }
        
       
      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },
  //选择照片
  photoBtn: function (e) {
    
    var _this = this
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: [ 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (photo) {
        // _this.setData({
        //   path: photo.tempFilePaths[0]
        // })
        wx.getImageInfo({
          src: photo.tempFilePaths[0],
          success: function (res) {
            console.log(res)
            console.log('344')
            const ctx = wx.createCanvasContext('myCanvas')//画布
            //设置canvas尺寸
            console.log(res.height)
            console.log(res.width)
            var towidth = 344;           //按宽度344px的比例压缩
            var toheight = Math.trunc(344 * res.height / res.width   );  //根据图片比例换算出图片高度
            console.log(towidth)
            console.log(toheight)
            _this.setData({
              canvas_w: towidth,
              canvas_h: toheight
            })
            ctx.drawImage(photo.tempFilePaths[0], 0, 0, towidth, toheight)
            // ctx.draw()
             ctx.draw(false, function () {
               wx.showToast({
                 title: '图片加载中……',
                 icon: 'none',
                 duration: 10000,
                 mask: false
               })
               setTimeout(function () {
                  wx.canvasToTempFilePath({
                    canvasId: 'myCanvas',
                    fileType: "jpg",
                    width: res.width,
                    height: res.height,
                    destWidth: towidth,
                    destHeight: toheight,
                    success: function (res) {
                      console.log(ctx)
                      console.log(res.tempFilePath)
                      _this.setData({
                      path: res.tempFilePath,
                      pathType:1
                      })
                    }
                  }, 1000)
               }, 8000)
             })
          }
          
        })
        
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  
  /**
  * 上传照片
  */
  uploadImg: function () {
    var that = this
    wx.uploadFile({
      url: app.globalData.url + '/teamAssemble/upload', 
      filePath: that.data.path,
      header: { "Content-Type": "multipart/form-data" },
      name: 'file',
      formData: {
        teamCode: app.globalData.teamCode,
        userWxId: app.globalData.userWxId,
        date: that.data.assembleDate,
        time: that.data.assembleTime
      },
      success: function (res) {
        var data = JSON.parse(res.data)
        if (data.success){
          wx.navigateBack({

          })
        }else{
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000,
            mask: false
          })
         
        }
       
      }
    })
   
  },

  //删除
  deleteAssemble: function () {
    wx.request({
      url: app.globalData.url + '/teamAssemble/del',
      data: {
        teamCode: app.globalData.teamCode,
        userWxId: app.globalData.userWxId,
        date: this.data.assembleDate,
        time: this.data.assembleTime
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
  //获取地址
  assembleDressInput: function (e) {
    var that = this
    that.setData({
      assembleDress: e.detail.value
    })
  },
  //修改保存
  saveAssemble: function () {
    if (!this.data.assembleDress){
      wx.showToast({
        title: '没有选择集合地点！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    if (!app.globalData.teamCode) {
      wx.showToast({
        title: '没有创建队伍！！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    wx.request({
      url: app.globalData.url + '/teamAssemble/add',
      data: {
        teamCode: app.globalData.teamCode,
        userWxId: app.globalData.userWxId,
        assembleDate: this.data.assembleDate,
        assembleTime: this.data.assembleTime,
        assembleDress: this.data.assembleDress,
        longitude: this.data.newCurrentLo,
        latitude: this.data.newCurrentLa,
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if(res.data.success){
          wx.navigateTo({
            url: '../assembleSet/assembleSet',
          })
        }
       
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
    console.log(app)
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var date = util.formatTime(new Date());
    var time = util.formatMin(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      assembleDate: date,
      assembleTime: time,
      pathType: 0
    });
    var _this = this;
    wx.getLocation({

      success(res) {
        console.log(res)
        _this.setData({
          currentLo: res.longitude,
          currentLa: res.latitude,
          includePoints: [{
            longitude: res.longitude,
            latitude: res.latitude
          }],
          markers: [{
            id: 0,
            longitude: res.longitude,
            latitude: res.latitude,
            title: res.address,
            width: 32,
            height: 32
          }]
        });
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