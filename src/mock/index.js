import Mock from "mockjs";
import qs from "qs";
// import md5 from 'js-md5'
const url = "http://localhost:8080";
import util from "@/assets/js/util";

import userData from "./user";

import upstreamFolding from "./UpstreamPolicy/UpstreamFolding";
import continuationRateBouns from "./UpstreamPolicy/ContinuationRateBouns";
import NewIncentivesSearch from "./UpstreamPolicy/NewIncentivesSearch";
import lipeigongsi from "./lipeigongsi";
import lipeilistdata from "./lipeilistdata";
import ketang from "./ketang.js";
import jigouclass from "./jigouclass";
import desk_list from "./desk_list/index";
import gongyingshang from "./gongyingshang";
import xianzhong from "./xianzhong";
import jigou from "./jigou";
import jigoutype from "./jigoutype";
import baodanstatus from "./baodanstatus";
import {
    AgencyPremiumExportData,
    AgencyPremiumSearchData
} from "./StatisticalManagement/AgencyPremium";

import DownstreamFolding from "./DownstreamPolicy/DownstreamFolding";
import lipei from "./lipei";

import InstitutionalExpensesSearch from "./DownstreamPolicy/InstitutionalExpensesSearch";
import InstitutionalExpensesAdd from "./DownstreamPolicy/InstitutionalExpensesAdd";
import toutiao from "./toutiao";
import {
    SupplierPremiumExportData,
    SupplierPremiumSearchData
} from "./StatisticalManagement/SupplierPremium";
import WorkerManagementSearch from "./WorkerManagement/WorkerManagementSearch";
import MarketingStaffRank from "./WorkerManagement/MarketingStaffRank";
import InsuranceMarketer from "./WorkerManagement/InsuranceMarketer";
import baoxiangongsi from "./baoxiangongsidata";

import BasicLawAdministration from "./BasicLawAdministration/BasicLawAdministration";
import SalarySettlementSearch from "./BasicLawAdministration/SalarySettlementSearch";
import SalarySettlement from "./BasicLawAdministration/SalarySettlement";
import AttendanceManagementSearch from "./BasicLawAdministration/AttendanceManagementSearch";
import DeductionSearch from "./BasicLawAdministration/DeductionSearch";
import jigougunalidata from "./jigougunalidata";

import CompanyRetentionRateSearch from "./ContinuationRateReport/CompanyRetentionRateSearch";

import TargetConfigurationSearch from "./StatisticalManagement/TargetConfigurationSearch";
import {
    ManpowerReportSearch,
    ManpowerReportExportData
} from "./StatisticalManagement/ManpowerReportSearch";

import accountdata from "./Accountdetails";
import Strategygroup from "./Strategygroup";
import PermissionUrl from "./PermissionUrl";

import SupplierList from "./SupplierManagement/SupplierList";
import ProductList from "./SupplierManagement/productList";

import MyMessage from "./MyMessage";
import ExhibitionTools from "./ExhibitionTools";
import APPHomepageModule from "./APPHomepageModule";
import HomeData from "./home";
import lipeigongsibind from "./lipeigongsibind";

//获取所有的机构
import mechanism from "./mechanism";
//获取所有的机构账号
import MechanismAccount from "./MechanismAccount";
//员工账号
import StaffAccount from "./StaffAccount";
//理赔知识
import lipeidata from "./lipeidata";
//连续理赔
import lianxulipei from "./lianxulipei";

let returnArray = {
    StatusCode: 500,
    Msg: "服务器错误",
    Data: []
};
//-----------------首页-------------------------
Mock.mock(RegExp(url + "/home"), "get", () => {
    returnArray = {
        StatusCode: 200,
        Msg: "数据请求成功",
        Data: HomeData
    };
    return returnArray;
});
//---------------供应商管理--------------------------
//------供应商列表
Mock.mock(RegExp(url + "/SupplierService/GetAll"), "get", p => {
    let param = util.getQueryValue(p.url);
    let { shortName, cooperationType, cooperationStatus } = param;
    return {
        success: true,
        result: {
            totalCount: SupplierList.supplierList.length,
            items: SupplierList.supplierList.filter((t, index) => {
                return (
                    index >= param.SkipCount &&
                    index <
                        (param.SkipCount / param.MaxResultCount + 1) *
                            param.MaxResultCount &&
                    (shortName ? shortName === t.shortName : true) &&
                    (cooperationType !== ""
                        ? cooperationType === t.cooperationType
                        : true) &&
                    (cooperationStatus !== ""
                        ? cooperationStatus === t.cooperationStatus
                        : true)
                );
            })
        }
    };
});
Mock.mock(RegExp(url + "/SupplierService/GetById"), "get", p => {
    let { id } = util.getQueryValue(p.url);
    let res = SupplierList.supplierList.filter(t => t.id == id);
    return {
        success: true,
        result: res.length > 0 ? res[0] : {}
    };
});
Mock.mock(RegExp(url + "/supplier_list"), "get", () => {
    returnArray = {
        success: true,
        result: {
            totalCount: SupplierList.supplier_name.length,
            items: SupplierList.supplier_name
        }
    };
    return returnArray;
});
Mock.mock(RegExp(url + "/SupplierService/GetCooperationStatus"), "get", () => {
    return {
        success: true,
        result: SupplierList.state_cooperation.map((t, index) => {
            return {
                value: index,
                name: t
            };
        })
    };
});
Mock.mock(RegExp(url + "/SupplierService/GetCooperationType"), "get", () => {
    return {
        success: true,
        result: SupplierList.type_cooperation.map((t, index) => {
            return {
                value: index,
                name: t
            };
        })
    };
});
//新增供应商
Mock.mock(url + "/supplier_add", "post", param => {
    return qs.parse(param.body);
});
//-------------------------end------

//------产品搜索的选项
Mock.mock(/http:\/\/localhost:8080\/product_list/, "get", () => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: ProductList.productListSearch
    };
    return returnArray;
});
//产品查询
Mock.mock(url + "/product_list_search", "post", function(param) {
    param = qs.parse(param.body);
    let newParam = {};
    // window.console.log(param)
    for (let item in param) {
        if (param[item] !== "") {
            newParam[item] = param[item];
        }
    }
    // window.console.log(newParam);
    returnArray["Data"] = [];
    ProductList.productList.forEach(item => {
        let judge = true;
        for (let p in newParam) {
            if (item[p] !== newParam[p]) {
                judge = false;
                break;
            }
        }
        if (judge) {
            returnArray["StatusCode"] = 200;
            returnArray["Msg"] = "查询成功";
            returnArray["Data"].push(item);
        }
    });
    return returnArray;
});
Mock.mock(RegExp(url + "/product_list_pageInation/*"), "get", options => {
    let pageIndex = options.url.substring(
            options.url.indexOf("pageIndex=") + 10,
            options.url.indexOf(",")
        ),
        pageSize = options.url.substring(options.url.indexOf("pageSize=") + 9);
    window.console.log("当前页" + pageIndex + ",每页有" + pageSize + "条数据");
    return pageInation(pageIndex, pageSize, ProductList.productList);
});
Mock.mock(url + "/product_list_add", "post", param => {
    param = qs.parse(param.body);
    window.console.log(param);
});
//分页函数，pageIndex=1,pageSize=50
const pageInation = function(pageIndex, pageSize, data) {
    let startIndex = (pageIndex - 1) * pageSize,
        endIndex = pageIndex * pageSize - 1;
    // returnArray['Data'] = [];
    if (data.length < endIndex) {
        endIndex = data.length - 1;
    }
    returnArray["Data"] = {
        totalNum: data.length,
        pipeiData: []
    };
    for (let i = startIndex; i <= endIndex; i++) {
        returnArray["StatusCode"] = 200;
        returnArray["Msg"] = "query success";
        returnArray["Data"].pipeiData.push(data[i]);
    }

    return returnArray;
};

