function execute() {
    return Response.success([
        {title: "最近更新", input:  "https://w.linovelib.com/top/lastupdate", script: "gen.js"},
        {title: "最新入库", input:  "https://w.linovelib.com/top/postdate", script: "gen.js"},
        {title: "最新上架", input:  "https://w.linovelib.com/top/signtime", script: "gen.js"},
        {title: "总点击榜", input:  "https://w.linovelib.com/top/allvisit", script: "gen.js"},
        {title: "月点击榜", input:  "https://w.linovelib.com/top/monthvisit", script: "gen.js"},
        {title: "总推荐榜", input:  "https://w.linovelib.com/top/allvote", script: "gen.js"},
        {title: "月推荐榜", input:  "https://w.linovelib.com/top/monthvote", script: "gen.js"},
        {title: "收藏榜", input:  "https://w.linovelib.com/top/goodnum", script: "gen.js"},
        {title: "字数榜", input:  "https://w.linovelib.com/top/words", script: "gen.js"},
        {title: "新书榜", input:  "https://w.linovelib.com/top/newhot", script: "gen.js"},
        {title: "全本", input:  "https://w.linovelib.com/topfull/allvisit", script: "gen.js"},
        {title: "漫画", input:  "https://w.linovelib.com/wenku/comic", script: "gen2.js"}
    ]);
}