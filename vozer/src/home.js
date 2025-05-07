load('config.js');
function execute() {
    return Response.success([
            { title: "Nổi bật", input: BASE_URL + "/", script: "gen.js" },
            { title: "Hoàn thành", input: BASE_URL + "/hoan-thanh", script: "gen.js" },
            { title: "Yêu thích", input: BASE_URL + "/yeu-thich", script: "gen.js" },
            { title: "Xem nhiều", input: BASE_URL + "/xem-nhieu", script: "gen.js" },
            { title: "Mới nhất", input: BASE_URL + "/moi-nhat", script: "gen.js" },
    
    ]);
}