//---------------------上游折标-----------
//-----上游折标search参数
Mock.mock(RegExp(url + "/upstream_folding"), "get", function(p) {
    let param = util.getQueryValue(p.url);
    return {
        success: true,
        result: {
            totalCount: upstreamFolding.upstreamFolding.length,
            items: upstreamFolding.upstreamFolding.filter((t, index) => {
                return (
                    index >= param.SkipCount &&
                    index <
                        (param.SkipCount / param.MaxResultCount + 1) *
                            param.MaxResultCount
                );
            })
        }
    };
});
//----上游折标分页查询
Mock.mock(RegExp(url + "/upstream_folding_pageInation/*"), "get", p => {
    let param = util.getQueryValue(p.url);
    return {
        success: true,
        result: {
            totalCount: upstreamFolding.upstreamFolding.length,
            items: upstreamFolding.upstreamFolding.filter((t, index) => {
                return (
                    index >= param.SkipCount &&
                    index <
                        (param.SkipCount / param.MaxResultCount + 1) *
                            param.MaxResultCount
                );
            })
        }
    };
});
//----上游折标产品列表
Mock.mock(RegExp(url + "/upstream_productList/*"), "get", p => {
    let param = util.getQueryValue(p.url);
    return {
        success: true,
        result: {
            totalCount:
                upstreamFolding.upstream_floding_search.product_name.length,
            items: upstreamFolding.upstream_floding_search.product_name.filter(
                (t, index) => {
                    return (
                        index >= param.SkipCount &&
                        index <
                            (param.SkipCount / param.MaxResultCount + 1) *
                                param.MaxResultCount
                    );
                }
            )
        }
    };
});
//----上游折标查询
Mock.mock(url + "/upstream_folding_search", "post", param => {
    param = qs.parse(param.body);
    let newParam = {};
    for (let item in param) {
        if (param[item] !== "") {
            newParam[item] = param[item];
        }
    }
    // window.console.log(newParam);
    returnArray["Data"] = [];
    upstreamFolding.upstreamFolding.forEach(item => {
        let judge = true;
        for (let p in newParam) {
            if (item[p] !== newParam[p]) {
                judge = false;
                break;
            }
        }
        if (judge) {
            returnArray["StatusCode"] = 200;
            returnArray["Msg"] = "查询成功";
            returnArray["Data"].push(item);
        }
    });
    return returnArray;
});
//---上游折标保存
Mock.mock(url + "/upstream_folding_add", "post", param => {
    param = qs.parse(param.body);
    window.console.log(param);
    return param;
});
//---继续率奖金参数
Mock.mock(url + "/continuation_rate_bouns_param", "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: continuationRateBouns.ContinuationRateBounsSearch
    };
    return returnArray;
});
//---继续率奖金查询
Mock.mock(url + "/continuation_rate_bouns_search", "post", param => {
    param = qs.parse(param.body);
    let newParam = {};
    for (let item in param) {
        if (param[item] !== "") {
            newParam[item] = param[item];
        }
    }
    // window.console.log(newParam);
    returnArray["Data"] = [];
    continuationRateBouns.tableData.forEach(item => {
        let judge = true;
        for (let p in newParam) {
            if (item[p] !== newParam[p]) {
                judge = false;
                break;
            }
        }
        if (judge) {
            returnArray["StatusCode"] = 200;
            returnArray["Msg"] = "查询成功";
            returnArray["Data"].push(item);
        }
    });
    return returnArray;
});
//---继续率奖金分页
Mock.mock(
    RegExp(url + "/continuation_rate_bouns_pageInation/*"),
    "get",
    options => {
        let pageIndex = options.url.substring(
                options.url.indexOf("pageIndex=") + 10,
                options.url.indexOf(",")
            ),
            pageSize = options.url.substring(
                options.url.indexOf("pageSize=") + 9
            );
        window.console.log(
            "当前页" + pageIndex + ",每页有" + pageSize + "条数据"
        );
        return pageInation(
            pageIndex,
            pageSize,
            continuationRateBouns.tableData
        );
    }
);
//---继续率奖金保存
Mock.mock(url + "/continuation_rate_bouns_add", "post", param => {
    param = qs.parse(param.body);
    window.console.log("您的数据已保存", param);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: param
    };
    return returnArray;
});
//---新增奖励
Mock.mock(url + "/new_incentives_param", "get", () => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: NewIncentivesSearch.newIncentivesSearch
    };
    return returnArray;
});
//---新增奖励搜索
Mock.mock(url + "/new_incentives_search", "post", param => {
    param = qs.parse(param.body);
    let newParam = {};
    for (let item in param) {
        if (param[item] !== "") {
            newParam[item] = param[item];
        }
    }
    // window.console.log(newParam);
    returnArray["Data"] = [];
    NewIncentivesSearch.newIncentives.forEach(item => {
        // window.console.log(item)
        let judge = true;
        for (let p in newParam) {
            if (item[p] !== newParam[p]) {
                judge = false;
                break;
            }
        }
        if (judge) {
            // window.console.log(item)
            returnArray["StatusCode"] = 200;
            returnArray["Msg"] = "查询成功";
            returnArray["Data"].push(item);
        }
    });
    // window.console.log(returnArray)
    return returnArray;
});
//---新增奖励分页
Mock.mock(RegExp(url + "/new_incentives_pageInation/*"), "get", options => {
    let pageIndex = options.url.substring(
            options.url.indexOf("pageIndex=") + 10,
            options.url.indexOf(",")
        ),
        pageSize = options.url.substring(options.url.indexOf("pageSize=") + 9);
    window.console.log("当前页" + pageIndex + ",每页有" + pageSize + "条数据");
    return pageInation(pageIndex, pageSize, NewIncentivesSearch.newIncentives);
});
//---新增奖励add
Mock.mock(url + "/new_incentives_add", "post", param => {
    param = qs.parse(param.body);
    window.console.log("您的数据已保存", param);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: param
    };
    return returnArray;
});
//---续期服务津贴参数
Mock.mock(url + "/renewal_service_param", "get", () => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: upstreamFolding.upstream_floding_search
    };
    return returnArray;
});
Mock.mock(url + "/renewal_service_search", "post", param => {
    param = qs.parse(param.body);
    // window.console.log(param);
    let newParam = {};
    for (let item in param) {
        if (param[item] !== "") {
            newParam[item] = param[item];
        }
    }
    returnArray["Data"] = [];
    upstreamFolding.upstreamFolding.forEach(item => {
        let judge = true;
        for (let p in newParam) {
            if (item[p] !== newParam[p]) {
                judge = false;
                break;
            }
        }
        if (judge) {
            returnArray["StatusCode"] = 200;
            returnArray["Msg"] = "查询成功";
            returnArray["Data"].push(item);
        }
    });
    return returnArray;
});
Mock.mock(RegExp(url + "/renewal_service_pageInation/*"), "get", options => {
    let pageIndex = options.url.substring(
            options.url.indexOf("pageIndex=") + 10,
            options.url.indexOf(",")
        ),
        pageSize = options.url.substring(options.url.indexOf("pageSize=") + 9);
    window.console.log("当前页" + pageIndex + ",每页有" + pageSize + "条数据");
    return pageInation(pageIndex, pageSize, NewIncentivesSearch.newIncentives);
});
Mock.mock(url + "/renewal_service_add", "post", param => {
    param = qs.parse(param.body);
    window.console.log("您的数据已保存", param);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: param
    };
    return returnArray;
});
//---季度推动奖
Mock.mock(url + "/quarterly_promotion_award_param", "get", () => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: upstreamFolding.upstream_floding_search
    };
    return returnArray;
});
Mock.mock(url + "/quarterly_promotion_award_search", "post", param => {
    param = qs.parse(param.body);
    // window.console.log(param);
    let newParam = {};
    for (let item in param) {
        if (param[item] !== "") {
            newParam[item] = param[item];
        }
    }
    returnArray["Data"] = [];
    upstreamFolding.upstreamFolding.forEach(item => {
        let judge = true;
        for (let p in newParam) {
            if (item[p] !== newParam[p]) {
                judge = false;
                break;
            }
        }
        if (judge) {
            returnArray["StatusCode"] = 200;
            returnArray["Msg"] = "查询成功";
            returnArray["Data"].push(item);
        }
    });
    return returnArray;
});
Mock.mock(
    RegExp(url + "/quarterly_promotion_award_pagrInation/*"),
    "get",
    options => {
        let pageIndex = options.url.substring(
                options.url.indexOf("pageIndex=") + 10,
                options.url.indexOf(",")
            ),
            pageSize = options.url.substring(
                options.url.indexOf("pageSize=") + 9
            );
        window.console.log(
            "当前页" + pageIndex + ",每页有" + pageSize + "条数据"
        );
        return pageInation(
            pageIndex,
            pageSize,
            NewIncentivesSearch.newIncentives
        );
    }
);
//------------------------下游政策-------------------
Mock.mock(url + "/downstream_folding_param", "get", () => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: DownstreamFolding.downstreamFoldingSearch
    };
    return returnArray;
});
Mock.mock(url + "/downstream_folding_search", "post", param => {
    param = qs.parse(param.body);
    // window.console.log(param);
    let newParam = {};
    for (let item in param) {
        if (param[item] !== "") {
            newParam[item] = param[item];
        }
    }
    returnArray["Data"] = [];
    DownstreamFolding.downstreamFolding.forEach(item => {
        let judge = true;
        for (let p in newParam) {
            if (item[p] !== newParam[p]) {
                judge = false;
                break;
            }
        }
        if (judge) {
            returnArray["StatusCode"] = 200;
            returnArray["Msg"] = "查询成功";
            returnArray["Data"].push(item);
        }
    });
    return returnArray;
});
Mock.mock(RegExp(url + "/downstream_folding_pageInation/*"), "get", options => {
    let pageIndex = options.url.substring(
            options.url.indexOf("pageIndex=") + 10,
            options.url.indexOf(",")
        ),
        pageSize = options.url.substring(options.url.indexOf("pageSize=") + 9);
    window.console.log("当前页" + pageIndex + ",每页有" + pageSize + "条数据");
    return pageInation(
        pageIndex,
        pageSize,
        DownstreamFolding.downstreamFolding
    );
});
//---机构费用
Mock.mock(url + "/institutional_expenses_param", "get", () => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: DownstreamFolding.downstreamFoldingSearch
    };
    return returnArray;
});
Mock.mock(url + "/institutional_expenses_search", "post", param => {
    param = qs.parse(param.body);
    // window.console.log(param);
    let newParam = {};
    for (let item in param) {
        if (param[item] !== "") {
            newParam[item] = param[item];
        }
    }
    returnArray["Data"] = [];
    DownstreamFolding.downstreamFolding.forEach(item => {
        let judge = true;
        for (let p in newParam) {
            if (item[p] !== newParam[p]) {
                judge = false;
                break;
            }
        }
        if (judge) {
            returnArray["StatusCode"] = 200;
            returnArray["Msg"] = "查询成功";
            returnArray["Data"].push(item);
        }
    });
    return returnArray;
});
Mock.mock(
    RegExp(url + "/institutional_expenses_pageIntaion/*"),
    "get",
    options => {
        let pageIndex = options.url.substring(
                options.url.indexOf("pageIndex=") + 10,
                options.url.indexOf(",")
            ),
            pageSize = options.url.substring(
                options.url.indexOf("pageSize=") + 9
            );
        window.console.log(
            "当前页" + pageIndex + ",每页有" + pageSize + "条数据"
        );
        return pageInation(
            pageIndex,
            pageSize,
            DownstreamFolding.downstreamFolding
        );
    }
);
Mock.mock(url + "/institutional_expenses_save", "post", param => {
    param = qs.parse(param.body);
    window.console.log("您的数据已保存", param);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: param
    };
    return returnArray;
});
//---查询机构
Mock.mock(url + "/institutions_query", "post", param => {
    param = qs.parse(param.body);
    // window.console.log(param);
    let newParam = {};
    for (let item in param) {
        if (param[item] !== "") {
            newParam[item] = param[item];
        }
    }
    returnArray["Data"] = [];
    DownstreamFolding.institutions.forEach(item => {
        let judge = true;
        for (let p in newParam) {
            if (item[p] !== newParam[p]) {
                judge = false;
                break;
            }
        }
        if (judge) {
            returnArray["StatusCode"] = 200;
            returnArray["Msg"] = "查询成功";
            returnArray["Data"].push(item);
        }
    });
    return returnArray;
    // window.console.log()
});
Mock.mock(url + "/institutions_delete", "post", param => {
    param = qs.parse(param.body);
    let newParam = {};
    for (let item in param) {
        if (param[item] !== "") {
            newParam[item] = param[item];
        }
    }
    returnArray = {
        StatusCode: 200,
        Msg: "delete success",
        Data: newParam
    };
    window.console.log("正在删除：", newParam);
    return returnArray;
    // window.console.log(param);
});
//--销售费用
Mock.mock(url + "/sales_expenses_param", "get", () => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: DownstreamFolding.downstreamFoldingSearch
    };
    return returnArray;
});
Mock.mock(url + "/sales_expenses_search", "post", param => {
    param = qs.parse(param.body);
    // window.console.log(param);
    let newParam = {};
    for (let item in param) {
        if (param[item] !== "") {
            newParam[item] = param[item];
        }
    }
    returnArray["Data"] = [];
    DownstreamFolding.downstreamFolding.forEach(item => {
        let judge = true;
        for (let p in newParam) {
            if (item[p] !== newParam[p]) {
                judge = false;
                break;
            }
        }
        if (judge) {
            returnArray["StatusCode"] = 200;
            returnArray["Msg"] = "查询成功";
            returnArray["Data"].push(item);
        }
    });
    return returnArray;
});

