//app.js
var httpClient = require("./utils/httpClient.js");
App({
  onLaunch: function () {
    this.getCreditValue();
  },
  mapHost: 'https://dev.huatugz.com', //测试地址：https://dev.huatugz.com 正式地址：https://envaccess.huatugz.com
  getUserInfo(userRes){
    this.globalData.userInfo = userRes.userInfo;
    var obj = {};
    obj.code = this.globalData.userCode;
    obj.iv = userRes.iv;
    obj.encryptedData = userRes.encryptedData;
    httpClient.postJson(httpClient.AjaxPath + '/miniapp/user/decode',
    JSON.stringify(obj), (res) => {
      this.globalData.openId = res.data.openId;
      this.globalData.phoneNumber = res.data.phoneNumber;
    }, (err) => {
      console.log("error: " + JSON.stringify(err));
    });
  },
  onShow: function (options) {
    // Do something when show.
  },
  onHide: function () {
    // Do something when hide.
  },
  onError: function (msg) {
    console.log(msg)
  },
  testData:[
    {
      "account": "ewdB8H1Yf64yXw8PPy5dH5oXDj2Vn1jSUG",
      "private_key": "snQ1QMwG1YnRwHYyyRy2NvTyHYXo3"
    },
    {
      "account": "ea96udv3A7aDq3z44neb2DRvXQTJ7ZgvFy",
      "private_key": "sae3jN462ioSoWbKraVbhpw6pfgDZ"
    },
    {
      "account": "eBye8L56XyfmRAmEBeopreY2FfzxvSBQix",
      "private_key": "ssVzomuUB2ayYnyAsHUzRSkjWhw9J"
    },
  ],
  //增加信用
  addCredit(account, _key) {
    httpClient.postJson(httpClient.AjaxPath2 + '/v2/transfer/ea96udv3A7aDq3z44neb2DRvXQTD7ZgvFy?validated=true',
      {
        "private_key": "Msae3jN462ioSoWbKraVbhpvg6pfgOZ",
        "transfer":{
          "destination_account": account,
          "amount":"5",
          "code":"DCC",
          "issuer":"eaKyYpW5U61DGtWhg9EomaCCPpZadqN9GS"
          }
      }, (res) => {

      }, (err) => {
        console.log("error:" + DSON.stringify(err));
      });
  },
  //减少信用
  reduceCredit(account, _key){
    httpClient.postJson(httpClient.AjaxPath2 + '/v2/transfer/' + account + '?validated=true',
      {
        "private_key": _key,
        "transfer": {
            "destination_account": "epi4PMcv/hDktaFVpl3K37kCsv/3BQFYYABl",
            "amount":"5",
            "code":"DCC",
            "issuer":"eaKyYpW5U61DGtWhg9EomaCCPpZadqN9GS"
        }
      }, (res) => {

      }, (err) => {
          console.log("error:" + DSON.stringify(err));
    });
  },
  getCreditValue(){
    httpClient.GetCode(httpClient.AjaxPath2 +'/assets/eheApjnL6SnFcJBBQWbh8nF5LtGKvZXB6i',{
      code:'YGB'
    },res=>{
      if(res.success){
        console.log(res)
        this.globalData.creditValue = res.assets[0].amount;
      }else{
        console.log('异常信息',res);
      };
    })
  },
  globalData: {
    openId: null,
    userInfo: null,
    creditValue:0,
    phoneNumber:'',
    userCode:'',
  },
  trim(str){   
    return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');   
  },
  formatDateTime(inputTime) {
    var date = new Date(inputTime);  
    var y = date.getFullYear();    
    var m = date.getMonth() + 1;    
    m = m < 10 ? ('0' + m) : m;    
    var d = date.getDate();    
    d = d < 10 ? ('0' + d) : d;    
    var h = date.getHours();  
    h = h < 10 ? ('0' + h) : h;  
    var minute = date.getMinutes();  
    var second = date.getSeconds();  
    minute = minute < 10 ? ('0' + minute) : minute;    
    second = second < 10 ? ('0' + second) : second;   
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;    
  }
})