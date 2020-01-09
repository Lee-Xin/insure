import Mock from 'mockjs'
import qs from 'qs'
// import md5 from 'js-md5'
const url = 'http://localhost:8080';
import util from '@/assets/js/util';

import userData from './user';

import upstreamFolding from './UpstreamPolicy/UpstreamFolding';
import continuationRateBouns from './UpstreamPolicy/ContinuationRateBouns';
import NewIncentivesSearch from './UpstreamPolicy/NewIncentivesSearch';

import DownstreamFolding from "./DownstreamPolicy/DownstreamFolding";

import InstitutionalExpensesSearch from "./DownstreamPolicy/InstitutionalExpensesSearch";
import InstitutionalExpensesAdd from "./DownstreamPolicy/InstitutionalExpensesAdd";

import WorkerManagementSearch from "./WorkerManagement/WorkerManagementSearch";
import MarketingStaffRank from "./WorkerManagement/MarketingStaffRank";
import InsuranceMarketer from "./WorkerManagement/InsuranceMarketer";

import BasicLawAdministration from "./BasicLawAdministration/BasicLawAdministration";
import SalarySettlementSearch from "./BasicLawAdministration/SalarySettlementSearch"
import SalarySettlement from "./BasicLawAdministration/SalarySettlement";
import AttendanceManagementSearch from "./BasicLawAdministration/AttendanceManagementSearch";
import DeductionSearch from "./BasicLawAdministration/DeductionSearch";

import CompanyRetentionRateSearch from "./ContinuationRateReport/CompanyRetentionRateSearch";

import TargetConfigurationSearch from "./StatisticalManagement/TargetConfigurationSearch";
import ManpowerReportSearch from "./StatisticalManagement/ManpowerReportSearch";

import accountdata from './Accountdetails';
import Strategygroup from './Strategygroup';
import PermissionUrl from './PermissionUrl';

import SupplierList from './SupplierManagement/SupplierList';
import ProductList from './SupplierManagement/productList';

import MyMessage from './MyMessage';
import ExhibitionTools from './ExhibitionTools';
import APPHomepageModule from './APPHomepageModule';
import HomeData from './home'

let returnArray = {
    "StatusCode": 500,
    "Msg": '服务器错误',
    "Data": []
};
//-----------------首页-------------------------
Mock.mock(RegExp(url + '/home'), 'get', () => {
    returnArray = {
        "StatusCode": 200,
        "Msg": "数据请求成功",
        "Data": HomeData
    }
    return returnArray;
})
//---------------供应商管理--------------------------
//------供应商列表
Mock.mock(RegExp(url + '/SupplierService/GetAll'), 'get', (p) => {
    let param = util.getQueryValue(p.url);
    let {shortName, cooperationType, cooperationStatus} = param;
    return {
        "success": true,
        "result": {
            "totalCount": SupplierList.supplierList.length,
            "items": SupplierList.supplierList.filter((t, index) => {
                return index >= param.SkipCount && index < (param.SkipCount / param.MaxResultCount + 1) * param.MaxResultCount
                && (shortName ? shortName === t.shortName : true)
                && (cooperationType !== '' ? cooperationType === t.cooperationType : true)
                && (cooperationStatus !== '' ? cooperationStatus === t.cooperationStatus : true)
            })
        }
    }
});
Mock.mock(RegExp(url + '/SupplierService/GetById'), 'get', (p) => {
    let { id } = util.getQueryValue(p.url);
    let res = SupplierList.supplierList.filter(t => t.id == id);
    return {
        success: true,
        result: res.length > 0 ? res[0] : {}
    }
});
Mock.mock(RegExp(url + '/supplier_list'), 'get', () => {
    returnArray = {
        "StatusCode": 200,
        "Msg": "供应商列表查询成功",
        "Data": SupplierList
    }
    return returnArray;
});
Mock.mock(RegExp(url + '/SupplierService/GetCooperationStatus'), 'get', () => {
    return {
        success: true,
        result: SupplierList.state_cooperation.map((t, index) => {
            return {
                value: index,
                name: t
            }
        })
    }
});
Mock.mock(RegExp(url + '/SupplierService/GetCooperationType'), 'get', () => {
    return {
        success: true,
        result: SupplierList.type_cooperation.map((t, index) => {
            return {
                value: index,
                name: t
            }
        })
    }
});
//供应商查询
Mock.mock(url + '/supplier_list_search', 'post', (param) => {
    param = qs.parse(param.body);
    returnArray['Data'] = [];
    SupplierList.supplierList.forEach((item) => {
        if (item.supplier_niceName === param.supplier_niceName &&
            item.type_cooperation === param.type_cooperation &&
            item.state_cooperation === param.state_cooperation) {
            returnArray['StatusCode'] = 200;
            returnArray['Msg'] = '查询成功';
            returnArray['Data'].push(item);
        }
    })
    if (returnArray['Data'].length === 0) {
        returnArray = {
            "StatusCode": 404,
            "Msg": '暂无数据',
            "Data": []
        }
    }
    return returnArray;
})
//供应商分页查询
///api/test/supplier_list_search_pageInation/pageIndex=0,pageSize=0
Mock.mock(RegExp(url + '/supplier_list_search_pageInation/*'), 'get', (options) => {
    // window.console.log(options.url);
    let pageIndex = options.url.substring(options.url.indexOf('pageIndex=') + 10, options.url.indexOf(',')),
        pageSize = options.url.substring(options.url.indexOf('pageSize=') + 9);
    returnArray = {
        "StatusCode": 200,
        "Msg": "quesr success",
        "Data": {TotalPage: 20, pipeiData: SupplierList.supplierList, Records: 100}
    }
    return returnArray;
});
//新增供应商
Mock.mock(url + '/supplier_add', 'post', param => {
    param = qs.parse(param.body);
    window.console.log(param);
    return returnArray;
});
//-------------------------end------

