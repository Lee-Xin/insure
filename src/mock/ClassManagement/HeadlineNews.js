const headlineNewsList = [
    {
        id: "序号",
        title: "标题",
        author: "作者",
        readNum: "阅读数量",
        time: "日期",
        status: 1,
        content: "123456"
    }
];
for (let i = 0; i < 52; i++) {
    headlineNewsList.push({
        id: i,
        title: "标题",
        author: "作者",
        readNum: "阅读数量",
        time: "日期",
        status: 2
    });
}
const headlineNewsDetail = {
    id: "序号",
    title: "标题",
    author: "作者",
    readNum: "阅读数量",
    time: "日期",
    status: 1,
    content: "123456",
    imgUrl: "https://img-blog.csdnimg.cn/20190927151101105.png"
};
export { headlineNewsList, headlineNewsDetail };
