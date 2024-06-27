load('config.js');
function execute() {
    return Response.success([
        {title: "Truyện tranh mới ", input: "1", script: "gen.js"},
    ]);
}