// pages/authorize/authorize.js
let app = getApp();
let httpClient = require('../../utils/httpClient.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  //获取用户授权信息，并判断权限
  getUserInfo(data){
    console.log(data);
    if (data.detail.errMsg =='getUserInfo:ok'){
      app.getUserInfo(data.detail);
    };
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo'] == false || res.authSetting['scope.userLocation'] == false) {
          this.openSetting();
        }else{
          wx.switchTab({
            url: '../parking/parking'
          });
        };
      }
    });
  },
  //跳转到设置页面
  openSetting(){
    wx.openSetting({
      success(res){
        if (res.authSetting['scope.userInfo'] == false || res.authSetting['scope.userLocation'] == false){
          wx.showModal({
            title: '系统提示',
            content: '为了提供更好的服务，请授权获取地理位置和用户信息',
            showCancel: false
          });
        }else{
          wx.switchTab({
            url:'../parking/parking'
          });
        };
      },
      fail(){
        wx.showModal({
          title: '系统提示',
          content: '未知错误',
          showCancel: false
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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