//dev config
var prefix = {
  apiPrefix: "https://devwechat.ajbcloud.com"       //开发环境地址
}

var requestUrl = {
   parkingList: '/miniApp/parkingController/list'                                   //附近停车场
}

var OP_CODE = {
  SUCCESS: '0000',
  SESSION_TIMEOUT: '-8888',
  NETWORK_EXCEPTION: '1000',
  SYSTEM_EXCEPTION: '-9999',
  CARD_TYPE_MONTHLY_CARD: '5000'
}

var provinceItems = ['京', '津', '冀', '晋', '蒙', '辽', '吉', '黑', '沪', '苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '桂', '琼', '渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁', '新']

module.exports = {
  prefix: prefix,
  requestUrl: requestUrl,
  provinceItems: provinceItems,
  OP_CODE: OP_CODE
}