Mock.mock(RegExp(url + "/manpower_report_search"), "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: ManpowerReportSearch
    };
    return returnArray;
});

//目标配置
//列表
Mock.mock(RegExp(url + "/target_configuration_search"), "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: TargetConfigurationSearch
    };
    return returnArray;
});
//保存
Mock.mock(RegExp(url + "/target_configuration_save"), "post", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: null
    };
    return returnArray;
});

Mock.mock(url + "/company_retention_rate_search", "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: CompanyRetentionRateSearch
    };
    return returnArray;
});

Mock.mock(url + "/deduction_search", "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: DeductionSearch
    };
    return returnArray;
});

Mock.mock(url + "/attendance_management_search", "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: AttendanceManagementSearch
    };
    return returnArray;
});

Mock.mock(url + "/salary_settlement", "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: SalarySettlement
    };
    return returnArray;
});

Mock.mock(url + "/salary_settlement_search", "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: SalarySettlementSearch
    };
    return returnArray;
});

Mock.mock(url + "/basicLaw_administration", "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: BasicLawAdministration
    };
    return returnArray;
});

Mock.mock(url + "/insurance_marketer", "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: InsuranceMarketer
    };
    return returnArray;
});

Mock.mock(url + "/marketing_staff_rank", "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: MarketingStaffRank
    };
    return returnArray;
});

Mock.mock(url + "/worker_management_search", "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: WorkerManagementSearch
    };
    return returnArray;
});

Mock.mock(url + "/institutional_expensesAdd", "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: InstitutionalExpensesAdd
    };
    return returnArray;
});

Mock.mock(url + "/institutional_expenses_search", "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: InstitutionalExpensesSearch
    };
    return returnArray;
});

Mock.mock(url + "/new_incentives_search", "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: NewIncentivesSearch
    };
    return returnArray;
});

// Mock.mock(url + '/userInfo', 'post' , (param) => {
//     window.console.log('进入了userInfojs')
//     window.console.log(param);
// });

// Mock.mock(url + '/Login', 'post', (param) => {
//     param = qs.parse(param.body);
//     window.console.log('login success')
//     userData.forEach((item)=>{
//         if (param.id){
//             if (param.id === item.id){
//                 returnArray = {
//                     "StatusCode": 200,
//                     "Msg": "query success",
//                     "Data": [{
//                         id: item.id,
//                         name: item.name
//                     }]
//                 }
//                 returnArray["Data"] = generateToken(returnArray['Data']);
//             }
//         } else {
//             returnArray["StatusCode"] = 400
//             returnArray["Msg"] = "该用户不存在"
//         }
//     });
//     return returnArray;
// })
//密码重置
Mock.mock(url + "/passwordReset", "post", function(param) {
    // userData.forEach((item, index, userData)=>{
    param = qs.parse(param.body);
    userData.forEach(item => {
        if (param.id) {
            if (param.id === item.id) {
                returnArray = {
                    StatusCode: 200,
                    Msg: "query success",
                    Data: [
                        {
                            id: item.id,
                            name: item.name
                        }
                    ]
                };
            }
        } else {
            returnArray["StatusCode"] = 400;
            returnArray["Msg"] = "该用户不存在";
        }
    });
    return returnArray;
});
Mock.mock(RegExp(url + "/getaccountdetailss"), "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: accountdata[0]
    };
    return returnArray;
});
import {
    comTypeList,
    BusinessScopeList
} from "./AccountIDManagement/AccountDetails";
Mock.mock(RegExp(url + "/getComTypeList"), "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: comTypeList
    };
    return returnArray;
});
Mock.mock(RegExp(url + "/getBusinessScopeList"), "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: BusinessScopeList
    };
    return returnArray;
});
//账号详情
Mock.mock(RegExp(url + "/accountdetailss"), "post", function(param) {
    // userData.forEach((item, index, userData)=>{
    param = qs.parse(param.body);
    window.console.debug(param);
    window.console.debug(accountdata);
    let returnArray = {};
    accountdata.forEach(item => {
        if (param.id) {
            if (parseInt(param.id) === parseInt(item.id)) {
                returnArray = {
                    StatusCode: 200,
                    Msg: "query success",
                    Data: [
                        {
                            id: item.id,
                            name: item.name
                        }
                    ]
                };
            } else {
                returnArray["StatusCode"] = 400;
                returnArray["Msg"] = "账户不存在2";
            }
        } else {
            returnArray["StatusCode"] = 400;
            returnArray["Msg"] = "账户不存在";
        }
    });
    return returnArray;
});
//读取策略组
Mock.mock(url + "/ReadPolicyGroup", "post", function(param) {
    window.console.log(
        `当前页数${param.PageIndex},显示数据条数${param.PageSize}`
    );
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: { TotalPage: 20, Rows: Strategygroup, Records: 100 }
    };

    return returnArray;
});
//读取权限列表
Mock.mock(url + "/GetAllRuel", "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: PermissionUrl
    };
    return returnArray;
});
//添加策略组
Mock.mock(url + "/AddPolicyGroup", "post", function(param) {
    param = qs.parse(param.body);
    var length = Math.ceil(Math.random() * 1000);
    window.console.log(param);
    param["id"] = length + 1;
    Strategygroup.push(param);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: Strategygroup
    };
    return returnArray;
});
//编辑策略组 视图 获取单条数据
Mock.mock(url + "/OnePolicyGroup", "post", function(par) {
    par = qs.parse(par.body);
    window.console.log(par);
    Strategygroup.forEach((item, index) => {
        window.console.log(item.id, par.id);
        if (parseInt(item.id) === parseInt(par.id)) {
            returnArray = {
                StatusCode: 200,
                Msg: "query success",
                Data: Strategygroup[index]
            };
        } else {
            returnArray = {
                StatusCode: 200,
                Msg: "暂无数据",
                Data: []
            };
        }
    });
    return returnArray;
});
//修改策略组
Mock.mock(url + "/UpdsPolicyGroup", "post", function(par) {
    par = qs.parse(par.body);
    Strategygroup.forEach((item, index) => {
        if (parseInt(item.id) === parseInt(par.id)) {
            //删除数组
            Strategygroup[index] = par.body;
            returnArray = {
                StatusCode: 200,
                Msg: "query success",
                Data: Strategygroup
            };
        } else {
            returnArray = {
                StatusCode: 200,
                Msg: "暂无数据",
                Data: Strategygroup
            };
        }
    });
    return returnArray;
});
//删除策略组
Mock.mock(url + "/DelPolicyGroup", "post", function(par) {
    par = qs.parse(par.body);
    window.console.log(par);
    Strategygroup.forEach((item, index) => {
        if (parseInt(item.id) === parseInt(par.id)) {
            //删除数组
            Strategygroup.splice(index, 1);
            returnArray = {
                StatusCode: 200,
                Msg: "query success",
                Data: Strategygroup
            };
        } else {
            returnArray = {
                StatusCode: 200,
                Msg: "暂无数据",
                Data: Strategygroup
            };
        }
    });
    return returnArray;
});

