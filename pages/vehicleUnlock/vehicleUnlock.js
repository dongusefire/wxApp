// pages/vehicleUnlock/vehicleUnlock.js
var httpClient = require('../../utils/httpClient.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    items: [],
    value:''
  },
  radioChange: function (e) {
    this.setData({
      value: e.detail.value
    });
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  fixedQuery(){
    if (this.data.value==''){
      return false;
    };
    let token = wx.getStorageSync("token");
    httpClient.sendGet(httpClient.AjaxPath + '/miniapp/book/state/fixedQuery ', {
      'Authorization': 'Bearer ' + this.data.token
    }, {
        carNo: this.data.value
    }, res => {
      if (res.result == 0) {
        wx.navigateTo({
          url: `../scparking/scparking?parkingId=${res.data.parkCode}&carno=${this.data.value}&building=${res.data.buildingCode}&floor=${res.data.floorCode}&type=2`
        })
      } else {
        let msg = '车辆不在场，无法解锁车位';
        wx.showModal({
          title: '系统提示',
          content: res.message,
          showCancel: false,
          confirmColor: '#30DDD9',
        })
      };
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      if(res.data!=null && res.data.length!=0){
        let list = [...res.data];
        let flag = false;
        let val = '';
        for (let i = 0; i < list.length; i++) {
          list[i].checked = false;
          list[i].name = list[i].carNo;
          list[i].value = list[i].carNo;
          if (list[i].isDefault == 1) {
            list[i].checked = true;
            flag = true;
            val = list[i].value;
          };
        };
        if (!flag) {
          list[0].checked = true;
          val = list[0].value;
        };
        this.setData({
          items: list,
          value:val
        });
      }else{
        wx.showModal({
          title: '系统提示',
          content: '请先添加车牌',
          showCancel: false,
          // cancelText:'返回',
          confirmText: '确定',
          confirmColor: '#30DDD9',
          success(res) {
            wx.navigateTo({
              url: '../../addvehicle/addvehicle',
            })
          }
        })
      }
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
    this.getCarList();
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