function execute() {
    return Response.success([
        {title: "全网大热榜", input:  "https://novel-api.xiaoppkk.com/h5/index-rank-rank_type-hot", script: "gen.js"},
        {title: "超人气精品", input:  "https://novel-api.xiaoppkk.com/h5/index-rank-rank_type-fan", script: "gen.js"},
        {title: "猜你喜欢", input:  "https://novel-api.xiaoppkk.com/h5/index-rank-rank_type-like", script: "gen.js"},



    ]);
}