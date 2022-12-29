function execute() {
    return Response.success([
        {title: "男·全网大热榜",input: "https://infosxs.pysmei.com/top/man/top/hot/week", script: "gen.js" },
        {title: "男·超人气精品",input: "https://infosxs.pysmei.com/top/man/top/vote/week", script: "gen.js" },
        {title: "女·全网大热榜",input: "https://infosxs.pysmei.com/top/lady/top/hot/week", script: "gen.js" },
        {title: "女·超人气精品",input: "https://infosxs.pysmei.com/top/lady/top/vote/week", script: "gen.js" },
    ]);
}