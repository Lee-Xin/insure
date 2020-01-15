//查询列表
const productStructureList = {
  totalMoney: 350,
  totalNum: 30,
  numAvgMoney: 10,
  list: [
    {
      supplier: "供应商",
      xianzhong: "险种",
      money: "承保保费(元)",
      num: "保单件数(件)",
      id: "查看详情查询id",
      time: "时间段"
    }
  ]
};
//详情数据
const productStructureDetailList = [
  {
    supplier: "供应商",
    xianzhong: "险种",
    baodanId: "保单号",
    money: "承保保费(元)",
    jiaofeiqijian: "交费期间",
    time: "时间段"
  }
];
//导出查询数据
const productStructureExport = {
  url: ""
};

//导出详情数据
const productStructureExportDetail = {
  url: ""
};
export {
  productStructureList,
  productStructureExport,
  productStructureExportDetail,
  productStructureDetailList
};
