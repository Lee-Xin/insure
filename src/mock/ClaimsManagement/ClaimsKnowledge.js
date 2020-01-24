const ClaimsKnowledgeList = [
    {
        id: "序号",
        title: "标题",
        author: "作者",
        readNum: "阅读数量",
        time: "日期",
        keywords: ["关键字1", "关键字2"],
        status: 1,
        collegeType: "课件分类",
        type: "小分类"
    }
];
for (let i = 0; i < 52; i++) {
    ClaimsKnowledgeList.push({
        id: i,
        title: "标题",
        author: "作者",
        readNum: "阅读数量",
        time: "日期",
        status: 2,
        keywords: ["关键字1", "关键字2"],
        collegeType: "课件分类",
        type: "小分类"
    });
}
const ClaimsKnowledgeDetail = {
    id: "序号",
    title: "标题",
    author: "作者",
    readNum: "阅读数量",
    keywords: ["关键字1", "关键字2"],
    time: "日期",
    status: 1,
    type: [1, 11],
    content: "123456",
    imgUrl: "https://img-blog.csdnimg.cn/20190927151101105.png"
};
export { ClaimsKnowledgeList, ClaimsKnowledgeDetail };
