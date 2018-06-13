var config = require('../config.js');
var AjaxPath = 'https://guide.api.doyao.cn/blockChain';
var AjaxPath2 = 'https://dapi2.ecosysnet.com/v2';
var AjaxPath3 = 'https://envaccess.huatugz.com';
function postJson(url, jsonString, successCallback = null, failCallback = null, completeCallback = null) {
  wx.request({
    url: url,
    data: jsonString,
    method: 'POST',
    header: {
      'content-type': 'application/json;charset=utf-8'
    },
    success: function (ret) {
      if (successCallback != null) {
        successCallback(ret.data);
      }
    },
    fail: function (ret) {
      if (failCallback != null) {
        failCallback('接口访问异常，请稍后再试');
      }
    },
    complete: function () {
      if (completeCallback != null) {
        completeCallback();
      }
    }
  })
}
function putJson(url, jsonString, successCallback = null, failCallback = null, completeCallback = null) {
  wx.request({
    url: url,
    data: jsonString,
    method: 'PUT',
    header: {
      'content-type': 'application/json;charset=utf-8'
    },
    success: function (ret) {
      if (successCallback != null) {
        successCallback(ret.data);
      }
    },
    fail: function (ret) {
      if (failCallback != null) {
        failCallback('接口访问异常，请稍后再试');
      }
    },
    complete: function () {
      if (completeCallback != null) {
        completeCallback();
      }
    }
  })
}
function postJsonWithToken(url, jsonString, successCallback = null, failCallback = null, completeCallback = null) {
  var token = wx.getStorageSync("token");
  wx.request({
    url: url,
    data: jsonString,
    method: 'POST',
    header: {
      'content-type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + token
    },
    success: function (ret) {
      if (successCallback != null) {
        if (ret.data.result == 500) {
          wx.showModal({
            title: '系统提示',
            content: '登录已过期，请先登录',
            confirmText: '去登录',
            showCancel: false,
            confirmColor: '#30DDD9',
            success() {
              wx.redirectTo({
                url: '../../pages/sign/sign?backurl=2'
              });
            }
          });
        } else {
          successCallback(ret.data);
        };
      }
    },
    fail: function (ret) {
      if (failCallback != null) {
        failCallback('接口访问异常，请稍后再试');
      }
    },
    complete: function () {
      if (completeCallback != null) {
        completeCallback();
      }
    }
  })
}

function GetCode(url, data, successCallback = null, errCallback = null, completeCallback = null) {
  let header = {
    'content-type': 'application/json;charset=utf-8'
  };
  var token = wx.getStorageSync("token");
  if (token != '') {
    header['Authorization'] = 'Bearer ' + token;
  };
  if (data == null) {
    data = {};
  };
  wx.request({
    url: url,
    method: "GET",
    header: header,
    data: data,
    success: function (ret) {
      if (successCallback != null) {
        if (ret.data.result == 500) {
          wx.showModal({
            title: '系统提示',
            content: '登录已过期，请先登录',
            confirmText: '去登录',
            showCancel: false,
            confirmColor: '#30DDD9',
            success() {
              wx.redirectTo({
                url: '../../pages/sign/sign?backurl=2'
              });
            }
          });
        } else {
          successCallback(ret.data);
        };
      }
    },
    fail: function (err) {
      if (errCallback != null) {
        errCallback(err.data);
      }
    },
    complete: function () {
      if (completeCallback != null) {
        completeCallback();
      }
    }
  })
}

function sendGet(url, header, data, successCallback = null, exceptionCallback = null, completeCallback = null) {
  if (header == null) {
    header = {};
  }
  if (data == null) {
    data = {}
  }
  wx.request({
    url: url,
    method: 'GET',
    header: header,
    data: data,
    success: function (ret) {
      if (successCallback != null) {
        if (ret.data.result == 500) {
          wx.showModal({
            title: '系统提示',
            content: '登录已过期，请先登录',
            confirmText: '去登录',
            showCancel: false,
            confirmColor: '#30DDD9',
            success() {
              wx.navigateTo({
                url: '../../pages/sign/sign?backurl=2'
              });
            }
          });
        } else if (ret.data == null || ret.data == '' || ret.data.result == null || ret.data.result == '') {
          exceptionCallback("服务器异常，请联系管理员")
        } else {
          successCallback(ret.data);
        }
      }
    },
    fail: function (ret) {
      if (exceptionCallback != null) {
        exceptionCallback('接口访问异常，请稍后再试');
      }
    },
    complete: function () {
      if (completeCallback != null) {
        completeCallback();
      }
    }
  })
}

function sendPost(url, header, data, successCallback = null, failCallback = null, completeCallback = null) {
  if (header == null) {
    header = {}
  }
  if (data == null) {
    data = {}
  } else {
    var tmp = "";
    for (var k in data) {
      tmp += "&" + k + "=" + data[k];
    }
    if (tmp.length > 0) {
      url += "?";
      url += tmp.substr(1);
    }
  }

  wx.request({
    url: url,
    method: "POST",
    header: header,
    data: data,
    success: function (ret) {
      if (successCallback != null) {
        if (ret.data.result == 500) {
          wx.showModal({
            title: '系统提示',
            content: '登录已过期，请先登录',
            confirmText: '去登录',
            showCancel: false,
            confirmColor: '#30DDD9',
            success() {
              wx.redirectTo({
                url: '../../pages/sign/sign?backurl=2'
              });
            }
          });
        } else {
          successCallback(ret.data);
        };
      }
    },
    fail: function () {
      if (failCallback != null) {
        failCallback("接口访问异常，请稍后再试");
      }
    },
    complete: function () {
      if (completeCallback != null) {
        completeCallback();
      }
    }
  })
}