Mock.mock(url + "/GetAllmechanism", "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: mechanism
    };
    return returnArray;
});

Mock.mock(url + "/GetAllmechanismAccount", "post", function(param) {
    param = qs.parse(param.body);
    window.console.log(
        `当前页数${param.PageIndex},显示数据条数${param.PageSize}`
    );
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: { TotalPage: 20, Rows: MechanismAccount, Records: 100 }
    };
    return returnArray;
});
//添加机构账号
Mock.mock(url + "/AddMechanismAccount", "post", function(param) {
    window.console.log(param);
    param = qs.parse(param.body);
    var length = Math.ceil(Math.random() * 1000);
    param["id"] = length + 1;
    window.console.log(MechanismAccount);

    MechanismAccount.push(param);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: MechanismAccount
    };
    return returnArray;
});
//修改机构账号
Mock.mock(url + "/UpdMechanismAccount", "post", function(par) {
    par = qs.parse(par.body);
    window.console.log(par.id);
    MechanismAccount.forEach((item, index) => {
        window.console.log(item.id);

        if (parseInt(item.id) === parseInt(par.id)) {
            //修改数组
            MechanismAccount[index] = par;
            returnArray = {
                StatusCode: 200,
                Msg: "query success",
                Data: MechanismAccount
            };
        } else {
            returnArray = {
                StatusCode: 200,
                Msg: "暂无数据",
                Data: MechanismAccount
            };
        }
    });
    return returnArray;
});
//删除机构账号
Mock.mock(url + "/DelMechanismAccount", "post", function(par) {
    par = qs.parse(par.body);
    window.console.log(par);
    MechanismAccount.forEach((item, index) => {
        if (parseInt(item.id) === parseInt(par.id)) {
            //删除数组
            MechanismAccount.splice(index, 1);
            returnArray = {
                StatusCode: 200,
                Msg: "query success",
                Data: MechanismAccount
            };
        } else {
            returnArray = {
                StatusCode: 200,
                Msg: "暂无数据",
                Data: MechanismAccount
            };
        }
    });
    return returnArray;
});

Mock.mock(url + "/GetAllStaff", "post", function(param) {
    param = qs.parse(param.body);
    window.console.log(
        `当前页数${param.PageIndex},显示数据条数${param.PageSize}`
    );
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: { TotalPage: 20, Rows: StaffAccount, Records: 100 }
    };
    return returnArray;
});
//添加机构账号
Mock.mock(url + "/AddStaff", "post", function(param) {
    window.console.log(param);
    param = qs.parse(param.body);
    var length = Math.ceil(Math.random() * 1000);
    param["id"] = length + 1;
    window.console.log(StaffAccount);

    StaffAccount.push(param);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: StaffAccount
    };
    return returnArray;
});
//修改员工账号
Mock.mock(url + "/UpdStaff", "post", function(par) {
    par = qs.parse(par.body);
    window.console.log(par.id);
    StaffAccount.forEach((item, index) => {
        window.console.log(item.id);

        if (parseInt(item.id) === parseInt(par.id)) {
            //修改数组
            StaffAccount[index] = par;
            returnArray = {
                StatusCode: 200,
                Msg: "query success",
                Data: StaffAccount
            };
        } else {
            returnArray = {
                StatusCode: 200,
                Msg: "暂无数据",
                Data: StaffAccount
            };
        }
    });
    return returnArray;
});
//删除员工账号
Mock.mock(url + "/DelStaff", "post", function(par) {
    par = qs.parse(par.body);
    window.console.log(par);
    StaffAccount.forEach((item, index) => {
        if (parseInt(item.id) === parseInt(par.id)) {
            //删除数组
            StaffAccount.splice(index, 1);
            returnArray = {
                StatusCode: 200,
                Msg: "query success",
                Data: StaffAccount
            };
        } else {
            returnArray = {
                StatusCode: 200,
                Msg: "暂无数据",
                Data: StaffAccount
            };
        }
    });
    return returnArray;
});

//====================================================================================================

Mock.mock(RegExp(url + "/GetLpclass"), "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: lipei
    };
    return returnArray;
});
Mock.mock(url + "/GetLpdata", "post", function(param) {
    param = qs.parse(param.body);
    window.console.log(
        `当前页数${param.PageIndex},显示数据条数${param.PageSize}`
    );
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: { TotalPage: 20, Rows: lipei, Records: 100 }
    };
    return returnArray;
});
//添加理赔分类
Mock.mock(url + "/Addlipei", "post", function(param) {
    window.console.log(param);
    param = qs.parse(param.body);
    var length = Math.ceil(Math.random() * 1000);
    param["id"] = length + 1;
    window.console.log(lipei);

    lipei.push(param);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: lipei
    };
    return returnArray;
});
//修改理赔分类
Mock.mock(url + "/Updlipei", "post", function(par) {
    par = qs.parse(par.body);
    window.console.log(par);
    lipei.forEach((item, index) => {
        window.console.log(item.id);
        if (parseInt(item.id) === parseInt(par.id)) {
            //修改数组
            lipei[index] = par;
            returnArray = {
                StatusCode: 200,
                Msg: "query success",
                Data: lipei
            };
        } else {
            returnArray = {
                StatusCode: 200,
                Msg: "暂无数据",
                Data: lipei
            };
        }
    });
    return returnArray;
});
//删除理赔分类
Mock.mock(url + "/Dellipei", "post", function(par) {
    par = qs.parse(par.body);
    window.console.log(par);
    lipei.forEach((item, index) => {
        if (parseInt(item.id) === parseInt(par.id)) {
            //删除数组
            lipei.splice(index, 1);
            returnArray = {
                StatusCode: 200,
                Msg: "query success",
                Data: lipei
            };
        } else {
            returnArray = {
                StatusCode: 200,
                Msg: "暂无数据",
                Data: lipei
            };
        }
    });
    return returnArray;
});

Mock.mock(url + "/getlpdata", "post", function(param) {
    param = qs.parse(param.body);
    window.console.log(
        `当前页数${param.PageIndex},显示数据条数${param.PageSize}`
    );
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: { TotalPage: 20, Rows: lipeidata, Records: 100 }
    };
    return returnArray;
});
//添加理赔分类
Mock.mock(url + "/addlpdata", "post", function(param) {
    window.console.log(param);
    param = qs.parse(param.body);
    var length = Math.ceil(Math.random() * 1000);
    param["id"] = length + 1;
    window.console.log(lipeidata);

    lipeidata.push(param);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: lipeidata
    };
    return returnArray;
});
//修改理赔分类
Mock.mock(url + "/updlpdata", "post", function(par) {
    par = qs.parse(par.body);
    window.console.log(par);
    lipeidata.forEach((item, index) => {
        window.console.log(item.id);
        if (parseInt(item.id) === parseInt(par.id)) {
            //修改数组
            lipeidata[index] = par;
            returnArray = {
                StatusCode: 200,
                Msg: "query success",
                Data: lipeidata
            };
        } else {
            returnArray = {
                StatusCode: 200,
                Msg: "暂无数据",
                Data: lipeidata
            };
        }
    });
    return returnArray;
});
//删除理赔分类
Mock.mock(url + "/dellpdata", "post", function(par) {
    par = qs.parse(par.body);
    window.console.log(par);
    lipeidata.forEach((item, index) => {
        if (parseInt(item.id) === parseInt(par.id)) {
            //删除数组
            lipeidata.splice(index, 1);
            returnArray = {
                StatusCode: 200,
                Msg: "query success",
                Data: lipeidata
            };
        } else {
            returnArray = {
                StatusCode: 200,
                Msg: "暂无数据",
                Data: lipeidata
            };
        }
    });
    return returnArray;
});

