function execute() {
    return Response.success([
        {title: "全部-最新更新", input:  "https://www.esjzone.cc/list-01", script: "gen.js"},
        {title: "全部-最新上架", input:  "https://www.esjzone.cc/list-02", script: "gen.js"},
        {title: "全部-最高評分", input:  "https://www.esjzone.cc/list-03", script: "gen.js"},
        {title: "全部-最多觀看", input:  "https://www.esjzone.cc/list-04", script: "gen.js"},
        {title: "全部-最多文章", input:  "https://www.esjzone.cc/list-05", script: "gen.js"},
        {title: "全部-最多討論", input:  "https://www.esjzone.cc/list-06", script: "gen.js"},
        {title: "全部-最多收藏", input:  "https://www.esjzone.cc/list-07", script: "gen.js"},
        {title: "全部-最多字數", input:  "https://www.esjzone.cc/list-08", script: "gen.js"},



    ]);
}