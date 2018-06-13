// pages/msg/msg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      msg: options.msg
    })
  },
})