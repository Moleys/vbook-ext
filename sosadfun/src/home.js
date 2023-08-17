load('config.js');
function execute() {
    return Response.success([
        {title: "全部", input:  BASE_URL+"/category/0/", script: "gen.js"}

    ]);
}