function orderPost(url, header, data, successCallback = null, failCallback = null, completeCallback = null) {
  if (header == null) {
    header = {}
  }
  if (data == null) {
    data = {}
  }
  wx.request({
    url: url,
    method: "POST",
    header: header,
    data: data,
    success: function (ret) {
      if (successCallback != null) {
        if (ret.data.result == 500) {
          wx.showModal({
            title: '系统提示',
            content: '登录已过期，请先登录',
            confirmText: '去登录',
            showCancel: false,
            confirmColor: '#30DDD9',
            success() {
              wx.redirectTo({
                url: '../../pages/sign/sign?backurl=2'
              });
            }
          });
        } else {
          successCallback(ret.data);
        };
      }
    },
    fail: function () {
      if (failCallback != null) {
        failCallback("接口访问异常，请稍后再试");
      }
    },
    complete: function () {
      if (completeCallback != null) {
        completeCallback();
      }
    }
  })
}

function sendPut(url, header, data, successCallback = null, failCallback = null, completeCallback = null) {
  if (header == null) {
    header = {}
  }

  if (data == null) {
    data = {}
  } else {
    var tmp = "";
    for (var k in data) {
      tmp += "&" + k + "=" + data[k];
    }
    if (tmp.length > 0) {
      url += "?";
      url += tmp.substr(1);
    }
  }

  wx.request({
    url: url,
    method: "PUT",
    header: header,
    data: data,
    success: function (ret) {
      if (successCallback != null) {
        if (ret.data.result == 500) {
          wx.showModal({
            title: '系统提示',
            content: '登录已过期，请先登录',
            confirmText: '去登录',
            showCancel: false,
            confirmColor: '#30DDD9',
            success() {
              wx.redirectTo({
                url: '../../pages/sign/sign?backurl=2'
              });
            }
          });
        } else {
          successCallback(ret.data);
        };
      }
    },
    fail: function () {
      if (failCallback != null) {
        failCallback("接口访问异常，请稍后再试");
      }
    },
    complete: function () {
      if (completeCallback != null) {
        completeCallback();
      }
    }
  })
}
function sendDel(url, header, data, successCallback = null, failCallback = null, completeCallback = null) {
  if (header == null) {
    header = {}
  }

  if (data == null) {
    data = {}
  } else {
    var tmp = "";
    for (var k in data) {
      tmp += "&" + k + "=" + data[k];
    }
    if (tmp.length > 0) {
      url += "?";
      url += tmp.substr(1);
    }
  }

  wx.request({
    url: url,
    method: "DELETE",
    header: header,
    data: data,
    success: function (ret) {
      if (successCallback != null) {
        if (ret.data.result == 500) {
          wx.showModal({
            title: '系统提示',
            content: '登录已过期，请先登录',
            confirmText: '去登录',
            showCancel: false,
            confirmColor: '#30DDD9',
            success() {
              wx.redirectTo({
                url: '../../pages/sign/sign?backurl=2'
              });
            }
          });
        } else {
          successCallback(ret.data);
        };
      }
    },
    fail: function () {
      if (failCallback != null) {
        failCallback("接口访问异常，请稍后再试");
      }
    },
    complete: function () {
      if (completeCallback != null) {
        completeCallback();
      }
    }
  })
}

//获得时间差，时间格式为 年-月-日，返回精度为:秒，分，小时，天
function GetDateDiff(startTime, endTime, diffType) {
  startTime = startTime.replace(/\-/g, "/");
  endTime = endTime.replace(/\-/g, "/");
  //将计算间隔类型字符串转换为小写
  diffType = diffType.toLowerCase();
  var sTime = new Date(startTime); //开始时间
  var eTime = new Date(endTime); //结束时间
  //作为除数的数字
  var divNum = 1;
  switch (diffType) {
    case "second":
      divNum = 1000;
      break;
    case "minute":
      divNum = 1000 * 60;
      break;
    case "hour":
      divNum = 1000 * 3600;
    case "day":
      divNum = 1000 * 3600 * 24;
      break;
    default:
      break;
  }
  return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
}

function createSession(successCallback = null, exceptionCallBack = null) {
  wx.login({
    success: function (loginRes) {
      wx.getUserInfo({
        success: function (userInfoRes) {
          postJson(config.prefix.apiPrefix + config.requestUrl.createSession,
            JSON.stringify({ 'code': loginRes.code, 'encryptedData': userInfoRes.encryptedData, 'iv': userInfoRes.iv }),
            function (ret) {
              if (ret.code == config.OP_CODE.SUCCESS && ret.data != null & ret.data != '') {
                wx.setStorageSync("token", ret.data);
                successCallback(ret);
              } else {
                if (exceptionCallBack != null) {
                  exceptionCallBack(ret.msg);
                }
              }
            }, exceptionCallBack);
        },
        fail: function () {
          if (exceptionCallBack != null) {
            exceptionCallBack('服务器异常');
          }
        }
      })
    },
    fail: function () {
      if (exceptionCallBack != null) {
        exceptionCallBack('服务器异常');
      }
    }
  })
}

module.exports = {
  postJson: postJson,
  postJsonWithToken: postJsonWithToken,
  createSession: createSession,
  sendGet: sendGet,
  sendPost: sendPost,
  orderPost: orderPost,
  AjaxPath: AjaxPath,
  AjaxPath2: AjaxPath2,
  AjaxPath3: AjaxPath3,
  GetCode: GetCode,
  putJson: putJson,
  sendPut: sendPut,
  sendDel: sendDel,
  GetDateDiff: GetDateDiff
}