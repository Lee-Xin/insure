//机构保费查询数据

//查询条件  insuranceBuyTime(投保时间):"2010-01-01,2020-12-12"
//insuranceUseTime(承保时间):"2010-01-01,2020-12-12"
// supplier(供应商)：1001，
// mechanism(机构)：1001
// mechanismType(机构类型)：1001
// type(保险类型)：1001
//checked(含下属机构):true/false  true:包含，false不包含
//status(保单状态):1001
//返回数据
//totalMoney:总标准保费单位万元
//totalNum:总件数
//list:每个供应商的标准保费

const AgencyPremiumSearchData = {
  totalMoney: 350,
  totalNum: 30,
  list: [
    {
      name: "供应商1",
      money: 100
    },
    { name: "供应商2", money: 50 },
    { name: "供应商3", money: 200 }
  ]
};

//导出
//导出条件  insuranceBuyTime(投保时间):"2010-01-01,2020-12-12"
//insuranceUseTime(承保时间):"2010-01-01,2020-12-12"
// supplier(供应商)：1001，
// mechanism(机构)：1001
//status(保单状态):1001
// type(保险类型)：1001

//导出数据
//url导出文件的地址
const AgencyPremiumExportData = {
  url: "http://teacherwebapi.cqdunyue.com/v1/classTeacher/importChina"
};

export { AgencyPremiumExportData, AgencyPremiumSearchData };
