/**
 * Created by wanxh on 2018/9/17.
 */
/**
 * 本地服务器
 * @type {string}
 */
// /*// // // //export const ip1 = 'http://localhost:3000/api/';
// // // // // export const ip1 = 'http://172.28.186.74:9092/api/';
// export const ip3 = 'http://localhost:8099/JSIPEX_API_REFORM/';
// // // // export const ip4 = "http://172.28.186.74:9023/JSIPEX_API_HISTORY/";
// // // // // // export const formalUrl = 'http://172.28.186.74/static/';
// export const wsurl = "ws://localhost:8099/JSIPEX_API_REFORM/";
// // // // // // export const base_except_port = 'http://localhost';
// // // // //
// export const ip2 = "http://172.28.186.74:9091/api/";
// // export const ip3 = 'http://172.28.186.74:9029/JSIPEX_API_REFORM/';
// export const ip4 = "http://172.28.186.74:9023/JSIPEX_API_HISTORY/";
// // export const wsurl = "ws://172.28.186.74:9029/JSIPEX_API_REFORM/";
// // export const base_except_port = 'http://172.28.186.74';
// export const base_except_port = 'http://localhost:8888';*/


/**companyInformation
 * 新区服务器
 * @type {{ip1: string, ip2: string, ip3: string, ip4: string, wsurl: string, base_except_port: string, formalUrl: string}}
 */
// export const ip1 = 'http://192.168.2.67/api/';

// export const ip4 = "http://192.168.2.67:9045/JSIPEX_API_HISTORY/";
// export const formalUrl = 'http://192.168.2.67/static/';

// export const ip2 = "http://192.168.2.67/api/";
// export const ip3 = 'http://192.168.2.67:9029/JSIPEX_API_REFORM/';
// export const ip4 = "http://192.168.2.67:9045/JSIPEX_API_HISTORY/";
// export const wsurl = "ws://192.168.2.67:9029/JSIPEX_API_REFORM/";
// export const base_except_port = 'http://192.168.2.67';

/**
 * 后台管理 83端口
 * @type {string}
 */
export const ip2 = "http://192.168.10.100/api/";
export const ip3 = 'http://192.168.10.100:9029/JSIPEX_API_REFORM/';
export const ip4 = "http://192.168.10.100:9023/JSIPEX_API_HISTORY/";
export const wsurl = "ws://192.168.10.100:9029/JSIPEX_API_REFORM/";
export const base_except_port = 'http://192.168.10.100';

/**
 * 官网服务器
 * @type {{ip1: string, ip2: string, ip3: string, ip4: string, wsurl: string, base_except_port: string, formalUrl: string}}
 */
// // export const ip1 = "http://www.jsipex.com/api/";
// export const ip2 = "http://www.jsipex.com/api/";
// // export const ip3 ="http://www.jsipex.com/JSIPEX_API/";//old java
// export const ip3 = 'http://www.jsipex.com/JSIPEX_API_REFORM/';//new java
// export const ip4 = "http://www.jsipex.com/JSIPEX_API_HISTORY/";
// // export const formalUrl = "http://www.jsipex.com/static/";
// export const wsurl = "ws://www.jsipex.com/JSIPEX_API_REFORM/";
// export const base_except_port = 'http://www.jsipex.com';


const publicIp = {
  // ip1:ip1,
  ip2:ip2,
  ip3:ip3,
  ip4:ip4,
  wsurl:wsurl,
  base_except_port:base_except_port,
  // formalUrl:formalUrl
};

export default publicIp