//------产品搜索的选项
Mock.mock(/http:\/\/localhost:8080\/product_list/, 'get', () => {
    returnArray = {
        "StatusCode": 200,
        "Msg": 'query success',
        "Data": ProductList.productListSearch
    }
    return returnArray;
})
//产品查询
Mock.mock(url + '/product_list_search', 'post', function (param) {
    param = qs.parse(param.body);
    let newParam = {};
    // window.console.log(param)
    for (let item in param) {
        if (param[item] !== '') {
            newParam[item] = param[item];
        }
    }
    // window.console.log(newParam);
    returnArray['Data'] = [];
    ProductList.productList.forEach(item => {
        let judge = true;
        for (let p in newParam) {
            if (item[p] !== newParam[p]) {
                judge = false;
                break;
            }
        }
        if (judge) {
            returnArray['StatusCode'] = 200;
            returnArray['Msg'] = '查询成功';
            returnArray['Data'].push(item);
        }
    })
    return returnArray;
})
Mock.mock(RegExp(url + '/product_list_pageInation/*'), 'get', (options) => {
    let pageIndex = options.url.substring(options.url.indexOf('pageIndex=') + 10, options.url.indexOf(',')),
        pageSize = options.url.substring(options.url.indexOf('pageSize=') + 9);
    window.console.log('当前页' + pageIndex + ',每页有' + pageSize + '条数据');
    return pageInation(pageIndex, pageSize, ProductList.productList);
})
Mock.mock(url + '/product_list_add', 'post', (param) => {
    param = qs.parse(param.body);
    window.console.log(param);
})
//分页函数，pageIndex=1,pageSize=50
const pageInation = function (pageIndex, pageSize, data) {
    let startIndex = (pageIndex - 1) * pageSize,
        endIndex = pageIndex * pageSize - 1;
    // returnArray['Data'] = [];
    if (data.length < endIndex) {
        endIndex = data.length - 1;
    }
    returnArray['Data'] = {
        totalNum: data.length,
        pipeiData: [],
    }
    for (let i = startIndex; i <= endIndex; i++) {
        returnArray['StatusCode'] = 200;
        returnArray['Msg'] = "query success";
        returnArray['Data'].pipeiData.push(data[i]);
    }

    return returnArray;
}

