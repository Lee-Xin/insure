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
export const apiSupplierAdd = p => post("/supplier_add", p);
export const supplierGetAll = p => get("/SupplierService/GetAll", p);
export const supplierGetById = p => get("/SupplierService/GetById", p);
export const supplierGetCooperationStatus = p =>
    get("/SupplierService/GetCooperationStatus");
export const supplierGetCooperationType = p =>
    get("/SupplierService/GetCooperationType");
export const apiSupperlist = () => get("/supplier_list");

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

//公司类型
export const getComTypeList = () => get("getComTypeList");

//经营范围
export const getBusinessScopeList = () => get("getBusinessScopeList");

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

//目标配置
//列表
export const apiTargetConfigurationSearch = p =>
    get("/target_configuration_search", p);
//保存
export const apiTargetConfigurationSave = p =>
    post("/target_configuration_save", p);

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
export const getjigoujibie = p => get("jigoujibie", p);
export const getTeamTypeList = p => get("teamTypeList", p);
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
export const getSupplierPermiunr = p => get("/supplier_premium", p);
/*********导出接口 */
export const exportSupplierPermiunr = p => post("/exportSupplier_premium", p);

//统计管理-机构保费
/********查询接口 */
export const getAgencyPermiunr = p => get("/agency_premium", p);
/*********导出接口 */
export const exportAgencyPermiunr = p => post("/exportAgency_premium", p);
//统计管理-人力报表
/*********导出接口 */
export const exportManpowerReport = p => post("/exportManpower_report", p);
//统计管理-产能报表
/**********保单性质列表 */
export const getCapacityTypeList = p => get("/capacity_type_list", p);
//查询
export const getCapacityList = p => get("/capacity_list", p);
//导出
export const exportCapacity = p => post("/capacity_export", p);
//统计管理-业务报表
//查询
export const getBusinessList = p => get("/business_list", p);
//导出
export const exportBusiness = p => post("/business_export", p);
//统计管理-目标进度追踪
//查询
export const gettargetProgressList = p => get("/targetProgress_list", p);
//导出
export const exporttargetProgress = p => post("/targetProgress_export", p);
//统计管理-产品结构报表
//查询
export const getproductStructureList = p => get("/productStructure_list", p);
export const getproductStructureDetailList = p =>
    get("/productStructureDetail_list", p);
//导出
export const exportproductStructure = p => post("/productStructure_export", p);
export const exportproductStructureDetail = p =>
    post("/productStructureDetail_export", p);

//统计管理-生命线报表
//查询
export const getlifelinereport = p => get("/lifelinereport_list", p);
//导出
export const exportlifelinereport = p => post("/lifelinereport_export", p);
//统计管理-件数报表
//查询
export const getNumberReportList = p => get("/numberReport_list", p);
//统计管理-保费报表
//查询
export const getPremiumStatement = p => get("/premiumStatement_list", p);
//统计管理-直辖团队报表
//查询
export const getDirectTeamReport = p => get("/directTeamReport_list", p);
//统计管理-增员人数报表
//查询
export const getPersonalAdditionStatementList = p =>
    get("/personalAdditionStatement_list", p);
//统计管理-团队增员报表
//查询
export const getTeamGrowthReportList = p => get("/teamGrowthReport_list", p);

//课堂管理-头条咨讯
//作者列表
export const getAuthorList = p => get("/author_list", p);
//查询
export const getHeadlineNewsList = p => get("/headlineNews_list", p);
//图片上传
export const uploadImg = p => post("/upload_img", p);
//根据id查询详情
export const getHeadlineNewsDetail = p => get("/headlineNews_detail", p);
//课堂管理-我的学院
//查询
export const getMyCollegeList = p => get("/myCollege_list", p);
//根据id查询详情
export const getMyCollegeDetail = p => get("/myCollege_detail", p);
//添加分类
export const addCollegeType = p => post("/addCollegeType", p);
//编辑分类
export const editCollegeType = p => post("/editCollegeType", p);
//删除分类
export const delCollegeType = p => post("/delCollegeType", p);
//理赔管理-理赔知识
//查询
export const getClaimsKnowledgeList = p => get("/claimsKnowledge_list", p);
//删除
export const delClaimsKnowledge = p => post("delClaimsKnowledge", p);
//发布
export const sendClaimsKnowledge = p => post("sendClaimsKnowledge", p);
//添加编辑
export const addClaimsKnowledge = p => post("addClaimsKnowledge", p);
//根据id查询详情
export const getClaimsKnowledgeDetail = p => get("/claimsKnowledge_detail", p);
//知识分类
//查询
export const getClassificationOfKnowledgeList = p =>
    get("/ClassificationOfKnowledge_list", p);
//添加分类
export const addClassificationOfKnowledge = p =>
    post("/addClassificationOfKnowledge", p);
