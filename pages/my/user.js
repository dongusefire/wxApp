// pages/my/user.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username:null,
    avatarUrl:null,
    creditValue:0,
    vipImg:'vip@2x',
    token:''
  },
  tip(){
    wx.showToast({
      icon:'none',
      title:'敬请期待'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getCreditValue(){
    let vipImg = 'vip@2x';
    if (app.globalData.creditValue<100){
      vipImg = 'vip@1x';
    }else if(app.globalData.creditValue>100){
      vipImg = 'vip@3x';
    };
    this.setData({
      creditValue: app.globalData.creditValue,
      vipImg: vipImg
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
    this.getCreditValue();
    // app.globalData.phoneNumber.replace(app.globalData.phoneNumber.substring(3, 8), '*****')
    this.setData({
      username: wx.getStorageSync('username'),
      token: wx.getStorageSync('token')
    })
    if (app.globalData.userInfo != null) {
      let avatarUrl = app.globalData.userInfo.avatarUrl ? app.globalData.userInfo.avatarUrl : null;
      this.setData({
        avatarUrl: avatarUrl
      })
    }
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