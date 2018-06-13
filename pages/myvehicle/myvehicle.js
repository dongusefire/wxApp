// pages/myvehicle/myvehicle.js
var httpClient = require('../../utils/httpClient.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList:[],
    token:'',
    pageState:''
  },
  //默认车牌切换
  changeDefault(e){
    console.log(e.currentTarget.dataset.carno)
    wx.showLoading({
      title:'loading',
      mask: true
    });
    httpClient.sendPut(httpClient.AjaxPath + '/miniapp/user/car/setDefault', {
      'Authorization': 'Bearer ' + this.data.token
    },{
        carNo: e.currentTarget.dataset.carno
    },res=>{
      if (res.result==0){
        wx.showToast({
          title: '成功'
        });
        let list = [...this.data.carList];
        for(let i=0;i<list.length;i++){
          if (i == e.currentTarget.dataset.key){
            list[i].isDefault = 1;
          }else{
            list[i].isDefault = 0;
          };
        };
        this.setData({
          carList: list
        })
      }else{
        wx.showModal({
          title: '系统提示',
          content: res.message,
          showCancel: false
        })
      };
    },err=>{
      console.log(err);
    }, complete=>{
      wx.hideLoading();
    })
  },
  //删除车牌
  removeCar(e){
    wx.showLoading({
      title: 'loading',
      mask: true
    });
    httpClient.sendDel(httpClient.AjaxPath + '/miniapp/user/car/removeCar', {
      'Authorization': 'Bearer ' + this.data.token
    }, {
        carNo: e.currentTarget.dataset.carno
    }, res => {
      if (res.result == 0) {
        let _arr = [...this.data.carList];
        _arr.splice(e.currentTarget.dataset.index, 1);
        wx.showToast({
          title: '成功'
        });
        this.setData({
          carList: _arr
        })
      } else {
        wx.showModal({
          title: '系统提示',
          content: res.message,
          showCancel: false
        })
      };
    }, err => {
      console.log(err);
    }, complete => {
      wx.hideLoading();
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageState: 'load'
    });
    this.getCarList();
  },
  getCarList(){
    let token = wx.getStorageSync("token");
    this.setData({
      token: token
    })
    //获取车厂列表
    httpClient.sendGet(httpClient.AjaxPath + '/miniapp/user/car/list', {
      'Authorization': 'Bearer ' + this.data.token
    }, null, res => {
      this.setData({
        carList: res.data
      });
      console.log(res.data);
    }, err => {
      console.log(err);
    }, complete => {
    });
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
    if (this.data.pageState == 'hide') {
      this.getCarList();
    };
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      pageState: 'hide'
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // var pages = getCurrentPages();
    // if(pages.length > 1){
    //   var prePage = pages[pages.length - 2];
    //   prePage.changeData(this.data.carList)
    // }
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