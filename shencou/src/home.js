function execute() {
    return Response.success([
        {title: "总排行榜", input:  "allvisit", script: "gen.js"},
        {title: "总推荐榜", input:  "allvote", script: "gen.js"},
        {title: "月排行榜", input:  "monthvisit", script: "gen.js"},
        {title: "月推荐榜", input:  "monthvote", script: "gen.js"},
        {title: "周排行榜", input:  "weekvisit", script: "gen.js"},
        {title: "周推荐榜", input:  "weekvote", script: "gen.js"},
        {title: "最新入库", input:  "postdate", script: "gen.js"},
        {title: "最近更新", input:  "lastupdate", script: "gen.js"},
        {title: "原创更新", input:  "authorupdate", script: "gen.js"},
        {title: "转载更新", input:  "masterupdate", script: "gen.js"},
        {title: "总收藏榜", input:  "goodnum", script: "gen.js"},
        {title: "字数排行", input:  "size", script: "gen.js"}
    ]);
}