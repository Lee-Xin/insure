const supplierList=[
    {
        "code": "123456",
        "shortName": "泰康人寿",
        "startDate": "2020-01-05",
        "endDate": "2020-01-05",
        "cooperationType": "战略合作",
        "cooperationStatus": "暂停",
        "serviceTelephone": "13686752345",
        "serviceHotline": "14523456789",
        "website": "www.tyr.com",
        "fullName": "安盛天平财产保险股份有限公司",
        "id": "-1"
    }
]
for(let i = 0; i < 55; i++) {
    supplierList.push({
        "code": "123456",
        "shortName": "泰康人寿" + i,
        "startDate": "2020-01-05",
        "endDate": "2020-01-05",
        "cooperationType": "战略合作",
        "cooperationStatus": "合作",
        "serviceTelephone": "13686752345",
        "serviceHotline": "14523456789",
        "website": "www.tyr.com",
        "fullName": "安盛天平财产保险股份有限公司",
        "id": i
    });
}
const state_cooperation=['合作','未启动','暂停','不限'];
const type_cooperation = ['战略合作','创新合作','联盟合作','不限'];
const supplier_name = ['安盛天平财产保险股份有限公司','安诚财产保险股份有限公司','安信农业保险股份有限公司','长江养老保险股份有限公司'];
export default{
    supplierList,
    state_cooperation,
    type_cooperation,
    supplier_name
}
;