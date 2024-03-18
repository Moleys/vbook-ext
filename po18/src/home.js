function execute() {
    return Response.success([
        {title: "編輯推薦", script: "gen2.js", input: "https://www.po18.tw"},
        {title: "找書看", script: "gen1.js", input: "https://www.po18.tw/findbooks/index"},
    ]);
}
