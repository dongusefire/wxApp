// pages/myTrip/myTrip.js
var httpClient = require('../../utils/httpClient.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logs:[],
  },
  Payomit(e){
    var that = this;
    wx.showLoading({
      title: '请稍等',
      mask: true
    });
    var token = wx.getStorageSync("token");
    var mytripHeader = {
      'content-type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + token
    }
    httpClient.sendPost(httpClient.AjaxPath + '/miniapp/commons/trade/omit/doUnifiedOrder/' + e.currentTarget.dataset.id,
    mytripHeader,{
      openId: app.globalData.openId
    },res=>{
      if (res.result==0){
        //调用微信支付
        wx.requestPayment({
          timeStamp: res.data.timeStamp.toString(),
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          complete(){
            that.onLoad();
          }
        })
      }else{
        wx.showModal({
          title: '系统提示',
          content: res.message,
          showCancel: false
        });
      };
    },err=>{
      wx.showModal({
        title: '系统提示',
        content: res.message,
        showCancel: false
      });
    },complete=>{
      wx.hideLoading();
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
    var that = this;
    var token = wx.getStorageSync("token");
    var mytripHeader = {
      'content-type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + token
    }
    httpClient.sendGet(httpClient.AjaxPath + '/miniapp/user/own/trip', mytripHeader, null, res => {
      console.log(res);
      if (res.result == 500) {
        wx.showModal({
          title: '系统提示',
          content: "您需要登录",
          showCancel: false,
          success: function () {
            wx.navigateTo({
              url: '../sign/sign',
            })
          }
        });
      } else {
        var list = res.data;
        for (var i = 0; i < list.length; i++) {
          list[i].parkFee = (list[i].parkFee / 100).toFixed(2);
        };
        that.setData({
          logs: list,
        });
      }
    }, err => {
      wx.showModal({
        title: '系统提示',
        content: "未获取到数据，请联系管理员！",
        showCancel: false
      });
    });
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