/**
 * 首先将封装的get和post引入
 * api接口统一管理
 */

import { post, get, getUrl, gets, posts } from "@/request/http";

/**
 * login
 * @param p
 * @returns {*|Promise<any>}
 */

export const apiUserInfo = p => post("/userInfo", p);
export const apiLogin = p => post("/Login", p);
//-----------首页--------------------
export const apiHome = p => get("/home", p);

//-----------------供应商管理-------------
//---供应商列表
export const apiSupperlist = () => get("/supplier_list");
export const apiSupplierListSearch = p => post("/supplier_list_search", p);
export const apiSupplierListSearchPageInation = p =>
  getUrl("/supplier_list_search_pageInation", p);
export const apiSupplierAdd = p => post("/supplier_add", p);
export const supplierGetAll = p => get("/SupplierService/GetAll", p);
export const supplierGetCooperationStatus = p =>
  get("/SupplierService/GetCooperationStatus");
export const supplierGetCooperationType = p =>
  get("/SupplierService/GetCooperationType");

//---产品列表
export const apiProductList = () => get("/product_list");
export const apiProductListSearch = p => post("/product_list_search", p);
export const apiProductListPageInation = p => getUrl("/product_list", p);
export const apiProductListAdd = p => post("/product_list_add", p);
//----------------上游折标-----------------
//---上游折标search参数
export const apiUpstreamFoldingSearch = () => get("/upstream_folding");
//---上游折标分页
export const apiUpstreamFoldingPageInation = p =>
  getUrl("/upstream_folding_pageInation", p);
//---上游折标搜索
export const apiUpstreamFolding = p => post("/upstream_folding_search", p);
//---上游折标保存
export const apiUpstreamFoldingAdd = p => post("/upstream_folding_add", p);
//---继续率搜索参数
export const apiContinuationRateBounsParam = () =>
  get("/continuation_rate_bouns_param");
//---继续率查询
export const apiContinuationRateBounsSearch = p =>
  post("/continuation_rate_bouns_search", p);
//---继续率分页
export const apiContinuationRateBounsPageInation = p =>
  getUrl("/continuation_rate_bouns_pageInation", p);
//---继续率保存/提交
export const apiContinuationRateBounsAdd = p =>
  post("/continuation_rate_bouns_add", p);
//---新增奖励search选项
export const apiNewIncentivesParam = () => get("/new_incentives_param");
//---新增奖励搜索
export const apiNewIncentivesSearch = p => post("/new_incentives_search", p);
//---新增分页
export const apiNewIncentivesPageInation = p =>
  getUrl("/new_incentives_pageInation", p);
//---新增奖励提交保存
export const apiNewIncentivesAdd = p => post("/new_incentives_add", p);
//---续期服务参数
export const apiRenewalServiceParam = p => get("/renewal_service_param", p);
export const apiRenewalServiceSearch = p => post("/renewal_service_search", p);
export const apiRenewalServicePageInation = p =>
  getUrl("/renewal_service_pageInation", p);

//--------------------------
//重置密码
export const passwordReset = p => post("passwordReset", p);
//获取账户详情
export const getaccountdetailss = () => get("getaccountdetailss");
//账户详情
export const accountdetailss = p => post("accountdetailss", p);
//读取策略组
export const ReadPolicyGroup = p => post("ReadPolicyGroup", p);
//添加策略组
export const AddPolicyGroup = a => post("AddPolicyGroup", a);
//策略组获取单条数据
export const OnePolicyGroup = id => post("OnePolicyGroup", id);
//删除策略组 单条
export const DelPolicyGroup = id => post("DelPolicyGroup", id);
//修改策略组
export const UpdsPolicyGroup = id => post("UpdsPolicyGroup", id);
//获取全部权限
export const GetAllRuel = id => get("GetAllRuel", id);
//获取机构
export const GetAllmechanism = () => get("GetAllmechanism");
//获取所有的机构账号
export const GetAllmechanismAccount = p => post("GetAllmechanismAccount", p);
//添加机构账号
export const AddMechanismAccount = p => post("AddMechanismAccount", p);
//修改机构账号
export const UpdMechanismAccount = p => post("UpdMechanismAccount", p);
//删除机构账号
export const DelMechanismAccount = p => post("DelMechanismAccount", p);

export const apiQuarterlyPromotionSearch = p =>
  get("/quarterly_promotion_search", p);

export const apiDownstreamFoldingSearch = p =>
  get("/downstream_folding_search", p);
export const apiDownstreamFoldingAdd = p => get("/downstream_folding_add", p);
export const apiInstitutionalExpensesSearch = p =>
  get("/institutional_expenses_search", p);
export const apiInstitutionalExpensesAdd = p =>
  get("/institutional_expensesAdd", p);

export const apiWorkerManagementSearch = p =>
  get("/worker_management_search", p);
export const apiMarketingStaffRank = p => get("/marketing_staff_rank", p);
export const apiInsuranceMarketer = p => get("/insurance_marketer", p);

export const apiBasicLawAdministration = p =>
  get("/basicLaw_administration", p);
export const apiSalarySettlementSearch = p =>
  get("/salary_settlement_search", p);
