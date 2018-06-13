// pages/reserve/reserve.js
var config = require('../../config.js');
var app = getApp();
var httpClient = require("../../utils/httpClient.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    flag:false,
    numData:{
      '1': '一',
      '2': '二',
      '3': '三',
      '4': '四',
      '5': '五'
    }
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].bookId == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  Paybook(e) {
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
    httpClient.sendPost(httpClient.AjaxPath + '/miniapp/commons/trade/book/doUnifiedOrder/' + e.currentTarget.dataset.id,
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
            complete(){
              that.onLoad();
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
    var reserveHeader = {
      'content-type': 'application/json;charset=utf-8',
       Authorization: 'Bearer ' + token
    }
    httpClient.sendGet(httpClient.AjaxPath + '/miniapp/book/park/book/list', reserveHeader, null,res => {
      if(res.result==0){
        var list = res.data;
        for (var i = 0; i < list.length; i++) {
          list[i].bookFee = (list[i].bookFee/100).toFixed(2);
          list[i].parkNum = this.resolveCarport(list[i]);
        };
        this.setData({
          list: list
        });
        if(this.data.list.length == 0){
          this.setData({
            flag:true
          })
        }
      }else{
        wx.showModal({
          title: '系统提示',
          content: '请先登录',
          showCancel:false,
          success:function(){
            wx.navigateTo({
              url: '../sign/sign',
            })
          }
        })
      }
    }, err => {
      console.log(err);
    })
  },
  //生成parkNum
  resolveCarport(data) {
    let str = '';
    if (data.area==null){
      str = '随机车位'
    }else{
      str = data.building+'栋';
      let s = data['floor'].split('');
      let t = s[0] == 'B' ? '负' : '';
      str = str + t + this.data.numData[s[1]] + '层' + data.area + '区' + data.spaceNumber;
    };
    return str;
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
    wx.switchTab({
      url: '../my/user'
    })
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