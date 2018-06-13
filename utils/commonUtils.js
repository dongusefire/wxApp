function setHeader() {
    var header = {};
    var token = wx.getStorageSync("token");
    header.token = token;
    return header;
}

function formatDate(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  return [year, month, day].map(function(d, index) {
    if (index == 0) {
      return d + '年';
    } else if (index == 1) {
      return d + '月';
    } else {
      return d + '日';
    }
  }).join('');
}

module.exports = {
    setHeader: setHeader,
    formatDate:formatDate
}