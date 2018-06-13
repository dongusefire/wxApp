// pages/addvehicle/addvehicle.js
var config = require('../../config.js');
var httpClient = require('../../utils/httpClient.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isDefault: true,
    plate: '',
    Maxlen: 5,
    plateFocus: false,
    plateArr: [],
    provinceItems: null,
    toggleFirstKey: false,
    FirstKey: '粤',
    phone: '',
    toggleCity: false,
    cityOrder: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    selectCity: 'A',
    plateIndex: -1,
    cursor: 0
  },
  removeDefault(){
    let off = true;
    if (this.data.selectCity==''){
      off=false;
    };
    if(this.data.plateArr.length<this.data.Maxlen){
      off = false;
    };
    this.setData({
      isDefault:!off
    })
  },
  checkboxChange(e){
    this.addNum();
  },
  //点击确认绑定
  tighten(){
    if (this.data.isDefault){
      return false;
    };
    // if(this.data.plateArr.length!=this.data.Maxlen){
    //   wx.showModal({
    //     title: '系统提示',
    //     content: '请输入正确的车牌号',
    //     showCancel: false
    //   });
    //   return false;
    // };
    wx.showLoading({
      title:'loading'
    });
    let carNo = this.data.FirstKey + this.data.selectCity + this.data.plateArr.join('').toLocaleUpperCase();
    console.log(carNo);
    let token = wx.getStorageSync("token");
    httpClient.sendPost(httpClient.AjaxPath +'/miniapp/user/car/tighten',{
      'Authorization': 'Bearer ' + token
    },{
      carNo: carNo
    },res=>{
      if (res.result == 0) {
        wx.showModal({
          title: '系统提示',
          content: '添加成功',
          showCancel:false,
          // cancelText:'返回',
          confirmText:'确定',
          confirmColor: '#30DDD9',
          success(res){
            wx.navigateBack({
              delta: 1
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
    },err=>{
      console.log(err);
    },complete=>{
      wx.hideLoading();
    })
  },
  //输入车牌号
  changePlate(e){
    let plateIndex = e.detail.value.length == 0 ? 0 : e.detail.value.length - 1
    this.setData({
      plateArr: e.detail.value.split(''),
      plateIndex: plateIndex
    });
    if (e.detail.value.length == this.data.Maxlen) {
      this.setData({
        plateFocus: false,
        plateIndex: -1
      });
    };
    this.removeDefault();
  },
  //点击白色方块调用键盘
  tokeyboard(){
    let plateIndex = this.data.plateArr.length - 1 < 0 ? 0:this.data.plateArr.length -1;
    this.setData({
      plateFocus: true,
      plateIndex: plateIndex,
      toggleFirstKey: false,
      toggleCity: false
    });
  },
  //新能源车牌
  addNum(){
    let arr = [...this.data.plateArr];
    let Maxlen = 5;
    if (this.data.Maxlen == 5) {
      Maxlen = 6;
    } else {
      if (arr.length == 6) {
        arr.pop();
      };
      Maxlen = 5;
    };
    this.setData({
      Maxlen: Maxlen,
      plate: arr.join(''),
      plateArr: arr
    });
    console.log(Maxlen)
    this.removeDefault();
  },
  //弹出车牌键盘
  showFirstKey() {
    this.setData({
      toggleFirstKey: true,
      toggleCity: false
    })
  },
  //关闭车牌键盘
  closeplateFirst() {
    this.setData({
      toggleFirstKey: false
    })
  },
  //弹出城市序号键盘
  showCityOrder() {
    this.setData({
      toggleCity: true,
      toggleFirstKey: false
    })
  },
  //关闭城市序号键盘
  closeCityOrder() {
    this.setData({
      toggleCity: false
    })
  },
  //点击车牌键盘切换
  selectFirst(e) {
    this.setData({
      toggleFirstKey: false,
      FirstKey: e.target.dataset.name
    })
  },
  //选择城市序号
  selectCity(e) {
    let plateIndex = this.data.plateArr.length < this.data.Maxlen ? this.data.plateArr.length : -1;
    let plateFocus = plateIndex == -1 ? false : true;
    this.setData({
      toggleCity: false,
      selectCity: e.target.dataset.name,
      plateIndex: plateIndex,
      plateFocus: plateFocus
    })
    this.removeDefault();
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
    this.setData({
      provinceItems:config.provinceItems
    })
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