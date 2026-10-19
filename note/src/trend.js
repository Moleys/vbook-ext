load('config.js');

// Bài viết đang lên xu hướng trên note.com (trang /trend, chỉ một trang).
function execute(input, page) {
    return trendList(input, page);
}
