// genre.js — fixed channels from the HGhub client (Category.tsx).
load('config.js');
function execute() {
    var channels = [
        { cate: "ai-duanju", name: "AI Ngắn kịch" },
        { cate: "ai-manju", name: "AI Manga kịch" },
        { cate: "ai-huanlian", name: "AI Ghép mặt" },
        { cate: "ai-mogai", name: "AI Biến tấu" }
    ];
    return Response.success(channels.map(function (c) {
        return { title: c.name, input: "cate:" + c.cate, script: "search.js" };
    }));
}
