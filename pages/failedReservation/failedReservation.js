// pages/failedReservation/failedReservation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carNo:'',
    parkName:'',
    startTime:'',
    endtime:''
  },
  continuePay(){
    wx.navigateTo({
      url: '../reserve/reserve',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var carNo = options.carNo;
    var parkName = options.parkName;
    var startTime = options.startTime;
    var endtime = options.endtime;
    this.setData({
      carNo: carNo,
      parkName: parkName,
      startTime: startTime,
      endtime: endtime
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