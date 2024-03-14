load('config.js');

function execute() {
    return Response.success([
        {title: "言情小说", input:  BASE_URL+"/yanqing/", script: "gen.js"},

    ]);
}