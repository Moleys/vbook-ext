load('config.js');

function execute() {
    return Response.success([
        {title: "全网大热榜", input:  BASE_URL+"/h5/index-rank-rank_type-hot", script: "gen.js"},
        {title: "超人气精品", input:  BASE_URL+"/h5/index-rank-rank_type-fan", script: "gen.js"},
        {title: "猜你喜欢", input:  BASE_URL+"/h5/index-rank-rank_type-like", script: "gen.js"},



    ]);
}