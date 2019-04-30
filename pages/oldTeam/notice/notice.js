// pages/notice/notice.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select:false,
    count: 0,
    code: ''
  },
  //下拉框
  bindShowMsg:function(){
    this.setData({
      select:!this.data.select
    })
  },
  //新增公告
  newNotice: function (e) {
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
      url: '../noticeSet/noticeSet'
    })
  },
  //删除公告
  delNotice: function (e) {
    if (app.globalData.teamCode == null) {
      wx.showToast({
        title: '请先创建队伍！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    var that = this
    if (this.data.code == ''){
      return
    }
    if (this.data.code > this.data.oldCode || this.data.code == 0) {
      wx.showToast({
        title: '没有当前输入编号的公告！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      that.setData({
        code: this.data.oldCode
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {

        if (sm.confirm) {
          wx.request({
            url: app.globalData.url + '/notice/delNotice',
            data: {
              code: this.data.code,
              teamCode: app.globalData.teamCode
            },
            method: 'post',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res)
              wx.navigateBack({

              })

            },
            fail: function (res) {
              console.log("--------fail--------");
            }
          })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //修改公告
  updateNotice: function (e) {
    if (app.globalData.teamCode == null) {
      wx.showToast({
        title: '请先创建队伍！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
   
    var that = this
    if (this.data.code == '') {
      return
    }
    if (this.data.code > this.data.oldCode || this.data.code == 0) {
      wx.showToast({
        title: '没有当前输入编号的公告！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      that.setData({
        code: this.data.oldCode
      })
      return
   }
    if (this.data.title.replace(/\s+/g, '') == '') {
      wx.showToast({
        title: '标题为必填！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      return
    }
    wx.request({
      url: app.globalData.url + '/notice/updateNotice',
      data: {
        code: this.data.code,
        teamCode: app.globalData.teamCode,
        title: this.data.title,
        notice: this.data.notice
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        wx.navigateBack({

        })

      },
      fail: function (res) {
        console.log("--------fail--------");
      }
    })
  },
  //获取用户输入的编号
  codeInput: function (e) {
    var that = this
    that.setData({
      code: e.detail.value
    })
  },
  //获取用户输入的标题
  titleInput: function (e) {
    var that = this
    that.setData({
      title: e.detail.value
    })
  },
  //获取用户内容
  noticeInput: function (e) {
    var that = this
    that.setData({
      notice: e.detail.value
    })
  },
  queryNotice: function (){
    console.log(this.data.count)
    var that = this
    if (this.data.code > this.data.oldCode || this.data.code == 0) {
      wx.showToast({
        title: '没有当前输入编号的公告！！！',
        icon: 'none',
        duration: 2000,
        mask: false
      })
      that.setData({
        code: this.data.oldCode
      })
      return
    }
    wx.request({
      url: app.globalData.url + '/notice/queryNotice',
      data: {
        code: this.data.code,
        teamCode: app.globalData.teamCode,
        isRead: '',
        all: ''
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data[0] == null) {

          that.setData({
            title: '暂未有此编号公告或已删除！！',
            notice: ''
          })
        } else {
          that.setData({
            code: res.data[0].code,
            title: res.data[0].title,
            notice: res.data[0].text
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
    var that = this
    wx.request({
      url: app.globalData.url + '/notice/queryNotice',
      data: {
        code: '',
        teamCode: app.globalData.teamCode,
        isRead: '',
        all: ''
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('查询内容：'+res.data)
        if (res.data[0] == null){
          
          that.setData({
            title: '暂未有公告！！'
          })
        }else{
          that.setData({
            code: res.data[0].code,
            oldCode: res.data[0].code,
            title: res.data[0].title,
            notice: res.data[0].text
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
    console.log('this.data.count')
    if (this.data.count != 0) {
      var that = this
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