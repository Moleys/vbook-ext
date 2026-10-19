load('config.js');

var GENRE_TAGS = [
    "小説", "エッセイ", "ビジネス", "マンガ", "AI", "テクノロジー", "プログラミング",
    "マーケティング", "デザイン", "映画", "音楽", "アニメ", "ゲーム", "読書", "詩",
    "短歌", "俳句", "旅行", "料理", "健康", "スポーツ", "育児", "投資", "学び",
    "仕事", "日記", "コラム", "写真", "note", "クリエイター"
];

function execute() {
    let genres = [];

    // Danh mục chính thức của note.com (lấy trực tiếp từ API, có bản dự phòng).
    let categories = noteCategoryList();
    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        genres.push({
            title: category.name,
            input: categoryInput(category),
            script: "categories.js"
        });
    }

    genres.push({ title: "急上昇（トレンド）", input: "", script: "trend.js" });
    for (let i = 0; i < GENRE_TAGS.length; i++) {
        genres.push({ title: "#" + GENRE_TAGS[i], input: GENRE_TAGS[i], script: "hashtag.js" });
    }
    return Response.success(genres);
}
