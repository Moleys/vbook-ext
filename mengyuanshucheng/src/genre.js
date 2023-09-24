function execute() {
    return Response.success([
        {title: "玄幻", input: "/sort/xuanhuan", script: "zen.js"},
        {title: "奇幻", input: "/sort/qihuan", script: "zen.js"},
        {title: "武侠", input: "/sort/wuxia", script: "zen.js"},
        {title: "仙侠", input: "/sort/xianxia", script: "zen.js"},
        {title: "都市", input: "/sort/dushi", script: "zen.js"},
        {title: "历史", input: "/sort/lishi", script: "zen.js"},
        {title: "军事", input: "/sort/junshi", script: "zen.js"},
        {title: "游戏", input: "/sort/youxi", script: "zen.js"},
        {title: "竞技", input: "/sort/jingji", script: "zen.js"},
        {title: "科幻", input: "/sort/kehuan", script: "zen.js"}

    ]);
}