// pages/reset/reset.js
var httpClient = require('../../utils/httpClient.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userPhone:'',
    second: 60,
    selected: false,
    visible: false,
  },
  //倒计时
  countdown() {
    setTimeout(() => {
      this.setData({
        second: this.data.second - 1
      })
      if (this.data.second == 0) {
        this.setData({
          second: 60,
          selected: false
        })
      } else {
        this.countdown();
      };
    }, 1000);
  },
  //输入框改变后，修改数据
  setPhoneData(e) {
    this.setData({
      userPhone: e.detail.value
    })
  },
  //获取验证码
  getcode() {
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.data.userPhone))) {
      wx.showModal({
        title: '系统提示',
        content: '请输入正确格式的手机号码',
        showCancel: false
      })
      return false;
    };
    //倒计时
    this.setData({
      selected: true
    });
    this.countdown();
    //验证码请求
    httpClient.GetCode(httpClient.AjaxPath + '/miniapp/commons/resetpwd/code/' + this.data.userPhone + '/' + app.globalData.openId,
    null,res=>{
      console.log(res);
    },err=>{
      console.log(err);
    });
  },
  validateFormData(data){
    if (data.username.length == 0 || data.password.length == 0) {
      wx.showModal({
        title: "系统提示",
        content: '手机号码或密码不得为空!',
        duration: 1500,
        showCancel: false
      });
      return false;
    } else if (data.username.length != 11) {
      wx.showModal({
        title: "系统提示",
        content: '请输入11位手机号码!',
        duration: 1500,
        showCancel: false
      });
      return false;
    } else if (data.code.length == 0){
      wx.showModal({
        title: "系统提示",
        content: '请输入手机验证码!',
        duration: 1500,
        showCancel: false
      });
      return false;
    } else if (data.password.length < 6 || data.password.length > 20) {
      wx.showModal({
        title: "系统提示",
        content: '请输入6-20密码!!',
        duration: 1500,
        showCancel: false
      });
      return false;
    }
    return true;
  },
  formSubmit(e){
    if (!this.validateFormData(e.detail.value)) {
      return false;
    };
    console.log(e.detail.value);
    //注册
    var submitData = Object.assign(e.detail.value);
    wx.showLoading({
      title: 'loading',
      mask: true
    })
    httpClient.putJson(httpClient.AjaxPath + '/miniapp/user/resetpwd', JSON.stringify(submitData),res=>{
      wx.hideLoading();
      console.log(res);
      if (!res.result) {
        wx.showModal({
          title: '系统提示',
          content: res.message,
          showCancel: false
        });
      } else {
        wx.showModal({
          title: '系统提示',
          content: res.message,
          showCancel: false,
          success:function(){
            wx.navigateTo({
              url: '../sign/sign',
            })
          }
        });
      }
    })
  },
  //处理密码可见与否
  visibleness(){
    this.setData({
      visible:!this.data.visible
    })
  },
  setpsw(e) {
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