var SIGN_REGEXP = /([yMdhsmS])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
  var len = len - (s + '').length;
  for (var i = 0; i < len; i++) {
    s = '0' + s;
  }
  return s;
};

export default {
  checkMobile: function (value) {
    if (this.isEmpty(value)) {
      return true;
    }
    let regx = /^(?:13\d|14\d|15\d|16\d|17\d|18\d|19[0123456789])-?\d{5}(\d{3}|\*{3})$/;
    if (regx.test(value)) {
      return true;
    }
    else {
      return false;
    }
  },
  /*check手机号*/
  checkMobilePhone: function (inputValue, e) {
    if (this.checkMobile(inputValue)) {
      $(e).removeClass('error-style');
      $(e).addClass("right-style");
      return true;
    }
    else {
      $(e).removeClass('right-style');
      $(e).addClass("error-style");
      return false;
    }
  },
  getQueryStringByName: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var context = "";
    if (r != null)
      context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
  },
  formatDate: {
    format: function (date, pattern) {
      pattern = pattern || DEFAULT_PATTERN;
      return pattern.replace(SIGN_REGEXP, function ($0) {
        switch ($0.charAt(0)) {
          case 'y':
            return padding(date.getFullYear(), $0.length);
          case 'M':
            return padding(date.getMonth() + 1, $0.length);
          case 'd':
            return padding(date.getDate(), $0.length);
          case 'w':
            return date.getDay() + 1;
          case 'h':
            return padding(date.getHours(), $0.length);
          case 'm':
            return padding(date.getMinutes(), $0.length);
          case 's':
            return padding(date.getSeconds(), $0.length);
          case 'S':
            return padding(date.getMilliseconds(), $0.length); //毫秒
        }
      });
    },
    parse: function (dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP);
      var matchs2 = dateString.match(/(\d)+/g);
      if (matchs1.length == matchs2.length) {
        var _date = new Date(1970, 0, 1);
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i]);
          var sign = matchs1[i];
          switch (sign.charAt(0)) {
            case 'y':
              _date.setFullYear(_int);
              break;
            case 'M':
              _date.setMonth(_int - 1);
              break;
            case 'd':
              _date.setDate(_int);
              break;
            case 'h':
              _date.setHours(_int);
              break;
            case 'm':
              _date.setMinutes(_int);
              break;
            case 's':
              _date.setSeconds(_int);
              break;
          }
        }
        return _date;
      }
      return null;
    },
    // 将十位或者十三位时间戳转换为xxxx-xx-xx
    timestampToTime: function (timestamp) {
      let timeString = String(timestamp)
      let date
      if (timeString.length < 11) {
        date = new Date(timestamp * 1000)//时间戳为10位需*1000
      } else {
        date = new Date(timestamp)//时间戳为13位的话不需乘1000
      }
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
      // h = date.getHours() + ':';
      // m = date.getMinutes() + ':';
      // s = date.getSeconds();
      // return Y+M+D+h+m+s;
      return Y + M + D;
    },
    timestampToDatetime(timestamp) {
      let timeString = String(timestamp)
      let date
      if (timeString.length < 11) {
        date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      } else {
        date = new Date(timestamp)
      }
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
      let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y + M + D + ' ' + h + m + s;
    }
  },
  formatArrayDate(key, array, dataList) {
    if (dataList.indexOf(key) >= 0) {
      var str = array[key];
      var timeZone;
      if (str != '' && str != null) {
        if (str.indexOf('+') > 6) {
          timeZone = parseInt(str.substring(str.indexOf('+'), str.indexOf('+') + 5));
          str = str.substring(6, str.indexOf('+'));
        } else if (str.lastIndexOf('-') > 6) {
          timeZone = parseInt(str.substring(19, 24));
          str = parseInt(str.substring(6, str.lastIndexOf('-')));
          if (str < 0) {
            timeZone = parseInt(array[key].substring(20, 25));
          }
        } else {
          str = str.substring(6, str.length - 2);
          timeZone = 0;
        }
        var localTimeZone = parseInt(new Date().toString().substring(28, 33));
        str = parseInt(str) - ((localTimeZone - timeZone) / 100 * 60 * 60 * 1000);
        var date = new Date();
        date.setTime(str);
        return date;
      }
      return array[key];
    } else {
      return array[key];
    }
  },
  isEmpty(obj) {
    if (obj === null || obj === undefined || obj === "") {
      return true;
    }
    return false;
  },
  isNotANumber(inputData) {
    var Letters = "1234567890";
    var i;
    var c;
    var flag = true;
    for (i = 0; i < inputData.toString().length; i++) {   //Letters.length() ->>>>取字符长度
      c = inputData.toString().charAt(i);
      if (Letters.indexOf(c) == -1) { //在"Letters"中找不到"c"   见下面的此函数的返回值
        flag = false;
      }
    }
    return !flag;
  },
  cloneObj(obj) {
    var str, newobj = obj.constructor === Array ? [] : {};
    if (typeof obj !== 'object') {
      return;
    } else if (window.JSON) {
      str = JSON.stringify(obj), //序列化对象
        newobj = JSON.parse(str); //还原
    } else {
      for (var i in obj) {
        newobj[i] = typeof obj[i] === 'object' ? this.cloneObj(obj[i]) : obj[i];
      }
    }
    return newobj;
  },
  // 递归实现一个深拷贝
  deepClone(source) {
    if (!source || typeof source !== 'object') {
      throw new Error('error arguments', 'shallowClone');
    }
    var targetObj = source.constructor === Array ? [] : {};
    for (var keys in source) {
      if (source.hasOwnProperty(keys)) {
        if (source[keys] && typeof source[keys] === 'object') {
          targetObj[keys] = source[keys].constructor === Array ? [] : {};
          targetObj[keys] = this.deepClone(source[keys]);
        } else {
          targetObj[keys] = source[keys];
        }
      }
    }
    return targetObj;
  },
  //判断字符串是否为数字
  isNum: function (value) {
    if (!/^[0-9]+.?[0-9]*$/.test(value)) {
      return false;
    }
    return true;
  },
  formatMoney: function (num) {
    let sign = "";
    if (isNaN(num)) {
      num = 0;
    }
    if (num < 0) {
      sign = "-";
    }
    let strNum = num + "";
    let arr1 = strNum.split(".");
    let hasPoint = false;//是否有小数部分
    let piontPart = "";//小数部分
    let intPart = strNum;//整数部分
    if (arr1.length >= 2) {
      hasPoint = true;
      piontPart = arr1[1];
      piontPart = piontPart.substring(0, 2);
      let point_3 = piontPart.substring(3, 3);
      if (point_3 > 4) {
        piontPart = piontPart + 1;
      }
      intPart = arr1[0];
    }

    let res = ''; //保存添加逗号的部分
    let intPartlength = intPart.length; //整数部分长度
    let maxcount = Math.ceil(intPartlength / 3); //整数部分需要添加几个逗号
    for (let i = 1; i <= maxcount; i++) //每三位添加一个逗号
    {
      let startIndex = intPartlength - i * 3; //开始位置
      if (startIndex < 0)//开始位置小于0时修正为0
      {
        startIndex = 0;
      }
      let endIndex = intPartlength - i * 3 + 3; //结束位置
      let part = intPart.substring(startIndex, endIndex) + ",";
      res = part + res;
    }
    res = res.substr(0, res.length - 1); //去掉最后一个逗号
    if (hasPoint) {
      return "￥" + sign + res + "." + piontPart;
    } else {
      return "￥" + sign + res;
    }
  },
  //根据键值对cookie的key获取value
  getCookie(c_name) {
    if (document.cookie.length > 0) {　　//先查询cookie是否为空，为空就return ""
      let c_start = document.cookie.indexOf(c_name + "=")　　//通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1　　
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1　　//最后这个+1其实就是表示"="号啦，这样就获取到了cookie值的开始位置
        let c_end = document.cookie.indexOf(";", c_start)　　//其实我刚看见indexOf()第二个参数的时候猛然有点晕，后来想起来表示指定的开始索引的位置...这句是为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断
        if (c_end == -1) c_end = document.cookie.length
        return decodeURI(document.cookie.substring(c_start, c_end))
      }
    }
    return ""
  },
  //键值对的方式创建cookie并设置有效期,有效期的单位为h
  setCookie(c_name, value, expiredays) {
    let exdate = new Date();
    exdate.setHours(exdate.getHours() + expiredays);//该行的有效期单位为hour
    // exdate.setDate(exdate.getDate() + expiredays);//改行的有效期单位为Day
    document.cookie = c_name + "=" + encodeURI(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + "; path=/" + ";domain=localhost"
    // if (days) {
    //   var date = new Date();
    //   date.setTime(date.getTime()+(days*24*60*60*1000));
    //   var expires = "; expires="+date.toGMTString();
    // }else{
    //   var expires = "";
    // }
    // document.cookie = name+"="+value+expires+"; path=/";
  },

  // 计算时间差
  GetDateTimeDiff: function (startTime, endTime) {
    var retValue = {};

    var date3 = endTime - startTime;  //时间差的毫秒数

    //计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    retValue.Days = days;

    var years = Math.floor(days / 365);
    retValue.Years = years;

    var months = Math.floor(days / 30);
    retValue.Months = months;

    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    retValue.Hours = hours;

    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    retValue.Minutes = minutes;

    //计算相差秒数
    var leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    retValue.Seconds = seconds;

    var strTime = "";
    if (years >= 1) {
      strTime = years + "年";
    } else if (months >= 1) {
      strTime = months + "个月";
    } else if (days >= 1) {
      strTime = days + "天";
    } else if (hours >= 1) {
      strTime = hours + "小时";
    } else {
      strTime = minutes + "分钟";
    }
    retValue.PubTime = strTime;
    return retValue;
  },
  //替换字符串里所有的内容
  strReplaceAll(str, reg, newStr) {
    var reg = new RegExp(reg, "g"); //创建正则RegExp对象
    return str.replace(reg, newStr);
  },
  // 指定字符串高亮
  strHighLight(str,key){
    if(!this.isEmpty(key)){
      const start = str.indexOf(key)
      const str1 = str.slice(0,start)
      const str2 = str.slice((start+key.length),str.length)
      return str1 + '<span style="color: #e33244">' + key + '</span>' + str2
    } else {
      return str
    }
  }
};
