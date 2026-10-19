load('config.js');

function execute() {
    return Response.success([
        { title: "Mới nhất", input: "", script: "latest.js" },
        { title: "Mới đăng", input: "", script: "created.js" },
        { title: "Phổ biến", input: "", script: "popular.js" },
        { title: "Đánh giá cao", input: "", script: "rating.js" },
        { title: "Tải nhiều", input: "", script: "dl.js" },
    ]);
}
