var config = require('../../config.js');
var app = getApp();
var httpClient = require("../../utils/httpClient.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    renewalRecord: [],
    logs:[],
    list:[],
    state: 0,
    searchActive: false,
    Location:null,
    searchVal:'',
    token:wx.getStorageSync("token"),
    userCode:''
  },
  setPlace:function(e){
    wx.navigateTo({
      url: '../reservation/reservation?parkCode=' + e.currentTarget.dataset.parkcode + '&ltdCode=' + e.currentTarget.dataset.ltdcode,
    })
  },
  searchPark(e){
    let list = [...this.data.logs];
    for(let i=0;i<list.length;i++){
      if (e.detail.value==''){
        list[i].hide=false;
      }else if(e.detail.value!=''){
        if (list[i].parkingName.indexOf(e.detail.value)!=-1){
          list[i].hide=false;
        }else{
          list[i].hide=true;
        }
      }
    };
    this.setData({
      logs:list
    })
  },
  isLock(e){
    wx.navigateTo({
      url: '../vehicleUnlock/vehicleUnlock',
    });
    // let arr = [...this.data.logs];
    // let url = '';
    // if (arr[e.currentTarget.dataset.key].lock!=true){
    //   this.unlock(e.currentTarget.dataset.key);
    // }else{
    //   this.lock(e.currentTarget.dataset.key);
    // };
    // arr[e.currentTarget.dataset.key] = !arr[e.currentTarget.dataset.key];
    // this.setData({
    //   logs:arr
    // });
  },
  //车位解锁
  unlock(key){
    httpClient.postJson(httpClient.AjaxPath + '/miniapp/fixedCarport/car/unlock', {
      "parkCode": 20000010002,
      "carNo": "粤A22221",
      "buildingCode": "B0",
      "floorCode": "F5",
      "areaCode": "A",
      "carportCode": "001"
    }, res => {
      let msg = '';
      let arr = [...this.data.logs];
      if (res.result == '0000') {
        msg = res.data;
        arr[key].lock = true;
        this.setData({
          logs:arr
        });
        console.log(arr)
      } else {
        msg = res.message;
      }
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 1500
      });
    }, err => {
      console.log(err);
    })
  },
  //车位上锁
  lock(key) {
    httpClient.postJson(httpClient.AjaxPath + '/miniapp/fixedCarport/car/lock', {
      "parkCode": 20000010002,
      "carNo": "粤A22221",
      "buildingCode": "B0",
      "floorCode": "F5",
      "areaCode": "A",
      "carportCode": "001"
    }, res => {
      let msg = '';
      let arr = [...this.data.logs];
      if (res.result =='0000'){
        msg= res.data;
        arr[key].lock = false;
        this.setData({
          logs: arr
        });
      }else{
        msg = res.message;
      }
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 1500
      })
    }, err => {
      console.log(err);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('停车场列表')
    var that = this;
    // wx.showLoading({
    //   title: '请稍后...'
    // });
    wx.getLocation({
      type: 'wgs84',
      success:res=>{
        this.data.Location = res;
        httpClient.sendGet(httpClient.AjaxPath + '/miniapp/book/park/list', null, {
          latitude: this.data.Location.latitude,
          longitude: this.data.Location.longitude
        }, res => {
          let list = [];
          for(let i=0;i<res.data.length;i++){
            res.data[i].lock = false;
            res.data[i].hide = false;
            res.data[i].distance = (res.data[i].distance/1000).toFixed(2);
            list.push(res.data[i]);
          };
          that.setData({
            logs: list,
            list: list
          })
        }, err => {
          console.log(err);
        })
      },
      fail(){
        /*用户拒绝授权*/
        wx.redirectTo({
          url: '../authorize/authorize'
        })
      }
    });
  },
  onShow(){
    //微信登录
    wx.login({
      success: loginRes => {
        app.globalData.userCode = loginRes.code;
        //微信获取用户信息
        wx.getUserInfo({
          success: userRes => {
            app.getUserInfo(userRes);
          },
          fail() {
            /*用户没有授权过*/
            wx.redirectTo({
              url: '../authorize/authorize'
            })
          }
        })
      }
    })
  }
})