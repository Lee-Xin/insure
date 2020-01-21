const personalAdditionStatement = [
    {
        name: "姓名",
        workId: "工号",
        jigou: "所属机构",
        jibie: "当前职级",
        addNum: "增员人数",
        money: "增员标准保费",
        teamContiune: "继续率R13"
    }
];
for (let i = 0; i < 52; i++) {
    personalAdditionStatement.push({
        name: "姓名",
        workId: i,
        jigou: "所属机构",
        jibie: "当前职级",
        addNum: "增员人数",
        money: "增员标准保费",
        teamContiune: "继续率R13"
    });
}

export { personalAdditionStatement };
