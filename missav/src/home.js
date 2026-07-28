load('config.js');

function execute() {
    return Response.success([
        { title: "Hot Hôm Nay", input: BASE_URL + "/vi/today-hot", script: "gen.js" },
        { title: "Hot Trong Tuần", input: BASE_URL + "/vi/weekly-hot", script: "gen.js" },
        { title: "Hot Trong Tháng", input: BASE_URL + "/vi/monthly-hot", script: "gen.js" },
        { title: "Không Che (Rò Rỉ)", input: BASE_URL + "/vi/uncensored-leak", script: "gen.js" },
        { title: "Mới Cập Nhật", input: BASE_URL + "/vi/release", script: "gen.js" }
    ]);
}
