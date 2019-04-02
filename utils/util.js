var amapFile = require('amap-wx.js')
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') 
  //+ ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//f149525102fd153e6f12230efd1996bf

function getAddress() {
  const that = this;
  var myAmapFun = new amapFile.AMapWX({ key: 'f149525102fd153e6f12230efd1996bf' });
  myAmapFun.getRegeo({
    success: function (res) {
      return res[0].regeocodeData.formatted_address
      // that.setData({
      //   address: res[0].regeocodeData.formatted_address
      // })

    }

  })
}


module.exports = {
  formatTime: formatTime,
  getAddress: getAddress
}
