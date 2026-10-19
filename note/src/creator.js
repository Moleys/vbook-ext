load('config.js');

// Danh sách bài viết (hoặc tạp chí) của một tác giả.
// `input` là urlname / URL tác giả, hoặc "magazines:<urlname>" để liệt kê tạp chí.
function execute(input, page) {
    return creatorList(input, page);
}
