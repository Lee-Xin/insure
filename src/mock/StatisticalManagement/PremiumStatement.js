const premiumStatement = [
    {
        name: "姓名",
        workId: "工号",
        jigou: "所属机构",
        jibie: "当前职级",
        money: "保费"
    }
];
for (let i = 0; i < 52; i++) {
    premiumStatement.push({
        name: "姓名",
        workId: i,
        jigou: "所属机构",
        jibie: "当前职级",
        money: "保费"
    });
}

export { premiumStatement };
