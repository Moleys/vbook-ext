function execute() {
    return Response.success([
        {title: "Truyện Nhiều Người Đọc", input:  "https://www.vietnovel.com/truyen-sang-tac-nhieu-nguoi-doc/", script: "gen.js"},
        {title: "Royal Ranking", input:  "https://www.vietnovel.com/royal-ranking/", script: "gen.js"},
        {title: "Truyện Mới Nhất", input:  "https://www.vietnovel.com/truyen-sang-tac-moi-nhat/", script: "gen.js"},
        {title: "Truyện Full", input:  "https://www.vietnovel.com/truyen-sang-tac-full/", script: "gen.js"},
        {title: "Truyện Chọn Lọc", input:  "https://www.vietnovel.com/truyen-sang-tac-chon-loc/", script: "gen.js"}
    ]);
}