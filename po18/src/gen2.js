load('config.js');
function execute(url, page) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
    if (response.ok) {
        let data = [];
        let doc = response.html();
        let el = doc.select(".editor_recom .book.swiper-slide")
        el.forEach(e => {
            data.push({
                name: e.select(".book_name").text(),
                link: e.select(".book_name a").attr("href"),
                cover: e.select(".book_cover a img").attr("src"),
                description: e.select(".book_author").text(),
                host: BASE_URL
            });
        });

        if(data.length > 0)
        {
            return Response.success(data);
        }
        return Response.error("Bạn phải xác minh trên 18 tuổi/đăng nhập ở website này để có thể đọc.");
    }
    return null;
}