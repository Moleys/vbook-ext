function execute() {
    return Response.success([
        {title: "猜你喜欢", input: "/", script: "up.js"},
        { title: "人气排行", input: "/top/hot/", script: "up1.js" },
        { title: "收藏排行", input: "/top/collect/", script: "up1.js" },
        { title: "热门全本", input: "/top/wanben/", script: "up1.js" },
        { title: "肉量排行", input: "/top/pornrate/", script: "up1.js" },
        { title: "评分排行", input: "/top/score/", script: "up1.js" },
        { title: "最新小说", input: "/top/new/", script: "up1.js" }
    ]);
}