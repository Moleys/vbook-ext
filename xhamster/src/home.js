load('config.js');

function execute() {
    return Response.success([
        { title: "Việt Nam", input: BASE_URL + "/categories/vietnamese", script: "gen.js" },
        { title: "Không Che", input: BASE_URL + "/categories/uncensored", script: "gen.js" },
        { title: "Hay Trong Tuần", input: BASE_URL + "/best/weekly", script: "gen.js" },
        { title: "Hàng Mới", input: BASE_URL + "/newest", script: "gen.js" }
    ]);
}