//---------------------上游折标-----------
//-----上游折标search参数
Mock.mock(url + '/upstream_folding', 'get', function () {
    // window.console.log(param)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": upstreamFolding.upstream_floding_search
    }
    return returnArray;
});
//----上游折标分页查询
Mock.mock(RegExp(url + '/upstream_folding_pageInation/*'), 'get', (options) => {
    let pageIndex = options.url.substring(options.url.indexOf('pageIndex=') + 10, options.url.indexOf(',')),
        pageSize = options.url.substring(options.url.indexOf('pageSize=') + 9);
    window.console.log('当前页' + pageIndex + ',每页有' + pageSize + '条数据');
    return pageInation(pageIndex, pageSize, upstreamFolding.upstreamFolding);
});
//----上游折标查询
Mock.mock(url + '/upstream_folding_search', 'post', param => {
    param = qs.parse(param.body);
    let newParam = {};
    for (let item in param) {
        if (param[item] !== '') {
            newParam[item] = param[item];
        }
    }
    // window.console.log(newParam);
    returnArray['Data'] = [];
    upstreamFolding.upstreamFolding.forEach(item => {
        let judge = true;
        for (let p in newParam) {
            if (item[p] !== newParam[p]) {
                judge = false;
                break;
            }
        }
        if (judge) {
            returnArray['StatusCode'] = 200;
            returnArray['Msg'] = '查询成功';
            returnArray['Data'].push(item);
        }
    })
    return returnArray;
});
//---上游折标保存
Mock.mock(url + '/upstream_folding_add', 'post', param => {
    param = qs.parse(param.body);
    window.console.log(param);
    return param;
});
//---继续率奖金参数
Mock.mock(url + '/continuation_rate_bouns_param', 'get', function () {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": continuationRateBouns.ContinuationRateBounsSearch
    }
    return returnArray;
});
//---继续率奖金查询
Mock.mock(url + '/continuation_rate_bouns_search', 'post', param => {
    param = qs.parse(param.body);
    let newParam = {};
    for (let item in param) {
        if (param[item] !== '') {
            newParam[item] = param[item];
        }
    }
    // window.console.log(newParam);
    returnArray['Data'] = [];
    continuationRateBouns.tableData.forEach(item => {
        let judge = true;
        for (let p in newParam) {
            if (item[p] !== newParam[p]) {
                judge = false;
                break;
            }
        }
        if (judge) {
            returnArray['StatusCode'] = 200;
            returnArray['Msg'] = '查询成功';
            returnArray['Data'].push(item);
        }
    })
    return returnArray;
})
//---继续率奖金分页
Mock.mock(RegExp(url + '/continuation_rate_bouns_pageInation/*'), 'get', (options) => {
    let pageIndex = options.url.substring(options.url.indexOf('pageIndex=') + 10, options.url.indexOf(',')),
        pageSize = options.url.substring(options.url.indexOf('pageSize=') + 9);
    window.console.log('当前页' + pageIndex + ',每页有' + pageSize + '条数据');
    return pageInation(pageIndex, pageSize, continuationRateBouns.tableData);
});
//---继续率奖金保存
Mock.mock(url + '/continuation_rate_bouns_add', 'post', param => {
    param = qs.parse(param.body);
    window.console.log('您的数据已保存', param);
    returnArray = {
        "StatusCode": 200,
        "Msg": 'query success',
        "Data": param
    };
    return returnArray;
});
//---新增奖励
Mock.mock(url + '/new_incentives_param', 'get', () => {
    returnArray = {
        "StatusCode": 200,
        "Msg": 'query success',
        "Data": NewIncentivesSearch.newIncentivesSearch
    };
    return returnArray;
});
//---新增奖励搜索
Mock.mock(url + '/new_incentives_search', 'post', param => {
    param = qs.parse(param.body);
    let newParam = {};
    for (let item in param) {
        if (param[item] !== '') {
            newParam[item] = param[item];
        }
    }
    // window.console.log(newParam);
    returnArray['Data'] = [];
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
            returnArray['StatusCode'] = 200;
            returnArray['Msg'] = '查询成功';
            returnArray['Data'].push(item);
        }
    })
    // window.console.log(returnArray)
    return returnArray;
})
//---新增奖励分页
Mock.mock(RegExp(url + '/new_incentives_pageInation/*'), 'get', options => {
    let pageIndex = options.url.substring(options.url.indexOf('pageIndex=') + 10, options.url.indexOf(',')),
        pageSize = options.url.substring(options.url.indexOf('pageSize=') + 9);
    window.console.log('当前页' + pageIndex + ',每页有' + pageSize + '条数据');
    return pageInation(pageIndex, pageSize, NewIncentivesSearch.newIncentives);
})
//---新增奖励add
Mock.mock(url + '/new_incentives_add', 'post', param => {
    param = qs.parse(param.body);
    window.console.log('您的数据已保存', param);
    returnArray = {
        "StatusCode": 200,
        "Msg": 'query success',
        "Data": param
    };
    return returnArray;
});
//---续期服务津贴参数
Mock.mock(url + '/renewal_service_param', 'get', () => {
    returnArray = {
        "StatusCode": 200,
        "Msg": 'query success',
        "Data": upstreamFolding.upstream_floding_search
    }
    return returnArray;
});
Mock.mock(url + '/renewal_service_search', 'post', param => {
    param = qs.parse(param.body);
    // window.console.log(param);
    let newParam = {};
    for (let item in param) {
        if (param[item] !== '') {
            newParam[item] = param[item];
        }
    }
    returnArray['Data'] = [];
    upstreamFolding.upstreamFolding.forEach(item => {
        let judge = true;
        for (let p in newParam) {
            if (item[p] !== newParam[p]) {
                judge = false;
                break;
            }
        }
        if (judge) {
            returnArray['StatusCode'] = 200;
            returnArray['Msg'] = '查询成功';
            returnArray['Data'].push(item);
        }
    })
    return returnArray;
});
Mock.mock(RegExp(url + '/renewal_service_pageInation/*'), 'get', options => {
    let pageIndex = options.url.substring(options.url.indexOf('pageIndex=') + 10, options.url.indexOf(',')),
        pageSize = options.url.substring(options.url.indexOf('pageSize=') + 9);
    window.console.log('当前页' + pageIndex + ',每页有' + pageSize + '条数据');
    return pageInation(pageIndex, pageSize, NewIncentivesSearch.newIncentives);
})
Mock.mock(url + '/renewal_service_add', 'post', param => {
    param = qs.parse(param.body);
    window.console.log('您的数据已保存', param);
    returnArray = {
        "StatusCode": 200,
        "Msg": 'query success',
        "Data": param
    };
    return returnArray;
})
//---季度推动奖
Mock.mock(url + '/quarterly_promotion_award_param', 'get', () => {
    returnArray = {
        "StatusCode": 200,
        "Msg": 'query success',
        "Data": upstreamFolding.upstream_floding_search
    }
    return returnArray;
});
Mock.mock(url + '/quarterly_promotion_award_search', 'post', param => {
    param = qs.parse(param.body);
    // window.console.log(param);
    let newParam = {};
    for (let item in param) {
        if (param[item] !== '') {
            newParam[item] = param[item];
        }
    }
    returnArray['Data'] = [];
    upstreamFolding.upstreamFolding.forEach(item => {
        let judge = true;
        for (let p in newParam) {
            if (item[p] !== newParam[p]) {
                judge = false;
                break;
            }
        }
        if (judge) {
            returnArray['StatusCode'] = 200;
            returnArray['Msg'] = '查询成功';
            returnArray['Data'].push(item);
        }
    })
    return returnArray;
})
Mock.mock(RegExp(url + '/quarterly_promotion_award_pagrInation/*'), 'get', options => {
    let pageIndex = options.url.substring(options.url.indexOf('pageIndex=') + 10, options.url.indexOf(',')),
        pageSize = options.url.substring(options.url.indexOf('pageSize=') + 9);
    window.console.log('当前页' + pageIndex + ',每页有' + pageSize + '条数据');
    return pageInation(pageIndex, pageSize, NewIncentivesSearch.newIncentives);
})
//------------------------下游政策-------------------
Mock.mock(url + '/downstream_folding_param', 'get', () => {
    returnArray = {
        "StatusCode": 200,
        "Msg": 'query success',
        "Data": DownstreamFolding.downstreamFoldingSearch
    }
    return returnArray;
});
Mock.mock(url + '/downstream_folding_search', 'post', param => {
    param = qs.parse(param.body);
    // window.console.log(param);
    let newParam = {};
    for (let item in param) {
        if (param[item] !== '') {
            newParam[item] = param[item];
        }
    }
    returnArray['Data'] = [];
    DownstreamFolding.downstreamFolding.forEach(item => {
        let judge = true;
        for (let p in newParam) {
            if (item[p] !== newParam[p]) {
                judge = false;
                break;
            }
        }
        if (judge) {
            returnArray['StatusCode'] = 200;
            returnArray['Msg'] = '查询成功';
            returnArray['Data'].push(item);
        }
    })
    return returnArray;
});
Mock.mock(RegExp(url + '/downstream_folding_pageInation/*'), 'get', options => {
    let pageIndex = options.url.substring(options.url.indexOf('pageIndex=') + 10, options.url.indexOf(',')),
        pageSize = options.url.substring(options.url.indexOf('pageSize=') + 9);
    window.console.log('当前页' + pageIndex + ',每页有' + pageSize + '条数据');
    return pageInation(pageIndex, pageSize, DownstreamFolding.downstreamFolding);
})
//---机构费用
Mock.mock(url + '/institutional_expenses_param', 'get', () => {
    returnArray = {
        "StatusCode": 200,
        "Msg": 'query success',
        "Data": DownstreamFolding.downstreamFoldingSearch
    }
    return returnArray;
});
Mock.mock(url + '/institutional_expenses_search', 'post', param => {
    param = qs.parse(param.body);
    // window.console.log(param);
    let newParam = {};
    for (let item in param) {
        if (param[item] !== '') {
            newParam[item] = param[item];
        }
    }
    returnArray['Data'] = [];
    DownstreamFolding.downstreamFolding.forEach(item => {
        let judge = true;
        for (let p in newParam) {
            if (item[p] !== newParam[p]) {
                judge = false;
                break;
            }
        }
        if (judge) {
            returnArray['StatusCode'] = 200;
            returnArray['Msg'] = '查询成功';
            returnArray['Data'].push(item);
        }
    })
    return returnArray;
});
Mock.mock(RegExp(url + '/institutional_expenses_pageIntaion/*'), 'get', options => {
    let pageIndex = options.url.substring(options.url.indexOf('pageIndex=') + 10, options.url.indexOf(',')),
        pageSize = options.url.substring(options.url.indexOf('pageSize=') + 9);
    window.console.log('当前页' + pageIndex + ',每页有' + pageSize + '条数据');
    return pageInation(pageIndex, pageSize, DownstreamFolding.downstreamFolding);
});
Mock.mock(url + '/institutional_expenses_save', 'post', param => {
    param = qs.parse(param.body);
    window.console.log('您的数据已保存', param);
    returnArray = {
        "StatusCode": 200,
        "Msg": 'query success',
        "Data": param
    };
    return returnArray;
});
//---查询机构
Mock.mock(url + '/institutions_query', 'post', param => {
    param = qs.parse(param.body);
    // window.console.log(param);
    let newParam = {};
    for (let item in param) {
        if (param[item] !== '') {
            newParam[item] = param[item];
        }
    }
    returnArray['Data'] = [];
    DownstreamFolding.institutions.forEach(item => {
        let judge = true;
        for (let p in newParam) {
            if (item[p] !== newParam[p]) {
                judge = false;
                break;
            }
        }
        if (judge) {
            returnArray['StatusCode'] = 200;
            returnArray['Msg'] = '查询成功';
            returnArray['Data'].push(item);
        }
    })
    return returnArray;
    // window.console.log()
})
Mock.mock(url + '/institutions_delete', 'post', param => {
    param = qs.parse(param.body);
    let newParam = {};
    for (let item in param) {
        if (param[item] !== '') {
            newParam[item] = param[item];
        }
    }
    returnArray = {
        "StatusCode": 200,
        "Msg": 'delete success',
        "Data": newParam
    };
    window.console.log('正在删除：', newParam);
    return returnArray;
    // window.console.log(param);
});
//--销售费用
Mock.mock(url + '/sales_expenses_param', 'get', () => {
    returnArray = {
        "StatusCode": 200,
        "Msg": 'query success',
        "Data": DownstreamFolding.downstreamFoldingSearch
    }
    return returnArray;
});
Mock.mock(url + '/sales_expenses_search', 'post', param => {
    param = qs.parse(param.body);
    // window.console.log(param);
    let newParam = {};
    for (let item in param) {
        if (param[item] !== '') {
            newParam[item] = param[item];
        }
    }
    returnArray['Data'] = [];
    DownstreamFolding.downstreamFolding.forEach(item => {
        let judge = true;
        for (let p in newParam) {
            if (item[p] !== newParam[p]) {
                judge = false;
                break;
            }
        }
        if (judge) {
            returnArray['StatusCode'] = 200;
            returnArray['Msg'] = '查询成功';
            returnArray['Data'].push(item);
        }
    });
    return returnArray;
});