Mock.mock(url + "/lxlipei", "post", function(param) {
    param = qs.parse(param.body);
    window.console.log(
        `当前页数${param.PageIndex},显示数据条数${param.PageSize}`
    );
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: { TotalPage: 20, Rows: lianxulipei, Records: 100 }
    };
    return returnArray;
});
//添加连续理赔
Mock.mock(url + "/addlxlipei", "post", function(param) {
    window.console.log(param);
    param = qs.parse(param.body);
    var length = Math.ceil(Math.random() * 1000);
    param["id"] = length + 1;
    window.console.log(lianxulipei);

    lianxulipei.push(param);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: lianxulipei
    };
    return returnArray;
});
//修改连续理赔
Mock.mock(url + "/updlxlipei", "post", function(par) {
    par = qs.parse(par.body);
    window.console.log(par);
    lianxulipei.forEach((item, index) => {
        window.console.log(item.id);
        if (parseInt(item.id) === parseInt(par.id)) {
            //修改数组
            lianxulipei[index] = par;
            returnArray = {
                StatusCode: 200,
                Msg: "query success",
                Data: lianxulipei
            };
        } else {
            returnArray = {
                StatusCode: 200,
                Msg: "暂无数据",
                Data: lianxulipei
            };
        }
    });
    return returnArray;
});
//删除连续理赔
Mock.mock(url + "/dellxlipei", "post", function(par) {
    par = qs.parse(par.body);
    window.console.log(par);
    lianxulipei.forEach((item, index) => {
        if (parseInt(item.id) === parseInt(par.id)) {
            //删除数组
            lianxulipei.splice(index, 1);
            returnArray = {
                StatusCode: 200,
                Msg: "query success",
                Data: lianxulipei
            };
        } else {
            returnArray = {
                StatusCode: 200,
                Msg: "暂无数据",
                Data: lianxulipei
            };
        }
    });
    return returnArray;
});
//理赔工具
//理赔公司

Mock.mock(url + "/lipeigongsi", "post", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: lipeigongsi
    };
    return returnArray;
});
//理赔公司绑定  param传的是公司列表的id 数组
Mock.mock(url + "/bindgongsi", "post", function(param) {
    window.console.log(param);
    param = qs.parse(param.body);
    var length = Math.ceil(Math.random() * 1000);
    param["id"] = length + 1;
    lipeigongsibind.push(param);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: lipeigongsibind
    };
    return returnArray;
});
//获取绑定的理赔公司列表
Mock.mock(RegExp(url + "/getlipeigongsidata"), "post", function(param) {
    param = qs.parse(param.body);
    window.console.log(
        `当前页数${param.PageIndex},显示数据条数${param.PageSize}`
    );
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: { TotalPage: 20, Rows: lipeigongsibind, Records: 100 }
    };
    return returnArray;
});

//理赔列表

Mock.mock(url + "/lipeilist", "post", function(param) {
    param = qs.parse(param.body);
    window.console.log(
        `当前页数${param.PageIndex},显示数据条数${param.PageSize}`
    );
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: { TotalPage: 20, Rows: lipeilistdata, Records: 100 }
    };
    return returnArray;
});
//添加理赔
Mock.mock(url + "/addlipeidata", "post", function(param) {
    window.console.log(param);
    param = qs.parse(param.body);
    var length = Math.ceil(Math.random() * 1000);
    param["id"] = length + 1;
    window.console.log(lipeilistdata);

    lipeilistdata.push(param);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: lipeilistdata
    };
    return returnArray;
});
//修改理赔
Mock.mock(url + "/updlipeidata", "post", function(par) {
    par = qs.parse(par.body);
    window.console.log(par);
    lipeilistdata.forEach((item, index) => {
        window.console.log(item.id);
        if (parseInt(item.id) === parseInt(par.id)) {
            //修改数组
            lipeilistdata[index] = par;
            returnArray = {
                StatusCode: 200,
                Msg: "query success",
                Data: lipeilistdata
            };
        } else {
            returnArray = {
                StatusCode: 200,
                Msg: "暂无数据",
                Data: lipeilistdata
            };
        }
    });
    return returnArray;
});
//删除理赔
Mock.mock(url + "/dellipeidata", "post", function(par) {
    par = qs.parse(par.body);
    window.console.log(par);
    lipeilistdata.forEach((item, index) => {
        if (parseInt(item.id) === parseInt(par.id)) {
            //删除数组
            lipeilistdata.splice(index, 1);
            returnArray = {
                StatusCode: 200,
                Msg: "query success",
                Data: lipeilistdata
            };
        } else {
            returnArray = {
                StatusCode: 200,
                Msg: "暂无数据",
                Data: lipeilistdata
            };
        }
    });
    return returnArray;
});
//保险公司获取

Mock.mock(url + "/baoxiangongsi", "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: baoxiangongsi
    };
    return returnArray;
});

//课堂管理列表
Mock.mock(url + "/zhishilist", "post", function(param) {
    param = qs.parse(param.body);
    window.console.log(
        `当前页数${param.PageIndex},显示数据条数${param.PageSize}`
    );
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: { TotalPage: 20, Rows: ketang, Records: 100 }
    };
    return returnArray;
});
//添加课堂管理
Mock.mock(RegExp(url + "/addzhishi"), "post", function(param) {
    window.console.log(param);
    param = qs.parse(param.body);
    var length = Math.ceil(Math.random() * 1000);
    param["id"] = length + 1;
    window.console.log(ketang);

    ketang.push(param);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: ketang
    };
    return returnArray;
});
//修改课堂管理
Mock.mock(url + "/updzhishi", "post", function(par) {
    par = qs.parse(par.body);
    window.console.log(par);
    ketang.forEach((item, index) => {
        window.console.log(item.id);
        if (parseInt(item.id) === parseInt(par.id)) {
            //修改数组
            ketang[index] = par;
            returnArray = {
                StatusCode: 200,
                Msg: "query success",
                Data: ketang
            };
        } else {
            returnArray = {
                StatusCode: 200,
                Msg: "暂无数据",
                Data: ketang
            };
        }
    });
    return returnArray;
});
//删除课堂管理
Mock.mock(RegExp(url + "/delzhishi"), "post", function(par) {
    par = qs.parse(par.body);
    window.console.log(par);
    ketang.forEach((item, index) => {
        if (parseInt(item.id) === parseInt(par.id)) {
            //删除数组
            ketang.splice(index, 1);
            returnArray = {
                StatusCode: 200,
                Msg: "query success",
                Data: ketang
            };
        } else {
            returnArray = {
                StatusCode: 200,
                Msg: "success",
                Data: ketang
            };
        }
    });
    return returnArray;
});
//课堂发布
Mock.mock(RegExp(url + "/fabuzhishi"), "post", function(par) {
    par = qs.parse(par.body);
    window.console.log(par.id);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: ketang
    };
    return returnArray;
});
//课堂取消发布
Mock.mock(RegExp(url + "/qxfabuzhishi"), "post", function(par) {
    par = qs.parse(par.body);
    window.console.log(par.id);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: ketang
    };
    return returnArray;
});

// const generateToken = (userInfo)=>{
//     return md5(userInfo);
//     // window.console.log(userInfoMD5)
//     // return userInfoMD5
// }

//头条列表
Mock.mock(url + "/toutiaolist", "post", function(param) {
    param = qs.parse(param.body);
    window.console.log(
        `当前页数${param.PageIndex},显示数据条数${param.PageSize}`
    );
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: { TotalPage: 20, Rows: toutiao, Records: 100 }
    };
    return returnArray;
});
//添加头条
Mock.mock(RegExp(url + "/addtoutiao"), "post", function(param) {
    window.console.log(param);
    param = qs.parse(param.body);
    var length = Math.ceil(Math.random() * 1000);
    param["id"] = length + 1;
    window.console.log(toutiao);

    toutiao.push(param);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: toutiao
    };
    return returnArray;
});
//修改头条
Mock.mock(url + "/updtoutiao", "post", function(par) {
    par = qs.parse(par.body);
    window.console.log(par);
    toutiao.forEach((item, index) => {
        window.console.log(item.id);
        if (parseInt(item.id) === parseInt(par.id)) {
            //修改数组
            toutiao[index] = par;
            returnArray = {
                StatusCode: 200,
                Msg: "query success",
                Data: toutiao
            };
        } else {
            returnArray = {
                StatusCode: 200,
                Msg: "暂无数据",
                Data: toutiao
            };
        }
    });
    return returnArray;
});

//课堂发布
Mock.mock(RegExp(url + "/fabutoutiao"), "post", function(par) {
    par = qs.parse(par.body);
    returnArray = {
        StatusCode: 200,
        Msg: "success",
        Data: lipeidata
    };
    return returnArray;
});
//课堂取消发布
Mock.mock(url + "/quxiaotoutiao", "post", function(par) {
    par = qs.parse(par.body);
    window.console.log(par.id);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: lipeidata
    };
    return returnArray;
});
//机构管理-机构分类获取

import jigoujibie from "./jigoujibie";
Mock.mock(RegExp(url + "/jigoujibie"), "get", function(param) {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: jigoujibie
    };
    return returnArray;
});

