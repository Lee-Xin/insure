const numberReportList = [
    {
        name: "姓名",
        workId: "工号",
        jigou: "所属机构",
        jibie: "当前职级",
        num: "件数"
    }
];
for (let i = 0; i < 52; i++) {
    numberReportList.push({
        name: "姓名",
        workId: i,
        jigou: "所属机构",
        jibie: "当前职级",
        num: "件数"
    });
}

export { numberReportList };
