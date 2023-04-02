load('config.js');
function execute() {
    return Response.success([
        {title: "全部", input:  base_url + "/category/0/", script: "gen.js"}

    ]);
}