load('config.js');

var EXPLORE_TAGS = ["小説", "エッセイ", "ビジネス", "AI", "マンガ", "テクノロジー"];

function execute() {
    let sections = [];

    // Hàng chip danh mục chính thức — bấm vào mở danh sách bài của danh mục đó.
    let categories = noteCategoryList();
    let categoryItems = [];
    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        categoryItems.push({
            name: String(category.name || ""),
            action: {
                type: "list",
                name: String(category.name || ""),
                script: "categories.js",
                input: categoryInput(category)
            }
        });
    }
    if (categoryItems.length) {
        sections.push({
            id: "categories",
            title: "カテゴリー",
            subtitle: "note.com 公式カテゴリ",
            type: "chip",
            items: categoryItems
        });
    }

    // Hàng "急上昇" — lấy từ API /api/v3/notes/top_articles (ổn định, không phụ thuộc
    // biến thể HTML mà app nhận được từ trang /trend).
    let topItems = topArticleItems("1");
    if (topItems.length) {
        sections.push({
            id: "top",
            title: "急上昇",
            subtitle: "note.com 注目の記事",
            type: "horizontal_list",
            items: topItems,
            more: { type: "list", name: "急上昇", script: "trend.js", input: "" }
        });
    }

    for (let t = 0; t < EXPLORE_TAGS.length; t++) {
        let tag = EXPLORE_TAGS[t];
        let api = apiGet("/api/v3/hashtags/" + encodeURIComponent(tag) + "/notes?page=1");
        if (!api.ok || !api.data || !api.data.data) continue;
        let notes = api.data.data.notes || [];
        let items = [];
        for (let j = 0; j < notes.length && j < 12; j++) {
            let item = noteItem(notes[j]);
            if (item && item.name !== "") items.push(item);
        }
        if (!items.length) continue;
        sections.push({
            id: "tag_" + t,
            title: "#" + tag,
            subtitle: "人気の記事",
            type: "grid",
            items: items,
            more: { type: "list", name: "#" + tag, script: "hashtag.js", input: tag }
        });
    }

    if (!sections.length) return Response.error("note.com: không tải được trang khám phá");
    return Response.success(sections);
}