Mock.mock(url + '/manpower_report_search', 'get', function () {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": ManpowerReportSearch
    }
    return returnArray;
})

Mock.mock(url + '/target_configuration_search', 'get', function () {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": TargetConfigurationSearch
    }
    return returnArray;
})

Mock.mock(url + '/company_retention_rate_search', 'get', function () {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": CompanyRetentionRateSearch
    }
    return returnArray;
})

Mock.mock(url + '/deduction_search', 'get', function () {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": DeductionSearch
    }
    return returnArray;
})

Mock.mock(url + '/attendance_management_search', 'get', function () {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": AttendanceManagementSearch
    }
    return returnArray;
})

Mock.mock(url + '/salary_settlement', 'get', function () {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": SalarySettlement
    }
    return returnArray;
})

Mock.mock(url + '/salary_settlement_search', 'get', function () {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": SalarySettlementSearch
    }
    return returnArray;
})

Mock.mock(url + '/basicLaw_administration', 'get', function () {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": BasicLawAdministration
    }
    return returnArray;
})

Mock.mock(url + '/insurance_marketer', 'get', function () {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": InsuranceMarketer
    }
    return returnArray;
})

Mock.mock(url + '/marketing_staff_rank', 'get', function () {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": MarketingStaffRank
    }
    return returnArray;
})

Mock.mock(url + '/worker_management_search', 'get', function () {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": WorkerManagementSearch
    }
    return returnArray;
})

Mock.mock(url + '/institutional_expensesAdd', 'get', function () {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": InstitutionalExpensesAdd
    }
    return returnArray;
})

Mock.mock(url + '/institutional_expenses_search', 'get', function () {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": InstitutionalExpensesSearch
    }
    return returnArray;
})


Mock.mock(url + '/new_incentives_search', 'get', function () {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": NewIncentivesSearch
    }
    return returnArray;
})


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
Mock.mock(url + '/passwordReset', 'post', function (param) {
    // userData.forEach((item, index, userData)=>{
    param = qs.parse(param.body);
    userData.forEach((item) => {
        if (param.id) {
            if (param.id === item.id) {
                returnArray = {
                    "StatusCode": 200,
                    "Msg": "query success",
                    "Data": [{
                        id: item.id,
                        name: item.name
                    }]
                }
            }
        } else {
            returnArray["StatusCode"] = 400
            returnArray["Msg"] = "该用户不存在"
        }
    });
    return returnArray
});
Mock.mock(url + '/getaccountdetailss', 'get', function () {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": accountdata[0]
    }
    return returnArray
})
//账号详情
Mock.mock(url + '/accountdetailss', 'post', function (param) {
    // userData.forEach((item, index, userData)=>{
    param = qs.parse(param.body);
    window.console.debug(param)
    window.console.debug(accountdata)

    accountdata.forEach((item) => {
        if (param.id) {
            if (parseInt(param.id) === parseInt(item.id)) {
                returnArray = {
                    "StatusCode": 200,
                    "Msg": "query success",
                    "Data": [{
                        id: item.id,
                        name: item.name
                    }]
                }
            } else {
                returnArray["StatusCode"] = 400
                returnArray["Msg"] = "账户不存在2"
            }
        } else {
            returnArray["StatusCode"] = 400
            returnArray["Msg"] = "账户不存在"
        }
    });
    return returnArray
});
//读取策略组
Mock.mock(url + '/ReadPolicyGroup', 'post', function (param) {
    window.console.log(`当前页数${param.PageIndex},显示数据条数${param.PageSize}`)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": {TotalPage: 20, Rows: Strategygroup, Records: 100}
    }

    return returnArray
});
//读取权限列表
Mock.mock(url + '/GetAllRuel', 'get', function () {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": PermissionUrl
    }
    return returnArray
});
//添加策略组
Mock.mock(url + '/AddPolicyGroup', 'post', function (param) {
    param = qs.parse(param.body);
    var length = Math.ceil(Math.random() * 1000);
    window.console.log(param)
    param['id'] = length + 1
    Strategygroup.push(param)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": Strategygroup
    }
    return returnArray
});
//编辑策略组 视图 获取单条数据
Mock.mock(url + '/OnePolicyGroup', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par)
    Strategygroup.forEach((item, index) => {
        window.console.log(item.id, par.id)
        if (parseInt(item.id) === parseInt(par.id)) {
            returnArray = {
                "StatusCode": 200,
                "Msg": "query success",
                "Data": Strategygroup[index]
            }
        } else {
            returnArray = {
                "StatusCode": 200,
                "Msg": "暂无数据",
                "Data": []
            }
        }
    })
    return returnArray
});
//修改策略组
Mock.mock(url + '/UpdsPolicyGroup', 'post', function (par) {
    par = qs.parse(par.body);
    Strategygroup.forEach((item, index) => {
        if (parseInt(item.id) === parseInt(par.id)) {
            //删除数组
            Strategygroup[index] = par.body
            returnArray = {
                "StatusCode": 200,
                "Msg": "query success",
                "Data": Strategygroup
            }
        } else {
            returnArray = {
                "StatusCode": 200,
                "Msg": "暂无数据",
                "Data": Strategygroup
            }
        }
    })
    return returnArray
})
//删除策略组
Mock.mock(url + '/DelPolicyGroup', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par)
    Strategygroup.forEach((item, index) => {
        if (parseInt(item.id) === parseInt(par.id)) {
            //删除数组
            Strategygroup.splice(index, 1)
            returnArray = {
                "StatusCode": 200,
                "Msg": "query success",
                "Data": Strategygroup
            }
        } else {
            returnArray = {
                "StatusCode": 200,
                "Msg": "暂无数据",
                "Data": Strategygroup
            }
        }
    })
    return returnArray
});
//获取所有的机构
import mechanism from './mechanism';

