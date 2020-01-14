const baodanxingzi = [
  { id: 1, name: "转正单" },
  { id: 2, name: "非转正单" }
];
const capacityList = [
  {
    name: "机构简称",
    startHuman: "期初人力",
    endHuman: "期末人力",
    money: "标保保费",
    num: "承保件数",
    buyNum: "开单人数",
    humanAvgMoney: "人均保费",
    humanAvgNum: "人均件数",
    numAvgMoney: "件均保费",
    humanAvgProduct: "人均产能",
    time: "时间段"
  }
];
const capacityExport = { url: "1.excel" };
export { baodanxingzi, capacityList, capacityExport };
