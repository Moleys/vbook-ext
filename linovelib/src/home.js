function execute() {
    return Response.success([
        {title: "最近更新", input:  BASE_URL+"/top/lastupdate", script: "gen.js"},
        {title: "最新入库", input:  BASE_URL+"/top/postdate", script: "gen.js"},
        {title: "最新上架", input:  BASE_URL+"/top/signtime", script: "gen.js"},
        {title: "总点击榜", input:  BASE_URL+"/top/allvisit", script: "gen.js"},
        {title: "月点击榜", input:  BASE_URL+"/top/monthvisit", script: "gen.js"},
        {title: "总推荐榜", input:  BASE_URL+"/top/allvote", script: "gen.js"},
        {title: "月推荐榜", input:  BASE_URL+"/top/monthvote", script: "gen.js"},
        {title: "收藏榜", input:  BASE_URL+"/top/goodnum", script: "gen.js"},
        {title: "字数榜", input:  BASE_URL+"/top/words", script: "gen.js"},
        {title: "新书榜", input:  BASE_URL+"/top/newhot", script: "gen.js"},
        {title: "全本", input:  BASE_URL+"/topfull/allvisit", script: "gen.js"},
        {title: "漫画", input:  BASE_URL+"/wenku/comic", script: "gen2.js"}
    ]);
}