Mock.mock(url + '/GetAllmechanism', 'get', function () {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": mechanism
    }
    return returnArray
});
//获取所有的机构账号
import MechanismAccount from './MechanismAccount';

Mock.mock(url + '/GetAllmechanismAccount', 'post', function (param) {

    param = qs.parse(param.body);
    window.console.log(`当前页数${param.PageIndex},显示数据条数${param.PageSize}`)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": {TotalPage: 20, Rows: MechanismAccount, Records: 100}
    }
    return returnArray
});
//添加机构账号
Mock.mock(url + '/AddMechanismAccount', 'post', function (param) {
    window.console.log(param)
    param = qs.parse(param.body);
    var length = Math.ceil(Math.random() * 1000);
    param['id'] = length + 1
    window.console.log(MechanismAccount)

    MechanismAccount.push(param)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": MechanismAccount
    }
    return returnArray
});
//修改机构账号
Mock.mock(url + '/UpdMechanismAccount', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par.id)
    MechanismAccount.forEach((item, index) => {
        window.console.log(item.id)

        if (parseInt(item.id) === parseInt(par.id)) {

            //修改数组
            MechanismAccount[index] = par
            returnArray = {
                "StatusCode": 200,
                "Msg": "query success",
                "Data": MechanismAccount
            }
        } else {
            returnArray = {
                "StatusCode": 200,
                "Msg": "暂无数据",
                "Data": MechanismAccount
            }
        }
    })
    return returnArray
})
//删除机构账号
Mock.mock(url + '/DelMechanismAccount', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par)
    MechanismAccount.forEach((item, index) => {
        if (parseInt(item.id) === parseInt(par.id)) {
            //删除数组
            MechanismAccount.splice(index, 1)
            returnArray = {
                "StatusCode": 200,
                "Msg": "query success",
                "Data": MechanismAccount
            }
        } else {
            returnArray = {
                "StatusCode": 200,
                "Msg": "暂无数据",
                "Data": MechanismAccount
            }
        }
    })
    return returnArray
});
//员工账号
import StaffAccount from './StaffAccount';

Mock.mock(url + '/GetAllStaff', 'post', function (param) {
    param = qs.parse(param.body);
    window.console.log(`当前页数${param.PageIndex},显示数据条数${param.PageSize}`)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": {TotalPage: 20, Rows: StaffAccount, Records: 100}
    }
    return returnArray
});
//添加机构账号
Mock.mock(url + '/AddStaff', 'post', function (param) {
    window.console.log(param)
    param = qs.parse(param.body);
    var length = Math.ceil(Math.random() * 1000);
    param['id'] = length + 1
    window.console.log(StaffAccount)

    StaffAccount.push(param)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": StaffAccount
    }
    return returnArray
});
//修改员工账号
Mock.mock(url + '/UpdStaff', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par.id)
    StaffAccount.forEach((item, index) => {
        window.console.log(item.id)

        if (parseInt(item.id) === parseInt(par.id)) {

            //修改数组
            StaffAccount[index] = par
            returnArray = {
                "StatusCode": 200,
                "Msg": "query success",
                "Data": StaffAccount
            }
        } else {
            returnArray = {
                "StatusCode": 200,
                "Msg": "暂无数据",
                "Data": StaffAccount
            }
        }
    })
    return returnArray
})
//删除员工账号
Mock.mock(url + '/DelStaff', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par)
    StaffAccount.forEach((item, index) => {
        if (parseInt(item.id) === parseInt(par.id)) {
            //删除数组
            StaffAccount.splice(index, 1)
            returnArray = {
                "StatusCode": 200,
                "Msg": "query success",
                "Data": StaffAccount
            }
        } else {
            returnArray = {
                "StatusCode": 200,
                "Msg": "暂无数据",
                "Data": StaffAccount
            }
        }
    })
    return returnArray
});

//====================================================================================================
import lipei from './lipei';

Mock.mock(url + '/GetLpclass', 'get', function () {

    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": lipei
    }
    return returnArray
});
Mock.mock(url + '/GetLpdata', 'post', function (param) {
    param = qs.parse(param.body);
    window.console.log(`当前页数${param.PageIndex},显示数据条数${param.PageSize}`)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": {TotalPage: 20, Rows: lipei, Records: 100}
    }
    return returnArray
});
//添加理赔分类
Mock.mock(url + '/Addlipei', 'post', function (param) {
    window.console.log(param)
    param = qs.parse(param.body);
    var length = Math.ceil(Math.random() * 1000);
    param['id'] = length + 1
    window.console.log(lipei)

    lipei.push(param)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": lipei
    }
    return returnArray
});
//修改理赔分类
Mock.mock(url + '/Updlipei', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par)
    lipei.forEach((item, index) => {
        window.console.log(item.id)
        if (parseInt(item.id) === parseInt(par.id)) {
            //修改数组
            lipei[index] = par
            returnArray = {
                "StatusCode": 200,
                "Msg": "query success",
                "Data": lipei
            }
        } else {
            returnArray = {
                "StatusCode": 200,
                "Msg": "暂无数据",
                "Data": lipei
            }
        }
    })
    return returnArray
})
//删除理赔分类
Mock.mock(url + '/Dellipei', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par)
    lipei.forEach((item, index) => {
        if (parseInt(item.id) === parseInt(par.id)) {
            //删除数组
            lipei.splice(index, 1)
            returnArray = {
                "StatusCode": 200,
                "Msg": "query success",
                "Data": lipei
            }
        } else {
            returnArray = {
                "StatusCode": 200,
                "Msg": "暂无数据",
                "Data": lipei
            }
        }
    })
    return returnArray
});