Mock.mock(url + "/getjigouclass", "post", function(param) {
    returnArray = {
        success: true,
        result: {
            totalCount: jigouclass.length,
            items: jigouclass
        }
    };
    return returnArray;
});
//机构管理-机构分类添加
Mock.mock(url + "/setjigouclass", "post", function(param) {
    window.console.log(`数据${param}`);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: []
    };
    return returnArray;
});
//机构管理-机构列表

Mock.mock(url + "/getjigoulist", "post", function(param) {
    return {
        success: true,
        result: {
            totalCount: jigougunalidata.length,
            items: jigougunalidata
        }
    };
});
Mock.mock(url + "/addjigoulist", "post", function(param) {
    window.console.log(`数据${param}`);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: []
    };
    return returnArray;
});
Mock.mock(url + "/updjigoulist", "post", function(param) {
    window.console.log(`数据${param}`);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: []
    };
    return returnArray;
});
//员工管理--内勤管理
//列表

Mock.mock(url + "/yglist", "post", function(param) {
    param = qs.parse(param.body);
    window.console.log(
        `当前页数${param.PageIndex},显示数据条数${param.PageSize}`
    );
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: { TotalPage: 20, Rows: desk_list, Records: 100 }
    };
    return returnArray;
});
Mock.mock(url + "/addyg", "post", function(param) {
    param = qs.parse(param.body);
    window.console.log(
        `当前页数${param.PageIndex},显示数据条数${param.PageSize}`
    );
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: { TotalPage: 20, Rows: desk_list, Records: 100 }
    };
    return returnArray;
});
Mock.mock(url + "/updyg", "post", function(param) {
    param = qs.parse(param.body);
    window.console.log(
        `当前页数${param.PageIndex},显示数据条数${param.PageSize}`
    );
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: { TotalPage: 20, Rows: desk_list, Records: 100 }
    };
    return returnArray;
});
Mock.mock(url + "/delyg", "post", function(param) {
    param = qs.parse(param.body);
    window.console.log(
        `当前页数${param.PageIndex},显示数据条数${param.PageSize}`
    );
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: { TotalPage: 20, Rows: desk_list, Records: 100 }
    };
    return returnArray;
});

