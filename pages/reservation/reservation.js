 // pages/reservation/reservation.js
var app = getApp();
var httpClient = require('../../utils/httpClient.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:'',
    carList:'',
    defaultCar:'',
    index: 0,
    date: '',
    date2: '',
    time: '',
    time2:'',
    openId:'',
    bookStartTime:'',
    bookEndTime:'',
    timeDifference:'',
    timezip: '',
    beginStart:'',
    beginEnd:'',
    finishStart:'',
    finishEnd:'',
    begintime:'',
    finishtime:'',
    bookFee:'',
    bookPrice:'',
    bookFeeText: '',
    bookPriceText: '',
    parkingName:'',
    multiIndex: [0, 0],
    multiIndex2: [0, 0],
    multiArray: [
      ['01', '02', '03', '04', '05', '06', '07'],
      ['00', '10', '20', '30', '40', '50']
    ],
    multiArray2: [
      ['01', '02', '03', '04', '05', '06', '07'],
      ['00', '10', '20', '30', '40', '50']
    ],
    selected:true,
    selected1:false,
    selected2: false,
    timeflag1:true,
    timeflag2: true,
    carSpace:false,
    building:[],
    buildingData:[],
    numData:{
      '1':'一',
      '2':'二',
      '3':'三',
      '4':'四',
      '5':'五'
    },
    getltdCode:'',
    getparkCode:'',
    parkNum:'',
    parkData: {
      flag: 'D', //未知参数
      building: '',
      floor: '',
      area: '',
      spaceNumber:''
    },
    pageState:''
  },
  selected:function(e){
    this.setData({
      selected1: false,
      selected2: false,
      selected:true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected1: true
    })
  },
  //点击楼层的时候
  chooseFloor:function(e){
    let floor = e.target.dataset.floor.split(',');
    let data = {
      ltdCode: this.data.getltdCode,
      parkCode: this.data.getparkCode,
      building: e.target.dataset.building,
      floor: this.data.buildingData[floor[0]]['floors'][floor[1]]
    };
    wx.navigateTo({
      url: `../reserveplace/reserveplace?ltdCode=${data.ltdCode}&parkCode=${data.parkCode}&building=${data.building}&floor=${data.floor}`,
    })
    httpClient.GetCode(httpClient.AjaxPath + '/miniapp/fixedBook/carport/toHuaTuMap', data, res => {
      if (res.result == 0) {
        
      };
    })
  },
  order:function(e){
    var that_ = this;
    if (e.target.dataset.attr == 'can'){
      this.setData({
        num_: e.target.dataset.num,
      });
      wx.showModal({
        title: '提示',
        content: '您确定选择此车位吗',
        success:function(res){
          if(res.confirm){
            //此处需要加判断逻辑
            console.log('点击了确定');
            that_.setData({
              carSpace:true,
              selected:true
            })
          }else if(res.cancel){
            console.log('点击了取消')
            that_.setData({
              num_: 0,
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '此车位不可预定',
        image:'../../images/u452.png'
      })
    }
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      timeflag1:true,
      multiIndex: e.detail.value,
      time: this.data.multiArray[0][e.detail.value[0]] + ':' + this.data.multiArray[1][e.detail.value[1]]
    })
    console.log(this.data.time)
    //计算停车时长
    var bookStartTime = this.data.date + " " + this.data.time;
    var bookEndTime = this.data.date2 + " " + this.data.time2;
    var timeDifference = httpClient.GetDateDiff(bookStartTime, bookEndTime, "minute");
    var bookPrice = this.data.bookPrice;
    var Difference = Math.ceil(timeDifference / 60);
    var bookFee = bookPrice * Difference;
    this.setData({
      timeDifference: timeDifference,
      bookFee: bookFee,
      bookFeeText: (bookFee / 100).toFixed(2),
      bookStartTime: bookStartTime,
      bookEndTime: bookEndTime
    })
  },
  bindMultiPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      timeflag2: true,
      multiIndex2: e.detail.value,
      time2: this.data.multiArray2[0][e.detail.value[0]] + ':' + this.data.multiArray2[1][e.detail.value[1]]
    })
    console.log(this.data.time2)
    //计算停车时长
    var bookStartTime = this.data.date + " " + this.data.time;
    var bookEndTime = this.data.date2 + " " + this.data.time2;
    var timeDifference = httpClient.GetDateDiff(bookStartTime, bookEndTime, "minute");
    var bookPrice = this.data.bookPrice;
    var Difference = Math.ceil(timeDifference / 60);
    var bookFee = bookPrice * Difference;
    this.setData({
      timeDifference: timeDifference,
      bookFee: bookFee,
      bookFeeText: (bookFee / 100).toFixed(2),
      bookStartTime: bookStartTime,
      bookEndTime: bookEndTime,
    })
  },
  bindMultiPickerColumnChange(e) {
    this.setData({
      timeflag: true
    })
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    let pickerStartTime = this.data.begintime;
    let pickerEndTime = this.data.finishtime;
    var m = [];
    if (e.detail.column == 0) {
      if (e.detail.value == 0) {
        for (var i = Number(pickerStartTime.split(':')[1] / 10); i <= 5; i++) {
          if (i == 0) {
            m.push('0' + i);
          } else {
            m.push(i + '0');
          };
        };
      } else if (e.detail.value == this.data.multiArray2[0].length) {
        for (var i = 0; i <= Number(pickerEndTime.split(':')[1] / 10); i++) {
          if (i == 0) {
            m.push('0' + i);
          } else {
            m.push(i + '0');
          };
        };
      } else {
        for (var i = 0; i <= 5; i++) {
          if (i == 0) {
            m.push('0' + i);
          } else {
            m.push(i + '0');
          };
        };
      }
      this.setData({
        multiArray: [this.data.multiArray[0], m],
        multiIndex: [e.detail.value, 0],
      });
    } else {
      this.setData({
        multiIndex: [data.multiIndex[0], e.detail.value]
      });
    };
  },
  bindMultiPickerColumn2Change(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray2: this.data.multiArray2,
      multiIndex2: this.data.multiIndex2
    };
    let pickerStartTime = this.data.begintime;
    let pickerEndTime = this.data.finishtime;
    var m = [];
    if (e.detail.column == 0) {
      if (e.detail.value == 0) {
        for (var i = Number(pickerStartTime.split(':')[1] / 10); i <= 5; i++) {
          if (i == 0) {
            m.push('0' + i);
          } else {
            m.push(i + '0');
          };
        };
      } else if (e.detail.value == this.data.multiArray2[0].length) {
        for (var i = 0; i <= Number(pickerEndTime.split(':')[1] / 10); i++) {
          if (i == 0) {
            m.push('0' + i);
          } else {
            m.push(i + '0');
          };
        };
      } else {
        for (var i = 0; i <= 5; i++) {
          if (i == 0) {
            m.push('0' + i);
          } else {
            m.push(i + '0');
          };
        };
      }
      this.setData({
        multiArray2: [this.data.multiArray2[0], m],
        multiIndex2: [e.detail.value, 0]
      });
    } else {
      this.setData({
        multiIndex2: [data.multiIndex2[0], e.detail.value]
      });
    };
  },
  //表单提交验证
  validateFormData(data) {
    console.log(data);
    if (data.timeDifference <= 0) {
      wx.showModal({
        title: '系统提示',
        content: '请选择正确的起始与结束时间',
      })
      return false;
    } else if (data.carNo == '') {
      wx.showModal({
        title: '系统提示',
        content: '请先绑定车牌号，再进行预定',
        confirmText:'去绑定',
        showCancel: false,
        success() {
          wx.navigateTo({
            url: '../addvehicle/addvehicle',
          })
        }
      })
      return false;
    }
    return true;
  },
  // 提交预定数据
  formSubmit(e){
    if (!this.validateFormData(e.detail.value)) {
      return false;
    };
    //判断起始时间跟结束时间是否为整数 
    var startInteger = this.data.time;
    var endInteger = this.data.time2;
    var x = startInteger.substring(3,5);
    var y = endInteger.substring(3, 5);
    if(x % 10 != 0){
      wx.showToast({
        title: '请输入10的倍数格式的时间',
        icon:"none",
        duration:1500
      })
      return false
    }
    if (y % 10 != 0) {
      wx.showToast({
        title: '请输入10的倍数格式的时间',
        icon: "none",
        duration: 1500
      })
      return false
    }

    wx.showLoading({
      title: 'loading',
      mask: true
    });
    var token = wx.getStorageSync("token");
    var Header = {
      'content-type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + token
    };
    let _url = httpClient.AjaxPath;
    let jsonData = Object.assign({}, e.detail.value,this.data.parkData);
    jsonData.bookPrice = jsonData.bookPrice*100;
    console.log(JSON.stringify(jsonData), jsonData)
    if(this.data.parkData.area==''){
      _url +='/miniapp/book/park/book';
    }else{
      _url += '/miniapp/book/park/bookCarport';
    };
    httpClient.orderPost(_url, Header, jsonData,res=>{
      wx.hideLoading();
      console.log(res);
      if(!res.result){
        wx.showToast({
          title: '数据请求超时',
          icon:'none'
        })
      }
      if(res.result == 0){
        var that = this;
        //调用微信支付
        wx.requestPayment({
          timeStamp: res.data.timeStamp.toString(),
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success:function(res){
            wx.navigateTo({
              url: '../successReservation/successReservation?carNo=' + that.data.defaultCar + '&parkName=' + that.data.parkingName + '&startTime=' + that.data.bookStartTime + '&endtime=' + that.data.bookEndTime,
            })
          },
          fail:function(res){
            wx.navigateTo({
              url: '../failedReservation/failedReservation?carNo=' + that.data.defaultCar + '&parkName=' + that.data.parkingName + '&startTime=' + that.data.bookStartTime + '&endtime=' + that.data.bookEndTime,
            })
          }
        })
      }else{
        wx.showModal({
          title: '系统提示',
          content: res.message,
          showCancel: false
        })
      }
    },err=>{
      wx.showModal({
        title: '系统提示',
        content: "服务器异常，请联系管理员",
        showCancel: false
      })
    });
  },
  makeDataCol(obj) {
    if (obj == 'start') {
      let pickerStartTime = this.data.begintime;
      let pickerEndTime = this.data.finishtime;
      let hourList = [] //开始小时列表
      let MinuteList = [] //开始分钟列表
      let Minute2List = [] //结束分钟列表
      for (var i = Number(pickerStartTime.split(':')[0]); i <= Number(pickerEndTime.split(':')[0]); i++) {
        if (i < 10) {
          hourList.push('0' + i);
        } else {
          hourList.push(i);
        };
      };
      if (pickerStartTime.split(':')[0] == pickerEndTime.split(':')[0]) {
        for (var i = Number(pickerStartTime.split(':')[1] / 10); i <= Number(pickerEndTime.split(':')[1] / 10); i++) {
          if (i == 0) {
            MinuteList.push('0' + i);
          } else {
            MinuteList.push(i + '0');
          };
        };
        Minute2List = MinuteList;
      } else {
        for (var i = Number(pickerStartTime.split(':')[1] / 10); i <= 5; i++) {
          if (i == 0) {
            MinuteList.push('0' + i);
          } else {
            MinuteList.push(i + '0');
          };
        };
        for (var i = 0; i <= Number(pickerEndTime.split(':')[1] / 10); i++) {
          if (i == 0) {
            Minute2List.push('0' + i);
          } else {
            Minute2List.push(i + '0');
          };
        };
      };
      this.setData({
        multiArray: [hourList, MinuteList],
        multiArray2: [hourList, Minute2List],
        multiIndex2: [hourList.length - 1, Minute2List.length - 1],
      });
    };
  },
  //固定车位预约时段查询
  carportTime(data){
    var token = wx.getStorageSync("token");
    var timerHeader = {
      'content-type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + token
    };
    let jsonData = Object.assign({}, { parkCode: this.data.getparkCode, ltdCode: this.data.getltdCode}, this.data.parkData);
    console.log(jsonData)
    httpClient.sendGet(httpClient.AjaxPath + '/miniapp/book/park/carportTime', timerHeader, jsonData, res => {
      if (res.result == 0) {
        console.log(res);
        //预定车位订金处理
        var bookPrice = res.data.bookPrice;
        var Difference = Math.ceil((res.data.bookEndTime - res.data.bookStartTime) / 3600000);
        var bookFee = bookPrice * Difference;
        //让picker的起始结束时间跟接口返回的时间保持同步
        var pickerStartDate = this.formatDate(new Date(res.data.bookStartTime));
        var pickerStartTime = this.showTime(new Date(res.data.bookStartTime));
        var pickerEndDate = this.formatDate(new Date(res.data.bookEndTime));
        var pickerEndTime = this.showTime(new Date(res.data.bookEndTime));
        var parkingName = res.data.parkingName;
        this.setData({
          beginStart: pickerStartDate,
          beginEnd: pickerEndDate,
          finishStart: pickerStartDate,
          finishEnd: pickerEndDate,
          begintime: pickerStartTime,
          finishtime: pickerEndTime,
          date: pickerStartDate,
          time: pickerStartTime,
          date2: pickerEndDate,
          time2: pickerEndTime,
          bookFee: bookFee,
          bookPrice: bookPrice,
          bookFeeText: (bookFee / 100).toFixed(2),
          bookPriceText: (bookPrice / 100).toFixed(2),
          parkingName: parkingName
        })
        this.makeDataCol('start');
        //接口请求到数据后，不进行操作时的预定开始与结束时间
        var bookStartTime = this.data.date + " " + this.data.time;
        var bookEndTime = this.data.date2 + " " + this.data.time2;
        var timeDifference = httpClient.GetDateDiff(bookStartTime, bookEndTime, "minute");
        this.setData({
          bookStartTime: bookStartTime,
          bookEndTime: bookEndTime,
          timeDifference: timeDifference
        })
        //车辆信息处理
        var list = res.data.carNos;
        var array = [];
        for (var i = 0; i < list.length; i++) {
          array.push(list[i].carNo);
          if (list[i].isDefault == 1) {
            this.setData({
              defaultCar: list[i].carNo
            })
          }
        };
        this.setData({
          carList: array,
          list: [res.data]
        });
      }else{
        wx.showToast({
          title: res.message,
          icon: 'none'
        });
      };
    })
  },
  //声明两个时间格式化函数
  formatDate(date){
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
  },
  showTime(date){
    var hour = date.getHours();
    var minutes = date.getMinutes();
    hour < 10 ? hour = '0' + hour : hour;
    minutes < 10 ? minutes = '0' + minutes : minutes;
    return hour + ':' + minutes;
  },
  parkTime(options){
    this.getCarport({
      ltdCode: this.data.getltdCode,
      parkCode: this.data.getparkCode
    })
    //调用车场可预定时间接口
    var getparkCode = this.data.parkCode;
    var getltdCode = this.data.ltdCode;
    var token = wx.getStorageSync("token");
    var timerHeader = {
      'content-type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + token
    }
    var data = {
      parkCode: getparkCode,
      ltdCode: getltdCode
    }
    httpClient.sendGet(httpClient.AjaxPath + '/miniapp/book/park/time', timerHeader, data, res => {
      if (res.result == 0) {
        console.log(res);
        //预定车位订金处理
        var bookPrice = res.data.bookPrice;
        var Difference = Math.ceil((res.data.bookEndTime - res.data.bookStartTime) / 3600000);
        var bookFee = bookPrice * Difference;
        //让picker的起始结束时间跟接口返回的时间保持同步
        var pickerStartDate = this.formatDate(new Date(res.data.bookStartTime));
        var pickerStartTime = this.showTime(new Date(res.data.bookStartTime));
        var pickerEndDate = this.formatDate(new Date(res.data.bookEndTime));
        var pickerEndTime = this.showTime(new Date(res.data.bookEndTime));
        var parkingName = res.data.parkingName;
        this.setData({
          beginStart: pickerStartDate,
          beginEnd: pickerEndDate,
          finishStart: pickerStartDate,
          finishEnd: pickerEndDate,
          begintime: pickerStartTime,
          finishtime: pickerEndTime,
          date: pickerStartDate,
          time: pickerStartTime,
          date2: pickerEndDate,
          time2: pickerEndTime,
          bookFee: bookFee,
          bookPrice: bookPrice,
          bookFeeText: (bookFee / 100).toFixed(2),
          bookPriceText: (bookPrice / 100).toFixed(2),
          parkingName: parkingName
        })
        this.makeDataCol('start');
        //接口请求到数据后，不进行操作时的预定开始与结束时间
        var bookStartTime = this.data.date + " " + this.data.time;
        var bookEndTime = this.data.date2 + " " + this.data.time2;
        var timeDifference = httpClient.GetDateDiff(bookStartTime, bookEndTime, "minute");
        this.setData({
          bookStartTime: bookStartTime,
          bookEndTime: bookEndTime,
          timeDifference: timeDifference
        })
        //车辆信息处理
        var list = res.data.carNos;
        var array = [];
        for (var i = 0; i < list.length; i++) {
          array.push(list[i].carNo);
          if (list[i].isDefault == 1) {
            this.setData({
              defaultCar: list[i].carNo
            })
          }
        }
        this.setData({
          carList: array,
          list: [res.data]
        });
        if (res.data.parkingName == null) {
          wx.showModal({
            title: '系统提示',
            content: '无可预订车位，请重新选择车场',
            showCancel: false,
            success: function () {
              wx.navigateBack();
            }
          })
        }
      } else {
        console.log(res.message);
        wx.showToast({
          title: res.message,
          icon:'none'
        });
        this.setData({
          timeflag1: false,
          timeflag2: false
        });
      }
    }, err => {

    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取小程序openId
    var openId = app.globalData.openId;
    this.setData({
      getltdCode: options.ltdCode ? options.ltdCode : 2005009,
      getparkCode: options.parkCode,
      openId:openId,
      pageState:'load'
    });
    //判断用户是否从预定到位跳转回来的
    if (options.areaCode){
      let obj = this.resolveCarport([{ building: options.buildingCode, floors: [options.floorCode]}]);
      let parkNum = `${obj[0].building}栋${obj[0].floors[0]}层${options.areaCode}区${options.carportCode}`;
      this.setData({
        carSpace:true,
        parkNum: parkNum,
        parkData: {
          flag: 'D', //未知参数
          building: options.buildingCode,
          floor: options.floorCode,
          area: options.areaCode,
          spaceNumber: options.carportCode
        }
      });
      this.carportTime(options);
    }else{
      this.parkTime(options);
    };
  },

  //从其余页面拿到carlist数据
  changeData(list){
    var carlist = [];
    for(var i=0;i<list.length;i++){
      carlist.push(list[i].carNo)
    }
    this.setData({
      carList: carlist
    })
    console.log(carlist)
  },
  //获取当前车场的停车区域
  getCarport(data){
    httpClient.GetCode(httpClient.AjaxPath + '/miniapp/fixedBook/carport/list', data, res => {
      if (res.result==0 && res.data!=''&&res.data!='[]'){
        this.setData({
          building: this.resolveCarport(res.data),
          buildingData: JSON.parse(res.data)
        });
      };
    })
  },
  resolveCarport(str){
    console.log(str,123)
    let data = typeof (str) == 'string' ? JSON.parse(str):str;
    let arr = [];
    console.log(data)
    for(let i=0;i<data.length;i++){
      arr[i] = { 'building': data[i].building,'floors':[]};
      for (let j = 0; j < data[i].floors.length;j++){
        let s = data[i]['floors'][j].split('');
        let t = s[0]=='B'? '负':'';
        t += this.data.numData[s[1]];
        arr[i]['floors'].push(t);
      };
    };
    return arr;
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
    //判断用户是否是从后退返回到这个页面，如果是需要从新调用接口获取预定时间等参数
    if (this.data.pageState=='hide'){
      if (this.data.parkData.areaCode != '') {
        this.carportTime(this.data.parkData);
      } else {
        this.parkTime({});
      };
    };
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      pageState:'hide'
    });
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
  
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      //Picker选中时设置车牌号，页面加载进来时是默认车牌号，再选择时发生变化
      defaultCar: this.data.carList[e.detail.value]
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    //计算停车时长
    var bookStartTime = this.data.date + " " + this.data.time;
    var bookEndTime = this.data.date2 + " " + this.data.time2;
    var timeDifference = httpClient.GetDateDiff(bookStartTime, bookEndTime, "minute");
    var bookPrice = this.data.bookPrice;
    var Difference = Math.ceil(timeDifference / 60);
    var bookFee = bookPrice * Difference;
    this.setData({
      timeDifference: timeDifference,
      bookFee: bookFee,
      bookFeeText: (bookFee / 100).toFixed(2),
      bookStartTime: bookStartTime,
      bookEndTime: bookEndTime
    })
  },
  bindDate2Change: function (e) {
    this.setData({
      date2: e.detail.value
    })
    console.log(this.data.date2);
    //计算停车时长
    var bookStartTime = this.data.date + " " + this.data.time;
    var bookEndTime = this.data.date2 + " " + this.data.time2;
    var timeDifference = httpClient.GetDateDiff(bookStartTime, bookEndTime, "minute");
    var bookPrice = this.data.bookPrice;
    var Difference = Math.ceil(timeDifference / 60);
    var bookFee = bookPrice * Difference;
    this.setData({
      timeDifference: timeDifference,
      bookFee: bookFee,
      bookFeeText: (bookFee / 100).toFixed(2),     
      bookStartTime: bookStartTime,
      bookEndTime: bookEndTime
    })
  },
})