//理赔知识
import lipeidata from './lipeidata';

Mock.mock(url + '/getlpdata', 'post', function (param) {
    param = qs.parse(param.body);
    window.console.log(`当前页数${param.PageIndex},显示数据条数${param.PageSize}`)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": {TotalPage: 20, Rows: lipeidata, Records: 100}
    }
    return returnArray
});
//添加理赔分类
Mock.mock(url + '/addlpdata', 'post', function (param) {
    window.console.log(param)
    param = qs.parse(param.body);
    var length = Math.ceil(Math.random() * 1000);
    param['id'] = length + 1
    window.console.log(lipeidata)

    lipeidata.push(param)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": lipeidata
    }
    return returnArray
});
//修改理赔分类
Mock.mock(url + '/updlpdata', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par)
    lipeidata.forEach((item, index) => {
        window.console.log(item.id)
        if (parseInt(item.id) === parseInt(par.id)) {
            //修改数组
            lipeidata[index] = par
            returnArray = {
                "StatusCode": 200,
                "Msg": "query success",
                "Data": lipeidata
            }
        } else {
            returnArray = {
                "StatusCode": 200,
                "Msg": "暂无数据",
                "Data": lipeidata
            }
        }
    })
    return returnArray
})
//删除理赔分类
Mock.mock(url + '/dellpdata', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par)
    lipeidata.forEach((item, index) => {
        if (parseInt(item.id) === parseInt(par.id)) {
            //删除数组
            lipeidata.splice(index, 1)
            returnArray = {
                "StatusCode": 200,
                "Msg": "query success",
                "Data": lipeidata
            }
        } else {
            returnArray = {
                "StatusCode": 200,
                "Msg": "暂无数据",
                "Data": lipeidata
            }
        }
    })
    return returnArray
});
//连续理赔
import lianxulipei from './lianxulipei';

Mock.mock(url + '/lxlipei', 'post', function (param) {
    param = qs.parse(param.body);
    window.console.log(`当前页数${param.PageIndex},显示数据条数${param.PageSize}`)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": {TotalPage: 20, Rows: lianxulipei, Records: 100}
    }
    return returnArray
});
//添加连续理赔
Mock.mock(url + '/addlxlipei', 'post', function (param) {
    window.console.log(param)
    param = qs.parse(param.body);
    var length = Math.ceil(Math.random() * 1000);
    param['id'] = length + 1
    window.console.log(lianxulipei)

    lianxulipei.push(param)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": lianxulipei
    }
    return returnArray
});
//修改连续理赔
Mock.mock(url + '/updlxlipei', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par)
    lianxulipei.forEach((item, index) => {
        window.console.log(item.id)
        if (parseInt(item.id) === parseInt(par.id)) {
            //修改数组
            lianxulipei[index] = par
            returnArray = {
                "StatusCode": 200,
                "Msg": "query success",
                "Data": lianxulipei
            }
        } else {
            returnArray = {
                "StatusCode": 200,
                "Msg": "暂无数据",
                "Data": lianxulipei
            }
        }
    })
    return returnArray
})
//删除连续理赔
Mock.mock(url + '/dellxlipei', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par)
    lianxulipei.forEach((item, index) => {
        if (parseInt(item.id) === parseInt(par.id)) {
            //删除数组
            lianxulipei.splice(index, 1)
            returnArray = {
                "StatusCode": 200,
                "Msg": "query success",
                "Data": lianxulipei
            }
        } else {
            returnArray = {
                "StatusCode": 200,
                "Msg": "暂无数据",
                "Data": lianxulipei
            }
        }
    })
    return returnArray
});
//理赔工具
//理赔公司
import lipeigongsi from './lipeigongsi';

Mock.mock(url + '/lipeigongsi', 'post', function () {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": lipeigongsi
    }
    return returnArray
});
import lipeigongsibind from './lipeigongsibind';
//理赔公司绑定  param传的是公司列表的id 数组
Mock.mock(url + '/bindgongsi', 'post', function (param) {
    window.console.log(param)
    param = qs.parse(param.body);
    var length = Math.ceil(Math.random() * 1000);
    param['id'] = length + 1
    lipeigongsibind.push(param)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": lipeigongsibind
    }
    return returnArray
});
//获取绑定的理赔公司列表
Mock.mock(url + '/getlipeigongsidata', 'post', function (param) {
    param = qs.parse(param.body);
    window.console.log(`当前页数${param.PageIndex},显示数据条数${param.PageSize}`)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": {TotalPage: 20, Rows: lipeigongsibind, Records: 100}
    }
    return returnArray
});


//理赔列表
import lipeilistdata from './lipeilistdata';

Mock.mock(url + '/lipeilist', 'post', function (param) {
    param = qs.parse(param.body);
    window.console.log(`当前页数${param.PageIndex},显示数据条数${param.PageSize}`)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": {TotalPage: 20, Rows: lipeilistdata, Records: 100}
    }
    return returnArray
});
//添加理赔
Mock.mock(url + '/addlipeidata', 'post', function (param) {
    window.console.log(param)
    param = qs.parse(param.body);
    var length = Math.ceil(Math.random() * 1000);
    param['id'] = length + 1
    window.console.log(lipeilistdata)

    lipeilistdata.push(param)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": lipeilistdata
    }
    return returnArray
});
//修改理赔
Mock.mock(url + '/updlipeidata', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par)
    lipeilistdata.forEach((item, index) => {
        window.console.log(item.id)
        if (parseInt(item.id) === parseInt(par.id)) {
            //修改数组
            lipeilistdata[index] = par
            returnArray = {
                "StatusCode": 200,
                "Msg": "query success",
                "Data": lipeilistdata
            }
        } else {
            returnArray = {
                "StatusCode": 200,
                "Msg": "暂无数据",
                "Data": lipeilistdata
            }
        }
    })
    return returnArray
})
//删除理赔
Mock.mock(url + '/dellipeidata', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par)
    lipeilistdata.forEach((item, index) => {
        if (parseInt(item.id) === parseInt(par.id)) {
            //删除数组
            lipeilistdata.splice(index, 1)
            returnArray = {
                "StatusCode": 200,
                "Msg": "query success",
                "Data": lipeilistdata
            }
        } else {
            returnArray = {
                "StatusCode": 200,
                "Msg": "暂无数据",
                "Data": lipeilistdata
            }
        }
    })
    return returnArray
});
//保险公司获取

