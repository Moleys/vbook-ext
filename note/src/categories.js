load('config.js');

// Bài viết theo danh mục chính thức của note.com (小説, マンガ, テクノロジー, ビジネス…).
// `input` là đường dẫn danh mục ("/categories/novel", "topic/business"), tên tiếng Nhật,
// mã engName ("novel") hoặc endpoint API đầy đủ.
function execute(input, page) {
    return categoryList(input, page);
}
