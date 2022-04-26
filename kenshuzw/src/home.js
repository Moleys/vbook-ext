function execute() {
    return Response.success([
        {title: "玄幻", input:  "https://www.kenshuzw.com/xuanhuan/", script: "gen.js"},
        {title: "武侠", input:  "https://www.kenshuzw.com/wuxia/", script: "gen.js"},
        {title: "言情", input:  "https://www.kenshuzw.com/yanqing/", script: "gen.js"},
        {title: "历史", input:  "https://www.kenshuzw.com/lishi/", script: "gen.js"},
        {title: "科幻", input:  "https://www.kenshuzw.com/kehuan/", script: "gen.js"},
        {title: "恐怖", input:  "https://www.kenshuzw.com/kongbu/", script: "gen.js"},
    ]);
}