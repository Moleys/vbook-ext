load('config.js');

function execute() {
    var cats = [
        { name: "Mới cập nhật", slug: "vi/new" },
        { name: "Phát hành mới", slug: "vi/release" },
        { name: "Không che (Rò rỉ)", slug: "vi/uncensored-leak" },
        { name: "FC2", slug: "vi/fc2" },
        { name: "HEYZO", slug: "vi/heyzo" },
        { name: "Tokyo Hot", slug: "vi/tokyohot" },
        { name: "1pondo", slug: "vi/1pondo" },
        { name: "Caribbeancom", slug: "vi/caribbeancom" },
        { name: "10musume", slug: "vi/10musume" },
        { name: "Pacopacomama", slug: "vi/pacopacomama" },
        { name: "Hot Hôm Nay", slug: "vi/today-hot" },
        { name: "Hot Trong Tuần", slug: "vi/weekly-hot" },
        { name: "Hot Trong Tháng", slug: "vi/monthly-hot" },
        { name: "Phụ đề Anh", slug: "vi/english-subtitle" },
        { name: "Phụ đề Trung", slug: "vi/chinese-subtitle" }
    ];

    var list = [];
    for (var i = 0; i < cats.length; i++) {
        list.push({
            title: cats[i].name,
            input: BASE_URL + "/" + cats[i].slug,
            script: "gen.js"
        });
    }
    return Response.success(list);
}
