function execute() {
    return Response.success([
        {title:"全部分类",input:"https://bookshelf.html5.qq.com/qbread/api/rank/list?ch=001995&groupid=1501&start={{page}}&count=20&sort=0&sub=&tag=&words=&finish=&t=20230302222523", script: "gen.js"},

    ]);
}