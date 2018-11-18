/**
 * Created by wanxh on 2018/3/30.
 */
import {ip2, ip3, ip4, wsurl, base_except_port} from './publicIp.js'

const api = {
  formalUrl:base_except_port,
  GET_CUSTLIST: ip3 + 'custInfo/getCustList',//获得已注册会员列表
  GET_USERINFO: ip3.concat('user/getUserInfo'),//根据用户类型获得用户信息
  DEL_USERINFO: ip3.concat('redis/redisRemoveUserInfo'),//删除用户缓存信息
  GET_PARENT:ip3.concat('user/getParent'),//查询父账号ID
  GET_AGENCY: ip3.concat("agency/agencyInfo"),//获得代理机构信息
  CHECK_OWN_PATENT: ip3 + "ownPatent/checkOwnPatent",//判断我的专利表是否插入过专利
  CHECK_OWN_TMINFO: ip3 + "ownTminfo/checkOwnTminfo",//判断我的商标表是否插入过商标
  GET_HISTORY_RECORD_LIST: ip3 + 'historyRecord/getHistoryRecordList',//查询历史记录

  GET_RECORD_LABEL_LIST: ip3 + 'recordLabel/getRecordLabelList',//获得标签列表
  GET_INVEST_LIST: ip3 + 'recordImport/getInvestListByCompanyName',//获取该公司关联的对外投资公司
  ADD_RECORD_LABEL: ip3 + 'recordLabel/addRecordLabel', //增加标签
  DELETE_RECORD_LABEL: ip3 + 'recordLabel/deleteRecordLabel', //删除标签 和 改标签下的公司列表
  DELETE_RECORD_BY_ID: ip3 + 'recordImport/deleteRecordImportDetail', //删除公司根据ID
  EXPORT_RECORD_COMPANY: ip3 + 'recordImport/exportRecordCompany', //导出公司列表
  ADD_RECORD_IMPORT: ip3 + 'recordImport/addRecordImport', //新增公司列表
  ADD_RECORD_IMPORT_DETAIL: ip3 + 'recordImport/addRecordImportDetail', //单独新增公司
  GET_RECORD_IMPORT_LIST: ip3 + 'recordImport/getRecordImportList', //获得该标签的公司列表
  INSERT_CUST_INFO_LIST: ip3 + 'recordImport/insertCustInRecordImport', //导入会员公司列表
  GET_EXPORT_TITLE_LIST: ip3 + 'exportClassification/getExportTitleList', //查询导出数据字段
  GET_EXPORT_CLASSIFICATION: ip3 + 'exportClassification/getExportClassification', //获取调取数据的分类
  EXPORT_DETAIL_LIST: ip3 + 'exportClassification/exportDetailList', //导出数据
  DOWNLOAD_URL: ip3 + 'file/download?fileName=', //下载打开excel
  IMPORT_QICHACHA_INTERFACE_INFO: ip3 + 'qichacha/getAllInfo', //调取企查查接口,导入本地数据
  UPLOAD_EXCEL: ip3 + 'file/uploadExcel', //导入excel公司列表
  UPDATE_COMPANY_TYPE: ip3 + 'recordImport/updateCompanyType', //设置标签
  baseExcelView: base_except_port + '/excelOut/',// 导出文件一览路径   ????
  UPDATE_COMPANY_BY_AGENCY_TYPE:ip3.concat("dataUpdateCheck/updateCompanyByAgencyType"),//通过企业类型更新企业
  //登录
  LOGIN_INFO: ip2.concat("rbacmg/userlogin"),
};


export default api;
