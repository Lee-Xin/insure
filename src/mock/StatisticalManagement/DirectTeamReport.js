const directTeamReport = [
    {
        name: "姓名",
        workId: "工号",
        jigou: "所属机构",
        jibie: "当前职级",
        money: "保费",
        teamContiune: "团队继续率R13"
    }
];
for (let i = 0; i < 52; i++) {
    directTeamReport.push({
        name: "姓名",
        workId: i,
        jigou: "所属机构",
        jibie: "当前职级",
        money: "保费",
        teamContiune: "团队继续率R13"
    });
}

export { directTeamReport };
