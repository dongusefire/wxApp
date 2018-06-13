// pages/scparking/scparking.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:"/ryparkinglotweb/#/scparking/navigation"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.type==2){
      this.setData({
        src: app.mapHost + this.data.src + `?parkingId=${options.parkingId}&carno=${options.carno}&building=${options.building}&floor=${options.floor}&type=2`
      })
    }else{
      this.setData({
        src: app.mapHost + this.data.src + `?parkingId=${options.parkingId}&carno=${options.carno}&type=1`
      })
    };
  },
  /*网页返回的信息*/
  postMsg(e){
    console.log(e);
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