function execute() {
    return Response.success([
        {title: "玄幻", input:  BASE_URL+"/h5/category-rank-category_id-1", script: "gen2.js"},
        {title: "武侠", input:  BASE_URL+"/h5/category-rank-category_id-2", script: "gen2.js"},
        {title: "都市", input:  BASE_URL+"/h5/category-rank-category_id-3", script: "gen2.js"},
        {title: "历史", input:  BASE_URL+"/h5/category-rank-category_id-4", script: "gen2.js"},
        {title: "科幻", input:  BASE_URL+"/h5/category-rank-category_id-5", script: "gen2.js"},
        {title: "网游", input:  BASE_URL+"/h5/category-rank-category_id-6", script: "gen2.js"},
        {title: "女生", input:  BASE_URL+"/h5/category-rank-category_id-7", script: "gen2.js"},
        {title: "同人", input:  BASE_URL+"/h5/category-rank-category_id-66", script: "gen2.js"},
    ]);
}