//编辑分类
export const editClassificationOfKnowledge = p =>
    post("/editClassificationOfKnowledge", p);
//删除分类
export const delClassificationOfKnowledge = p =>
    post("/delClassificationOfKnowledge", p);
//理赔管理-连续理赔
//查询
export const getContinuousClaimsList = p => get("/ContinuousClaims_list", p);
//删除
export const delContinuousClaims = p => post("delContinuousClaims", p);
//添加编辑
export const addContinuousClaims = p => post("addContinuousClaims", p);
//根据id查询详情
export const getContinuousClaimsDetail = p =>
    get("/ContinuousClaims_detail", p);
//理赔工具
//查询
export const getClaimsToolList = p => get("/ClaimsTool_list", p);

//获取公司
export const getCompanyList = p => get("/company_list", p);
//关联公司
export const guanlianCompany = p => post("/guanlianCompany", p);
//理赔列表
//查询
export const getClaimsList = p => get("/Claims_list", p);
//删除
export const delClaims = p => post("delClaims", p);
//添加编辑
export const addClaims = p => post("addClaims", p);
//根据id查询详情
export const getClaimsDetail = p => get("/Claims_detail", p);
//下载模板
export const ClaimsDownloadModel = p => post("/Claims_downloadModel", p);
//导入理赔
export const ClaimsUploadModel = p => post("/Claims_uploadModel", p);
//导出理赔
export const ClaimsDownload = p => post("/Claims_download", p);
//权限列表
//查询
export const getPermissionList = p => get("/PermissionList_list", p);
//删除
export const delPermissionList = p => post("delPermissionList", p);
//添加编辑
export const addPermissionList = p => post("addPermissionList", p);
//根据id查询详情
export const getPermissionListDetail = p => get("/PermissionList_detail", p);
//获取所有的权限列表
export const getAllPermissionList = p => get("/allPermissionList_list", p);
//机构账号
//查询
export const getInstitutionalAccount = p =>
    get("/InstitutionalAccount_list", p);
//删除
export const delInstitutionalAccount = p => post("delInstitutionalAccount", p);
//添加编辑
export const addInstitutionalAccount = p => post("addInstitutionalAccount", p);
//获取策略组没有分页
export const getPermissionListNoPage = p =>
    get("/PermissionListNoPage_list", p);
//内勤人员账号
//查询
export const getInsideStaffAccount = p => get("/InsideStaffAccount_list", p);
//删除
export const delInsideStaffAccount = p => post("delInsideStaffAccount", p);
//添加编辑
export const addInsideStaffAccount = p => post("addInsideStaffAccount", p);
//员工列表
export const getEmployeeList = p => get("/employeeList_list", p);
//头像设置
//获取头像
export const getAvatar = p => get("/getAvatar", p);
//修改头像
export const editAvatar = p => post("/editAvatar", p);
//重置密码
export const resetPassword = p => post("/resetPassword", p);

// 我的消息
// 我的消息搜索
export const MyMessageSearch = obj => get("MyMessageSearch", obj);
// 我的消息-添加
export const addMyMessage = obj => post("addMyMessage", obj);
// 我的消息-推送
export const sendMyMessage = obj => post("sendMyMessage", obj);
// 我的消息-删除
export const addMyMessageDelete = obj => post("addMyMessageDelete", obj);
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
//app首页上架
export const sendAppHome = p => post("sendAppHome", p);
//产品类型
export const getProductList = p => get("getProductList", p);
//保存app首页添加编辑
export const saveAppHome = p => post("saveAppHome", p);

// 快保 首页管理
export const AutoguardHomepageModule = obj =>
    get("AutoguardHomepageModule", obj);
// 快保 首页管理-删除
export const AutoguardHomepageModuleDelete = obj =>
    posts("AutoguardHomepageModuleDelete", obj);
// 快保 首页管理-轮播
export const AutoguardHomepageModuleBanner = obj =>
    get("AutoguardHomepageModuleBanner", obj);
//快保首页上架

export const sendAutoguardHome = p => post("sendAutoguardHome", p);

//保存快保首页添加编辑
export const saveAutoguardHome = p => post("saveAutoguardHome", p);
//app首页配置
export const saveAPPConfig = p => post("saveAPPConfig", p);
//推荐产品
//列表
export const getRecommendProductsList = obj =>
    get("getRecommendProductsList", obj);
//添加编辑
export const saveRecommendProducts = p => post("saveRecommendProducts", p);
//删除
export const delRecommendProducts = p => post("delRecommendProducts", p);
//获取详情
export const getRecommendProductsDetail = obj =>
    get("getRecommendProductsDetail", obj);
//特色添加编辑
export const saveRecommendProductsDetail = p =>
    post("saveRecommendProductsDetail", p);
//产品特色删除
export const delRecommendProductsDetail = p =>
    post("delRecommendProductsDetail", p);
//===============================================
