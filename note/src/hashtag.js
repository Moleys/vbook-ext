load('config.js');

// Danh sách bài viết theo hashtag. `input` là tên hashtag ("小説", "#小説") hoặc URL /tag/....
function execute(input, page) {
    return hashtagList(input, page);
}
