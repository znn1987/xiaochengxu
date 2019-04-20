// pages/assemble/assemble.js
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
    markers: [],
    scale: 16,
    polyline: [],
    statusType: '',
    includePoints: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // const that = this;
    // var myAmapFun = new amapFile.AMapWX({ key: 'f149525102fd153e6f12230efd1996bf' });
    // //获取位置省市区
    // myAmapFun.getRegeo({
    //   success: function (res) {
    //     console.log(res)
    //     that.setData({
          
    //     })
    //   }

    //     })
    var _this = this;
    var markers = _this.data.markers;
    var points = _this.data.includePoints;
    wx.getLocation({
      
      success(res) {
        markers.push({
          id: 0,
          longitude: res.longitude,
          latitude: res.latitude,
          title: res.address,
          // iconPath: '../../src/images/navi_s.png',
          width: 32,
          height: 32
        });

        points.push({
          longitude: res.longitude,
          latitude: res.latitude
        });
        _this.setData({
          currentLo: res.longitude,
          currentLa: res.latitude,
          includePoints: points,
          markers: markers
        });
        
      }
    })
    var that = this;
    //获取集合位置 等
    if (options.longitude != undefined) {
      console.log('if')
      that.setData({
        newCurrentLo: options.longitude,
        newCurrentLa: options.latitude,
        assembleDress: options.assembleDress
      })

      markers.push({
        id: 0,
        longitude: options.longitude,
        latitude: options.latitude,
        title: options.assembleDress,
        width: 32,
        height: 32
      });


      points.push({
        longitude: options.longitude,
        latitude: options.latitude
      });
      _this.setData({
        assembleDress: options.assembleDress,
        newCurrentLo: options.longitude,
        newCurrentLa: options.latitude,
        includePoints: points,
        markers: markers,
        show: true
      });
      _this.getPolyline('walk');
    }
  },
  getAddress(e) {
    console.log(e)
    var _this = this;
    if (_this.data.markers.length>1) {
      wx.chooseLocation({
        success(res) {
          console.log(res)
          var markers = _this.data.markers;
          markers.splice(0,1,{
            id: 0,
            longitude: res.longitude,
            latitude: res.latitude,
            title: res.address,
            // iconPath: '../../src/images/navi_e.png',
            width: 32,
            height: 32
          });

          var points = _this.data.includePoints;
          points.splice(0,1,{
            longitude: res.longitude,
            latitude: res.latitude
          });
          _this.setData({
            distance: 0,
            duration: 0,
            polyline: [],
            statusType: '',
            assembleDress: res.name,
            newCurrentLo: res.longitude,
            newCurrentLa: res.latitude,
            includePoints: points,
            markers: markers,
            show: true
          });

        }
      });
    }else{
      wx.chooseLocation({
        success(res) {
          console.log(res)
          var markers = _this.data.markers;
          markers.push({
            id: 0,
            longitude: res.longitude,
            latitude: res.latitude,
            title: res.address,
            // iconPath: '../../src/images/navi_e.png',
            width: 32,
            height: 32
          });

          var points = _this.data.includePoints;
          points.push({
            longitude: res.longitude,
            latitude: res.latitude
          });
          _this.setData({
            distance: 0,
            duration: 0,
            polyline: [],
            statusType: '',
            assembleDress: res.name,
            newCurrentLo: res.longitude,
            newCurrentLa: res.latitude,
            includePoints: points,
            markers: markers,
            show: true
          });

        }
      });
    }
    
  },
  drawPolyline(self, color) {
    var that = this;
    return {
      origin: that.data.currentLo + ',' + that.data.currentLa,
      destination: that.data.newCurrentLo + ',' + that.data.newCurrentLa,
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