//
// 我的消息
//
Mock.mock(RegExp(url + "/MyMessage/*"), "get", function(par) {
    // par = qs.parse(par.body);
    console.log(par);
    if (MyMessage.length > 0) {
        returnArray = {
            StatusCode: 200,
            Msg: "query success",
            Data: MyMessage
        };
    } else {
        returnArray = {
            StatusCode: 200,
            Msg: "暂无数据",
            Data: MyMessage
        };
    }
    return returnArray;
});
// 我的消息-搜索
Mock.mock(url + "/MyMessageSearch", "post", function(par) {
    console.log(par);
    let formatPar = JSON.parse(par.body);
    let tmp = MyMessage.filter(item => {
        return item.date == formatPar.searchDate;
    });
    console.log(tmp);
    if (tmp.length > 0) {
        returnArray = {
            StatusCode: 200,
            Msg: "query success",
            Data: tmp
        };
    } else {
        returnArray = {
            StatusCode: 200,
            Msg: "暂无数据",
            Data: tmp
        };
    }
    return returnArray;
});
// 我的消息-添加
Mock.mock(url + "/addMyMessage", "post", function(par) {
    let formatPar = JSON.parse(par.body);
    console.log(formatPar);
    MyMessage.push(formatPar);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: MyMessage
    };
    return returnArray;
});
// 我的消息-添加
Mock.mock(url + "/sendMyMessage", "post", function(par) {
    let formatPar = JSON.parse(par.body);
    console.log(formatPar);
    MyMessage.push(formatPar);
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: MyMessage
    };
    return returnArray;
});
// 我的消息-删除
Mock.mock(url + "/addMyMessageDelete", "post", function(par) {
    let formatPar = JSON.parse(par.body);
    console.log(formatPar);
    return {
        StatusCode: 200,
        Msg: "删除成功",
        Data: MyMessage,
        your: formatPar
    };
});
// 展业工具
Mock.mock(RegExp(url + "/ExhibitionTools/*"), "get", function(par) {
    if (ExhibitionTools.length > 0) {
        returnArray = {
            StatusCode: 200,
            Msg: "query success",
            Data: ExhibitionTools
        };
    } else {
        returnArray = {
            StatusCode: 200,
            Msg: "暂无数据",
            Data: ExhibitionTools
        };
    }
    return returnArray;
});
// 展业工具-搜索
Mock.mock(RegExp(url + "/ExhibitionToolsSearch/*"), "post", function(par) {
    console.log(par);
    let formatPar = JSON.parse(par.body);
    let tmp = ExhibitionTools.filter(item => {
        return (
            item.supplier == formatPar.supplier && item.type == formatPar.type
        );
    });
    console.log(tmp);
    if (tmp.length > 0) {
        returnArray = {
            StatusCode: 200,
            Msg: "query success",
            Data: tmp
        };
    } else {
        returnArray = {
            StatusCode: 200,
            Msg: "暂无数据",
            Data: tmp
        };
    }
    return returnArray;
});
// 展业工具-删除
Mock.mock(url + "/ExhibitionToolsDelete", "post", function(par) {
    console.log(par);
    let formatPar = JSON.parse(par.body);
    if (ExhibitionTools.length > 0) {
        ExhibitionTools.map((item, index) => {
            if (item.id == formatPar.id) {
                ExhibitionTools.splice(index, 1);
            }
        });
        returnArray = {
            StatusCode: 200,
            Msg: "删除成功",
            Data: ExhibitionTools
        };
    } else {
        returnArray = {
            StatusCode: 200,
            Msg: "暂无数据",
            Data: ExhibitionTools
        };
    }
    return returnArray;
});
// // app首页管理
// // 热销产品
// Mock.mock(/\/api\/test\/APPHomepageModule\/*/, 'get' , function(par){
//     console.log(par)
//     let returnArray = {
//         "StatusCode": 200,
//         "Msg": "暂无数据",
//         "Data": APPHomepageModule.hot
//     }
//     return returnArray
// });
// app首页管理-删除
// 热销产品
Mock.mock(RegExp(url + "/APPHomepageModuleDelete/*"), "post", function(par) {
    console.log(par);
    let formatPar = JSON.parse(par.body);
    let tmpArr = APPHomepageModule.hot[formatPar.type];
    tmpArr.find((item, index) => {
        if (item.id == formatPar.id) {
            tmpArr.splice(index, 1);
            return true;
        }
    });
    return {
        StatusCode: 200,
        Msg: "删除成功",
        Data: APPHomepageModule.hot
    };
});
// app首页管理-轮播
// 轮播
Mock.mock(RegExp(url + "/APPHomepageModuleBanner/*"), "get", function(par) {
    console.log(par);
    return {
        StatusCode: 200,
        Msg: "成功",
        Data: APPHomepageModule.banner
    };
});
// app首页管理
// 热销产品
Mock.mock(/\/api\/test\/APPHomepageModule\/*/, "get", function(par) {
    console.log(par);
    let returnArray = {
        StatusCode: 200,
        Msg: "暂无数据",
        Data: APPHomepageModule.hot
    };
    return returnArray;
});

//获取险种   机构   供应商  机构类型 保单状态

Mock.mock(url + "/getallparameter", "get", function() {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: {
            gongyingshang: gongyingshang,
            xianzhong: xianzhong,
            jigou: jigou,
            jigoutype: jigoutype,
            baodanstatus
        }
    };
    return returnArray;
});
//====================================================================================================

//供应商保费

//查询
Mock.mock(RegExp(url + "/supplier_premium"), "get", options => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: SupplierPremiumSearchData
    };
    return returnArray;
});
//导出
Mock.mock(RegExp(url + "/exportSupplier_premium"), "post", options => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: SupplierPremiumExportData
    };
    return returnArray;
});

//机构保费
//查询
Mock.mock(RegExp(url + "/agency_premium"), "get", options => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: AgencyPremiumSearchData
    };
    return returnArray;
});
//导出
Mock.mock(RegExp(url + "/exportAgency_premium"), "post", options => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: AgencyPremiumExportData
    };
    return returnArray;
});
//人力报表
//导出
Mock.mock(RegExp(url + "/exportManpower_report"), "post", options => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: ManpowerReportExportData
    };
    return returnArray;
});

//产能报表
import {
    baodanxingzi,
    capacityList,
    capacityExport
} from "./StatisticalManagement/CapacityStatement";

//保单性质列表
Mock.mock(RegExp(url + "/capacity_type_list"), "get", options => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: baodanxingzi
    };
    return returnArray;
});
//查询
Mock.mock(RegExp(url + "/capacity_list"), "get", options => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: capacityList
    };
    return returnArray;
});
//导出
Mock.mock(RegExp(url + "/capacity_export"), "post", options => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: capacityExport
    };
    return returnArray;
});

//业务报表
import {
    businessList,
    businessExport
} from "./StatisticalManagement/BusinessStatement";

//查询
Mock.mock(RegExp(url + "/business_list"), "get", options => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: businessList
    };
    return returnArray;
});
//导出
Mock.mock(RegExp(url + "/business_export"), "post", options => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: businessExport
    };
    return returnArray;
});

//目标进度追踪
import {
    targetProgressList,
    targetProgressExport
} from "./StatisticalManagement/TargetProgressTracking";

//查询
Mock.mock(RegExp(url + "/targetProgress_list"), "get", options => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: targetProgressList
    };
    return returnArray;
});
//导出
Mock.mock(RegExp(url + "/targetProgress_export"), "post", options => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: targetProgressExport
    };
    return returnArray;
});

//产品结构报表
import {
    productStructureList,
    productStructureExport,
    productStructureExportDetail,
    productStructureDetailList
} from "./StatisticalManagement/ProductStructureReport";

//查询
Mock.mock(RegExp(url + "/productStructure_list"), "get", options => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: productStructureList
    };
    return returnArray;
});
//详情
Mock.mock(RegExp(url + "/productStructureDetail_list"), "get", options => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: productStructureDetailList
    };
    return returnArray;
});
//导出
Mock.mock(RegExp(url + "/productStructure_export"), "post", options => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: productStructureExport
    };
    return returnArray;
});
//导出详情
Mock.mock(RegExp(url + "/productStructureDetail_export"), "post", options => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: productStructureExportDetail
    };
    return returnArray;
});

//目标进度追踪
import {
    lifelinereportList,
    lifelinereportExport
} from "./StatisticalManagement/LifelineReport";

//查询
Mock.mock(RegExp(url + "/lifelinereport_list"), "get", options => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: lifelinereportList
    };
    return returnArray;
});
//导出
Mock.mock(RegExp(url + "/lifelinereport_export"), "post", options => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: lifelinereportExport
    };
    return returnArray;
});
//件数报表
import { numberReportList } from "./StatisticalManagement/NumberReport";
Mock.mock(RegExp(url + "/numberReport_list"), "get", p => {
    let param = util.getQueryValue(p.url);
    return {
        success: true,
        result: {
            totalCount: numberReportList.length,
            items: numberReportList.filter((t, index) => {
                return (
                    index >= param.SkipCount &&
                    index < +param.SkipCount + +param.MaxResultCount
                );
            })
        }
    };
});
//保费报表
import { premiumStatement } from "./StatisticalManagement/PremiumStatement";
Mock.mock(RegExp(url + "/premiumStatement_list"), "get", p => {
    let param = util.getQueryValue(p.url);
    return {
        success: true,
        result: {
            totalCount: premiumStatement.length,
            items: premiumStatement.filter((t, index) => {
                return (
                    index >= param.SkipCount &&
                    index < +param.SkipCount + +param.MaxResultCount
                );
            })
        }
    };
});
//直辖团队报表
//团队类型查询
import teamTypeList from "./teamTypeList";
Mock.mock(RegExp(url + "/teamTypeList"), "get", options => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: teamTypeList
    };
    return returnArray;
});
//查询
import { directTeamReport } from "./StatisticalManagement/DirectTeamReport";
Mock.mock(RegExp(url + "/directTeamReport_list"), "get", p => {
    let param = util.getQueryValue(p.url);
    return {
        success: true,
        result: {
            totalCount: directTeamReport.length,
            items: directTeamReport.filter((t, index) => {
                return (
                    index >= param.SkipCount &&
                    index < +param.SkipCount + +param.MaxResultCount
                );
            })
        }
    };
});
//增员人数报表
//查询
import { personalAdditionStatement } from "./StatisticalManagement/PersonalAdditionStatement";
Mock.mock(RegExp(url + "/personalAdditionStatement_list"), "get", p => {
    let param = util.getQueryValue(p.url);
    return {
        success: true,
        result: {
            totalCount: personalAdditionStatement.length,
            items: personalAdditionStatement.filter((t, index) => {
                return (
                    index >= param.SkipCount &&
                    index < +param.SkipCount + +param.MaxResultCount
                );
            })
        }
    };
});
//团队增员报表
//查询
import { teamGrowthReport } from "./StatisticalManagement/TeamGrowthReport";
Mock.mock(RegExp(url + "/teamGrowthReport_list"), "get", p => {
    let param = util.getQueryValue(p.url);
    return {
        success: true,
        result: {
            totalCount: teamGrowthReport.length,
            items: teamGrowthReport.filter((t, index) => {
                return (
                    index >= param.SkipCount &&
                    index < +param.SkipCount + +param.MaxResultCount
                );
            })
        }
    };
});

//课堂管理
//头条资讯
//作者列表
import { authorList } from "./author";
Mock.mock(RegExp(url + "/author_list"), "get", p => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: authorList
    };
    return returnArray;
});
//查询
import {
    headlineNewsList,
    headlineNewsDetail
} from "./ClassManagement/HeadlineNews";
Mock.mock(RegExp(url + "/headlineNews_list"), "get", p => {
    let param = util.getQueryValue(p.url);
    return {
        success: true,
        result: {
            totalCount: headlineNewsList.length,
            items: headlineNewsList.filter((t, index) => {
                return (
                    index >= param.SkipCount &&
                    index < +param.SkipCount + +param.MaxResultCount
                );
            })
        }
    };
});
//删除头条
Mock.mock(RegExp(url + "/deltoutiao"), "post", function(par) {
    par = par.body;
    let returnArray = {
        StatusCode: 200,
        Msg: "success"
    };
    return returnArray;
});
//图片上传
Mock.mock(RegExp(url + "/upload_img"), "post", function(par) {
    par = par.body;
    let returnArray = {
        StatusCode: 200,
        Msg: "success",
        Data: { url: "https://g.csdnimg.cn/static/user-medal/github.svg" }
    };
    return returnArray;
});
//根据id查询详情
Mock.mock(RegExp(url + "/headlineNews_detail"), "get", p => {
    let returnArray = {
        StatusCode: 200,
        Msg: "success",
        Data: headlineNewsDetail
    };
    return returnArray;
});
//我的学院
//查询
import { myCollegeList, myCollegeDetail } from "./ClassManagement/MyCollege";
Mock.mock(RegExp(url + "/myCollege_list"), "get", p => {
    let param = util.getQueryValue(p.url);
    return {
        success: true,
        result: {
            totalCount: myCollegeList.length,
            items: myCollegeList.filter((t, index) => {
                return (
                    index >= param.SkipCount &&
                    index < +param.SkipCount + +param.MaxResultCount
                );
            })
        }
    };
});
//根据id查询详情
Mock.mock(RegExp(url + "/myCollege_detail"), "get", p => {
    let returnArray = {
        StatusCode: 200,
        Msg: "success",
        Data: myCollegeDetail
    };
    return returnArray;
});
//添加分类
Mock.mock(RegExp(url + "/addCollegeType"), "post", p => {
    let returnArray = {
        StatusCode: 200,
        Msg: "success"
    };
    return returnArray;
});
//编辑分类
Mock.mock(RegExp(url + "/editCollegeType"), "post", p => {
    let returnArray = {
        StatusCode: 200,
        Msg: "success"
    };
    return returnArray;
});
//删除分类
Mock.mock(RegExp(url + "/delCollegeType"), "post", p => {
    let returnArray = {
        StatusCode: 200,
        Msg: "success"
    };
    return returnArray;
});
//理赔知识
import {
    ClaimsKnowledgeList,
    ClaimsKnowledgeDetail
} from "./ClaimsManagement/ClaimsKnowledge";
//查询
Mock.mock(RegExp(url + "/claimsKnowledge_list"), "get", p => {
    let param = util.getQueryValue(p.url);
    return {
        success: true,
        result: {
            totalCount: ClaimsKnowledgeList.length,
            items: ClaimsKnowledgeList.filter((t, index) => {
                return (
                    index >= param.SkipCount &&
                    index < +param.SkipCount + +param.MaxResultCount
                );
            })
        }
    };
});
//删除
Mock.mock(RegExp(url + "/delClaimsKnowledge"), "post", function(par) {
    par = par.body;
    let returnArray = {
        StatusCode: 200,
        Msg: "success"
    };
    return returnArray;
});
//发布
Mock.mock(RegExp(url + "/sendClaimsKnowledge"), "post", function(par) {
    par = par.body;
    let returnArray = {
        StatusCode: 200,
        Msg: "success"
    };
    return returnArray;
});
//添加
Mock.mock(RegExp(url + "/addClaimsKnowledge"), "post", function(par) {
    par = par.body;
    let returnArray = {
        StatusCode: 200,
        Msg: "success"
    };
    return returnArray;
});
//根据id查询详情
Mock.mock(RegExp(url + "/claimsKnowledge_detail"), "get", p => {
    let returnArray = {
        StatusCode: 200,
        Msg: "success",
        Data: ClaimsKnowledgeDetail
    };
    return returnArray;
});
//知识分类
//查询
Mock.mock(RegExp(url + "/ClassificationOfKnowledge_list"), "get", p => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: lipei
    };
    return returnArray;
});
//添加分类
Mock.mock(RegExp(url + "/addClassificationOfKnowledge"), "post", p => {
    let returnArray = {
        StatusCode: 200,
        Msg: "success"
    };
    return returnArray;
});
//编辑分类
Mock.mock(RegExp(url + "/editClassificationOfKnowledge"), "post", p => {
    let returnArray = {
        StatusCode: 200,
        Msg: "success"
    };
    return returnArray;
});
//删除分类
Mock.mock(RegExp(url + "/delClassificationOfKnowledge"), "post", p => {
    let returnArray = {
        StatusCode: 200,
        Msg: "success"
    };
    return returnArray;
});
//连续理赔
import {
    ContinuousClaimsList,
    ContinuousClaimsDetail
} from "./ClaimsManagement/ContinuousClaims";
//查询
Mock.mock(RegExp(url + "/ContinuousClaims_list"), "get", p => {
    let param = util.getQueryValue(p.url);
    return {
        success: true,
        result: {
            totalCount: ContinuousClaimsList.length,
            items: ContinuousClaimsList.filter((t, index) => {
                return (
                    index >= param.SkipCount &&
                    index < +param.SkipCount + +param.MaxResultCount
                );
            })
        }
    };
});
//删除
Mock.mock(RegExp(url + "/delContinuousClaims"), "post", function(par) {
    par = par.body;
    let returnArray = {
        StatusCode: 200,
        Msg: "success"
    };
    return returnArray;
});
//添加
Mock.mock(RegExp(url + "/addContinuousClaims"), "post", function(par) {
    par = par.body;
    let returnArray = {
        StatusCode: 200,
        Msg: "success"
    };
    return returnArray;
});
//根据id查询详情
Mock.mock(RegExp(url + "/ContinuousClaims_detail"), "get", p => {
    let returnArray = {
        StatusCode: 200,
        Msg: "success",
        Data: ContinuousClaimsDetail
    };
    return returnArray;
});
//理赔工具
import { ClaimsToolList, companyList } from "./ClaimsManagement/ClaimsTool";
//查询
Mock.mock(RegExp(url + "/ClaimsTool_list"), "get", p => {
    let param = util.getQueryValue(p.url);
    return {
        success: true,
        result: {
            totalCount: ClaimsToolList.length,
            items: ClaimsToolList.filter((t, index) => {
                return (
                    index >= param.SkipCount &&
                    index < +param.SkipCount + +param.MaxResultCount
                );
            })
        }
    };
});
//公司列表
Mock.mock(RegExp(url + "/company_list"), "get", p => {
    returnArray = {
        StatusCode: 200,
        Msg: "query success",
        Data: companyList
    };
    return returnArray;
});
//关联公司
Mock.mock(RegExp(url + "/guanlianCompany"), "post", function(par) {
    par = par.body;
    let returnArray = {
        StatusCode: 200,
        Msg: "success"
    };
    return returnArray;
});
//理赔列表
import { ClaimsList } from "./ClaimsManagement/ClaimsList";
//查询
Mock.mock(RegExp(url + "/Claims_list"), "get", p => {
    let param = util.getQueryValue(p.url);
    return {
        success: true,
        result: {
            totalCount: ClaimsList.length,
            items: ClaimsList.filter((t, index) => {
                return (
                    index >= param.SkipCount &&
                    index < +param.SkipCount + +param.MaxResultCount
                );
            })
        }
    };
});
//删除
Mock.mock(RegExp(url + "/delClaims"), "post", function(par) {
    par = par.body;
    let returnArray = {
        StatusCode: 200,
        Msg: "success"
    };
    return returnArray;
});
//添加
Mock.mock(RegExp(url + "/addClaims"), "post", function(par) {
    par = par.body;
    let returnArray = {
        StatusCode: 200,
        Msg: "success"
    };
    return returnArray;
});
//根据id查询详情
Mock.mock(RegExp(url + "/Claims_detail"), "get", p => {
    let returnArray = {
        StatusCode: 200,
        Msg: "success",
        Data: ClaimsList[0]
    };
    return returnArray;
});
//模板下载
Mock.mock(RegExp(url + "/Claims_downloadModel"), "post", function(par) {
    par = par.body;
    let returnArray = {
        StatusCode: 200,
        Msg: "success",
        Data: { url: "" }
    };
    return returnArray;
});
//导入理赔
Mock.mock(RegExp(url + "/Claims_uploadModel"), "post", function(par) {
    par = par.body;
    let returnArray = {
        StatusCode: 200,
        Msg: "success",
        Data: { url: "" }
    };
    return returnArray;
});
//导出理赔
Mock.mock(RegExp(url + "/Claims_download"), "post", function(par) {
    par = par.body;
    let returnArray = {
        StatusCode: 200,
        Msg: "success",
        Data: { url: "" }
    };
    return returnArray;
});
//权限列表
import {
    PermissionList,
    PermissionDetail,
    allPermissionList
} from "./AccountMangement/PermissionList";
//查询
Mock.mock(RegExp(url + "/PermissionList_list"), "get", p => {
    let param = util.getQueryValue(p.url);
    return {
        success: true,
        result: {
            totalCount: PermissionList.length,
            items: PermissionList.filter((t, index) => {
                return (
                    index >= param.SkipCount &&
                    index < +param.SkipCount + +param.MaxResultCount
                );
            })
        }
    };
});
//删除
Mock.mock(RegExp(url + "/delPermissionList"), "post", function(par) {
    par = par.body;
    let returnArray = {
        StatusCode: 200,
        Msg: "success"
    };
    return returnArray;
});
//添加
Mock.mock(RegExp(url + "/addPermissionList"), "post", function(par) {
    par = par.body;
    let returnArray = {
        StatusCode: 200,
        Msg: "success"
    };
    return returnArray;
});
//根据id查询详情
Mock.mock(RegExp(url + "/PermissionList_detail"), "get", p => {
    let returnArray = {
        StatusCode: 200,
        Msg: "success",
        Data: PermissionDetail
    };
    return returnArray;
});
//获取所有权限列表
Mock.mock(RegExp(url + "/allPermissionList_list"), "get", p => {
    let returnArray = {
        StatusCode: 200,
        Msg: "success",
        Data: allPermissionList
    };
    return returnArray;
});
//机构账号
import { InstitutionalAccount } from "./AccountMangement/InstitutionalAccount";
//查询
Mock.mock(RegExp(url + "/InstitutionalAccount_list"), "get", p => {
    let param = util.getQueryValue(p.url);
    return {
        success: true,
        result: {
            totalCount: InstitutionalAccount.length,
            items: InstitutionalAccount.filter((t, index) => {
                return (
                    index >= param.SkipCount &&
                    index < +param.SkipCount + +param.MaxResultCount
                );
            })
        }
    };
});
//删除
Mock.mock(RegExp(url + "/delInstitutionalAccount"), "post", function(par) {
    par = par.body;
    let returnArray = {
        StatusCode: 200,
        Msg: "success"
    };
    return returnArray;
});
//添加
Mock.mock(RegExp(url + "/addInstitutionalAccount"), "post", function(par) {
    par = par.body;
    let returnArray = {
        StatusCode: 200,
        Msg: "success"
    };
    return returnArray;
});
//获取策略组没有分页
Mock.mock(RegExp(url + "/PermissionListNoPage_list"), "get", p => {
    let param = util.getQueryValue(p.url);
    return {
        StatusCode: 200,
        Msg: "success",
        Data: PermissionList
    };
});
//内勤人员账号
import {
    InsideStaffAccount,
    employeeList
} from "./AccountMangement/InsideStaffAccount";
//查询
Mock.mock(RegExp(url + "/InsideStaffAccount_list"), "get", p => {
    let param = util.getQueryValue(p.url);
    return {
        success: true,
        result: {
            totalCount: InsideStaffAccount.length,
            items: InsideStaffAccount.filter((t, index) => {
                return (
                    index >= param.SkipCount &&
                    index < +param.SkipCount + +param.MaxResultCount
                );
            })
        }
    };
});
//删除
Mock.mock(RegExp(url + "/delInsideStaffAccount"), "post", function(par) {
    par = par.body;
    let returnArray = {
        StatusCode: 200,
        Msg: "success"
    };
    return returnArray;
});
//添加
Mock.mock(RegExp(url + "/addInsideStaffAccount"), "post", function(par) {
    par = par.body;
    let returnArray = {
        StatusCode: 200,
        Msg: "success"
    };
    return returnArray;
});
//员工列表
Mock.mock(RegExp(url + "/employeeList_list"), "get", p => {
    let param = util.getQueryValue(p.url);
    return {
        StatusCode: 200,
        Msg: "success",
        Data: employeeList
    };
});
//头像设置
import { getAvatar } from "./AccountIDManagement/HeadSet";
//获取头像
Mock.mock(RegExp(url + "/getAvatar"), "get", p => {
    return {
        StatusCode: 200,
        Msg: "success",
        Data: getAvatar
    };
});
//修改头像
Mock.mock(RegExp(url + "/editAvatar"), "post", p => {
    return {
        StatusCode: 200,
        Msg: "success"
    };
});
//重置密码
Mock.mock(RegExp(url + "/resetPassword"), "post", p => {
    return {
        StatusCode: 200,
        Msg: "success"
    };
});
export default Mock;