import baoxiangongsi from './baoxiangongsidata';

Mock.mock(url + '/baoxiangongsi', 'get', function () {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": baoxiangongsi
    }
    return returnArray
});


import ketang from './ketang.js'
//课堂管理列表
Mock.mock(url + '/zhishilist', 'post', function (param) {
    param = qs.parse(param.body);
    window.console.log(`当前页数${param.PageIndex},显示数据条数${param.PageSize}`)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": {TotalPage: 20, Rows: ketang, Records: 100}
    }
    return returnArray
});
//添加课堂管理
Mock.mock(url + '/addzhishi', 'post', function (param) {
    window.console.log(param)
    param = qs.parse(param.body);
    var length = Math.ceil(Math.random() * 1000);
    param['id'] = length + 1
    window.console.log(ketang)

    ketang.push(param)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": ketang
    }
    return returnArray
});
//修改课堂管理
Mock.mock(url + '/updzhishi', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par)
    ketang.forEach((item, index) => {
        window.console.log(item.id)
        if (parseInt(item.id) === parseInt(par.id)) {
            //修改数组
            ketang[index] = par
            returnArray = {
                "StatusCode": 200,
                "Msg": "query success",
                "Data": ketang
            }
        } else {
            returnArray = {
                "StatusCode": 200,
                "Msg": "暂无数据",
                "Data": ketang
            }
        }
    })
    return returnArray
})
//删除课堂管理
Mock.mock(url + '/delzhishi', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par)
    ketang.forEach((item, index) => {
        if (parseInt(item.id) === parseInt(par.id)) {
            //删除数组
            ketang.splice(index, 1)
            returnArray = {
                "StatusCode": 200,
                "Msg": "query success",
                "Data": ketang
            }
        } else {
            returnArray = {
                "StatusCode": 200,
                "Msg": "暂无数据",
                "Data": ketang
            }
        }
    })
    return returnArray
});
//课堂发布
Mock.mock(url + '/fabuzhishi', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par.id)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": ketang
    }
    return returnArray
});
//课堂取消发布
Mock.mock(url + '/qxfabuzhishi', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par.id)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": ketang
    }
    return returnArray
});


// const generateToken = (userInfo)=>{
//     return md5(userInfo);
//     // window.console.log(userInfoMD5)
//     // return userInfoMD5
// }

import toutiao from './toutiao'
//头条列表
Mock.mock(url + '/toutiaolist', 'post', function (param) {
    param = qs.parse(param.body);
    window.console.log(`当前页数${param.PageIndex},显示数据条数${param.PageSize}`)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": {TotalPage: 20, Rows: toutiao, Records: 100}
    }
    return returnArray
});
//添加头条
Mock.mock(url + '/addtoutiao', 'post', function (param) {
    window.console.log(param)
    param = qs.parse(param.body);
    var length = Math.ceil(Math.random() * 1000);
    param['id'] = length + 1
    window.console.log(toutiao)

    toutiao.push(param)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": toutiao
    }
    return returnArray
});
//修改头条
Mock.mock(url + '/updtoutiao', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par)
    toutiao.forEach((item, index) => {
        window.console.log(item.id)
        if (parseInt(item.id) === parseInt(par.id)) {
            //修改数组
            toutiao[index] = par
            returnArray = {
                "StatusCode": 200,
                "Msg": "query success",
                "Data": toutiao
            }
        } else {
            returnArray = {
                "StatusCode": 200,
                "Msg": "暂无数据",
                "Data": toutiao
            }
        }
    })
    return returnArray
})
//删除头条
Mock.mock(url + '/deltoutiao', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par)
    toutiao.forEach((item, index) => {
        if (parseInt(item.id) === parseInt(par.id)) {
            //删除数组
            toutiao.splice(index, 1)
            returnArray = {
                "StatusCode": 200,
                "Msg": "query success",
                "Data": toutiao
            }
        } else {
            returnArray = {
                "StatusCode": 200,
                "Msg": "暂无数据",
                "Data": toutiao
            }
        }
    })
    return returnArray
});
//课堂发布
Mock.mock(url + '/fabutoutiao', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par.id)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": lipeidata
    }
    return returnArray
});
//课堂取消发布
Mock.mock(url + '/quxiaotoutiao', 'post', function (par) {
    par = qs.parse(par.body);
    window.console.log(par.id)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": lipeidata
    }
    return returnArray
});
//机构管理-机构分类获取
import jigouclass from './jigouclass'

Mock.mock(url + '/getjigouclass', 'post', function (param) {
    window.console.log(`当前页数${param},显示数据条数${param}`)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": jigouclass
    }
    return returnArray
})
//机构管理-机构分类添加
Mock.mock(url + '/setjigouclass', 'post', function (param) {
    window.console.log(`数据${param}`)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": []
    }
    return returnArray
})
//机构管理-机构列表
import jigougunalidata from './jigougunalidata'

Mock.mock(url + '/getjigoulist', 'post', function (param) {
    param = qs.parse(param.body);
    window.console.log(`当前页数${param.PageIndex},显示数据条数${param.PageSize}`)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": {TotalPage: 20, Rows: jigougunalidata, Records: 100}
    }
    return returnArray
})
Mock.mock(url + '/addjigoulist', 'post', function (param) {
    window.console.log(`数据${param}`)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": []
    }
    return returnArray
})
Mock.mock(url + '/updjigoulist', 'post', function (param) {
    window.console.log(`数据${param}`)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": []
    }
    return returnArray
})
//员工管理--内勤管理
//列表
import desk_list from './desk_list/index'

Mock.mock(url + '/yglist', 'post', function (param) {
    param = qs.parse(param.body);
    window.console.log(`当前页数${param.PageIndex},显示数据条数${param.PageSize}`)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": {TotalPage: 20, Rows: desk_list, Records: 100}
    }
    return returnArray
})
Mock.mock(url + '/addyg', 'post', function (param) {
    param = qs.parse(param.body);
    window.console.log(`当前页数${param.PageIndex},显示数据条数${param.PageSize}`)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": {TotalPage: 20, Rows: desk_list, Records: 100}
    }
    return returnArray
})
Mock.mock(url + '/updyg', 'post', function (param) {
    param = qs.parse(param.body);
    window.console.log(`当前页数${param.PageIndex},显示数据条数${param.PageSize}`)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": {TotalPage: 20, Rows: desk_list, Records: 100}
    }
    return returnArray
})
Mock.mock(url + '/delyg', 'post', function (param) {
    param = qs.parse(param.body);
    window.console.log(`当前页数${param.PageIndex},显示数据条数${param.PageSize}`)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": {TotalPage: 20, Rows: desk_list, Records: 100}
    }
    return returnArray
})

