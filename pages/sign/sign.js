// pages/sign/sign.js
var app = getApp();
var httpClient = require('../../utils/httpClient.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    visible:false,
    focus:''
  },
  validateFormData(data){
    if(data.username.length == 0 || data.password.length == 0){
      wx.showModal({
        title: "系统提示",
        content: '手机号码或密码不得为空!',
        duration: 1500,
        showCancel: false
      });
      return false;
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(data.username))){
      wx.showModal({
        title: '系统提示',
        content: '请输入正确格式的手机号码',
        showCancel: false
      })
      return false;
    }else if(data.password.length < 6 || data.password.length > 20){
      wx.showModal({
        title: '系统提示',
        content: '请输入6-20密码!!',
        showCancel: false
      })
      return false;
    };
    return true;
  },
  logIn:function(e){
    if (!this.validateFormData(e.detail.value)){
      return false;
    };
    var getFomData = e.detail.value;
    wx.showLoading({
      title: 'loading',
      mask: true
    });
    httpClient.postJson(httpClient.AjaxPath +'/miniapp/user/login',{
      username: getFomData.username,
      password: getFomData.password,
      openId: app.globalData.openId
    },res=>{
      if(res.result==0){
        wx.setStorageSync('token', res.data);
        wx.setStorageSync('username', getFomData.username.replace(getFomData.username.substring(3, 8),'*****'));
        wx.switchTab({
          url: '../my/user',
        })
      }else{
        wx.showModal({
          title: '系统提示',
          content: res.message,
          showCancel: false
        })
      };
    },err=>{
      console.log(err,222222);
    }, complete=>{
      wx.hideLoading();
    })
  },
  visibleness(){
    this.setData({
      visible:!this.data.visible,
      focus:true
    })
  },
  setpsw(e){
    this.setData({
      pdd: e.detail.value
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