export const apiSalarySettlement = p => get("/salary_settlement", p);
export const apiAttendanceManagementSearch = p =>
  get("/attendance_management_search", p);
export const apiDeductionSearch = p => get("/deduction_search", p);

export const apiCompanyRetentionRateSearch = p =>
  get("/company_retention_rate_search", p);

export const apiTargetConfigurationSearch = p =>
  get("/target_configuration_search", p);
export const apiManpowerReportSearch = p => get("/manpower_report_search", p);

//获取所有的员工账号
export const GetAllStaff = p => post("GetAllStaff", p);
//添加员工账号
export const AddStaff = p => post("AddStaff", p);
//修改员工账号
export const UpdStaff = p => post("UpdStaff", p);
//删除员工账号
export const DelStaff = p => post("DelStaff", p);

//获取我的消息
export const GetAllMsg = p => post("GetAllMsg", p);

//===============================================
//理赔分类获取顶级分类
export const GetLpclass = () => get("GetLpclass");
export const GetLpdata = p => post("GetLpdata", p);
export const Addlipei = p => post("Addlipei", p);
export const Dellipei = p => post("Dellipei", p);
export const Updlipei = p => post("Updlipei", p);

//理赔增加
export const getlpsdata = p => post("getlpdata", p);
export const addlpdata = p => post("addlpdata", p);
export const dellpdata = p => post("dellpdata", p);
export const updlpdata = p => post("updlpdata", p);

//连续理赔
export const lxlipei = p => post("lxlipei", p);
export const addlianxulipei = p => post("addlxlipei", p);
export const dellianxulipei = p => post("dellxlipei", p);
export const updlianxulipei = p => post("updlxlipei", p);
//理赔工具
//理赔公司获取
export const lipeigongsi = p => post("lipeigongsi", p);
//添加理赔工具
export const bindgongsi = p => post("bindgongsi", p);
//理赔工具列表
export const getlipeigongsidata = p => post("getlipeigongsidata", p);
//理赔列表
export const lipeilist = p => post("lipeilist", p);
export const addlipeidata = p => post("addlipeidata", p);
export const dellipeidata = p => post("dellipeidata", p);
export const updlipeidata = p => post("updlipeidata", p);
//获取保险公司
export const baoxiangongsi = () => get("baoxiangongsi");

//课堂管理
export const zhishilist = p => post("zhishilist", p);
export const addzhishi = p => post("addzhishi", p);
export const delzhishi = p => post("delzhishi", p);
export const updzhishi = p => post("updzhishi", p);
export const fabuzhishi = p => post("fabuzhishi", p);
export const qxfabuzhishi = p => post("qxfabuzhishi", p);

//头条管理
export const toutiaolist = p => post("toutiaolist", p);
export const addtoutiao = p => post("addtoutiao", p);
export const updtoutiao = p => post("updtoutiao", p);
export const deltoutiao = p => post("deltoutiao", p);
export const fabutoutiao = p => post("fabutoutiao", p);
export const quxiaotoutiao = p => post("quxiaotoutiao", p);

//机构管理-机构分类
export const getjigouclass = p => post("getjigouclass", p);
export const setjigouclass = p => post("setjigouclass", p);
//机构管理-机构列表
export const getjigoulist = p => post("getjigoulist", p);
export const addjigoulist = p => post("addjigoulist", p);
export const updjigoulist = p => post("updjigoulist", p);

//员工管理-内勤列表
export const yglist = p => post("yglist", p);
export const addyg = p => post("addyg", p);
export const updyg = p => post("updyg", p);
export const delyg = p => post("delyg", p);

//获取获取险种   机构   供应商  机构类型
export const getallparameter = () => get("/getallparameter");
//统计管理-供应商保费
/********查询接口 */
export const getSupplierPermiunr = () => get("/supplier_premium");
/*********导出接口 */
export const exportSupplierPermiunr = () => post("/exportSupplier_premium");

// 我的消息
export const MyMessage = obj => get("MyMessage", obj);
// 我的消息搜索
export const MyMessageSearch = obj => posts("MyMessageSearch", obj);
// 我的消息-添加
export const addMyMessage = obj => posts("addMyMessage", obj);
// 我的消息-添加
export const sendMyMessage = obj => posts("sendMyMessage", obj);
// 我的消息-删除
export const addMyMessageDelete = obj => posts("addMyMessageDelete", obj);
// 展业工具
export const ExhibitionTools = obj => get("ExhibitionTools", obj);
// 展业工具-搜索
export const ExhibitionToolsSearch = obj => posts("ExhibitionToolsSearch", obj);
// 展业工具-删除
export const ExhibitionToolsDelete = obj => posts("ExhibitionToolsDelete", obj);
// app 首页管理-热销产品
export const APPHomepageModule = obj => get("APPHomepageModule", obj);
// app 首页管理-热销产品-删除
export const APPHomepageModuleDelete = obj =>
  posts("APPHomepageModuleDelete", obj);
// app 首页管理-轮播
export const APPHomepageModuleBanner = obj =>
  get("APPHomepageModuleBanner", obj);

//===============================================