// 
// 我的消息
// 
Mock.mock(RegExp(url + "/MyMessage/*"), 'get', function (par) {
    // par = qs.parse(par.body);
    console.log(par)
    if (MyMessage.length > 0) {
        returnArray = {
            "StatusCode": 200,
            "Msg": "query success",
            "Data": MyMessage
        }
    } else {
        returnArray = {
            "StatusCode": 200,
            "Msg": "暂无数据",
            "Data": MyMessage
        }
    }
    return returnArray
});
// 我的消息-搜索
Mock.mock(url + '/MyMessageSearch', 'post', function (par) {
    console.log(par)
    let formatPar = JSON.parse(par.body)
    let tmp = MyMessage.filter(item => {
        return item.date == formatPar.searchDate
    })
    console.log(tmp)
    if (tmp.length > 0) {
        returnArray = {
            "StatusCode": 200,
            "Msg": "query success",
            "Data": tmp
        }
    } else {
        returnArray = {
            "StatusCode": 200,
            "Msg": "暂无数据",
            "Data": tmp
        }
    }
    return returnArray
});
// 我的消息-添加
Mock.mock(url + '/addMyMessage', 'post', function (par) {
    let formatPar = JSON.parse(par.body)
    console.log(formatPar)
    MyMessage.push(formatPar)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": MyMessage
    }
    return returnArray
});
// 我的消息-添加
Mock.mock(url + '/sendMyMessage', 'post', function (par) {
    let formatPar = JSON.parse(par.body)
    console.log(formatPar)
    MyMessage.push(formatPar)
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": MyMessage
    }
    return returnArray
});
// 我的消息-删除
Mock.mock(url + '/addMyMessageDelete', 'post', function (par) {
    let formatPar = JSON.parse(par.body)
    console.log(formatPar)
    return {
        "StatusCode": 200,
        "Msg": "删除成功",
        "Data": MyMessage,
        "your": formatPar
    }
});
// 展业工具
Mock.mock(RegExp(url + '/ExhibitionTools/*'), 'get', function (par) {
    if (ExhibitionTools.length > 0) {
        returnArray = {
            "StatusCode": 200,
            "Msg": "query success",
            "Data": ExhibitionTools
        }
    } else {
        returnArray = {
            "StatusCode": 200,
            "Msg": "暂无数据",
            "Data": ExhibitionTools
        }
    }
    return returnArray
});
// 展业工具-搜索
Mock.mock(RegExp(url + '/ExhibitionToolsSearch/*'), 'post', function (par) {
    console.log(par)
    let formatPar = JSON.parse(par.body)
    let tmp = ExhibitionTools.filter(item => {
        return item.supplier == formatPar.supplier && item.type == formatPar.type
    })
    console.log(tmp)
    if (tmp.length > 0) {
        returnArray = {
            "StatusCode": 200,
            "Msg": "query success",
            "Data": tmp
        }
    } else {
        returnArray = {
            "StatusCode": 200,
            "Msg": "暂无数据",
            "Data": tmp
        }
    }
    return returnArray
});
// 展业工具-删除
Mock.mock(url + '/ExhibitionToolsDelete', 'post', function (par) {
    console.log(par)
    let formatPar = JSON.parse(par.body)
    if (ExhibitionTools.length > 0) {
        ExhibitionTools.map((item, index) => {
            if (item.id == formatPar.id) {
                ExhibitionTools.splice(index, 1)
            }
        })
        returnArray = {
            "StatusCode": 200,
            "Msg": "删除成功",
            "Data": ExhibitionTools
        }
    } else {
        returnArray = {
            "StatusCode": 200,
            "Msg": "暂无数据",
            "Data": ExhibitionTools
        }
    }
    return returnArray
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
Mock.mock(RegExp(url + '/APPHomepageModuleDelete/*'), 'post', function (par) {
    console.log(par)
    let formatPar = JSON.parse(par.body)
    let tmpArr = APPHomepageModule.hot[formatPar.type]
    tmpArr.find((item, index) => {
        if (item.id == formatPar.id) {
            tmpArr.splice(index, 1)
            return true
        }
    })
    return {
        "StatusCode": 200,
        "Msg": "删除成功",
        "Data": APPHomepageModule.hot
    }
});
// app首页管理-轮播
// 轮播
Mock.mock(RegExp(url + '/APPHomepageModuleBanner/*'), 'get', function (par) {
    console.log(par)
    return {
        "StatusCode": 200,
        "Msg": "成功",
        "Data": APPHomepageModule.banner
    }
});
// app首页管理
// 热销产品
Mock.mock(/\/api\/test\/APPHomepageModule\/*/, 'get', function (par) {
    console.log(par)
    let returnArray = {
        "StatusCode": 200,
        "Msg": "暂无数据",
        "Data": APPHomepageModule.hot
    }
    return returnArray
});


//获取险种   机构   供应商  机构类型 保单状态
import gongyingshang from './gongyingshang'
import xianzhong from './xianzhong'
import jigou from './jigou'
import jigoutype from './jigoutype'
import baodanstatus from './baodanstatus'

Mock.mock(url + '/getallparameter', 'get', function () {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": {'gongyingshang': gongyingshang, 'xianzhong': xianzhong, 'jigou': jigou, 'jigoutype': jigoutype,baodanstatus}
    }
    return returnArray
})
//====================================================================================================

//供应商保费
import {SupplierPremiumExportData,SupplierPremiumSearchData} from './StatisticalManagement/SupplierPremium'
//查询
Mock.mock(RegExp(url + '/supplier_premium'), 'get', options => {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": SupplierPremiumSearchData
    }
    return returnArray
})
//导出
Mock.mock(RegExp(url + '/exportSupplier_premium'), 'post', options => {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": SupplierPremiumExportData
    }
    return returnArray
})

//机构保费
import {AgencyPremiumExportData,AgencyPremiumSearchData} from './StatisticalManagement/AgencyPremium'
//查询
Mock.mock(RegExp(url + '/agency_premium'), 'get', options => {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": AgencyPremiumSearchData
    }
    return returnArray
})
//导出
Mock.mock(RegExp(url + '/exportAgency_premium'), 'post', options => {
    returnArray = {
        "StatusCode": 200,
        "Msg": "query success",
        "Data": AgencyPremiumExportData
    }
    return returnArray
})
export default Mock;
