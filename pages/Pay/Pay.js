// pages/Pay/Pay.js
var httpClient = require('../../utils/httpClient.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    log:''
  },
  payment(e) {
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
      mytripHeader, {
        openId: app.globalData.openId
      }, res => {
        if (res.result == 0) {
          //调用微信支付
          wx.requestPayment({
            timeStamp: res.data.timeStamp.toString(),
            nonceStr: res.data.nonceStr,
            package: res.data.package,
            signType: res.data.signType,
            paySign: res.data.paySign,
            success(){
              wx.navigateTo({
                url: '../successPay/successPay',
              })
            },
            fail(){
              wx.navigateTo({
                url: '../failedPay/failedPay',
              })
            }
          })
        } else {
          wx.showModal({
            title: '系统提示',
            content: res.message,
            showCancel: false
          });
        };
      }, err => {
        wx.showModal({
          title: '系统提示',
          content: res.message,
          showCancel: true
        });
      }, complete => {
        wx.hideLoading();
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync("token");
    
    var mytripHeader = {
      'content-type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + token
    }
    var getId = options.getId;
    console.log(getId);
    httpClient.sendGet(httpClient.AjaxPath + '/miniapp/user/own/getonetrip', mytripHeader, {omitId:getId}, res=>{
      console.log(res);
      if(res.result == 0){
        res.data.parkFee = (res.data.parkFee / 100).toFixed(2);
        this.setData({
          log: [res.data]
        })
        console.log(res.data);
      }
    },err=>{
      wx.showToast({
        title: '未连接到服务器',
        icon:'success',
        duration:1500
      })
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