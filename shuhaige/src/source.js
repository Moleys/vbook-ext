load("config.js");

function execute(url, page) {
    if (!page) page = '1';
    
    // Xử lý URL dựa trên định dạng của trang web
    let response;
    if (url.includes("/shuku/")) {
        // Định dạng URL cho trang sách
        let baseUrl = url.replace(/\/\d+\.html$/, "");
        if (baseUrl.endsWith("/shuku/")) {
            response = fetch(baseUrl + "0_0_0_" + page + ".html");
        } else {
            let urlParts = url.split('/');
            let lastPart = urlParts[urlParts.length - 1];
            let pattern = lastPart.replace(/\d+\.html$/, page + ".html");
            urlParts[urlParts.length - 1] = pattern;
            response = fetch(urlParts.join('/'));
        }
    } else {
        response = fetch(url + (url.includes("?") ? "&" : "?") + "page=" + page);
    }
    
    if (response.ok) {
        let doc = response.html();
        
        // Tìm thẻ <a> có text là "下一页" trong pagelist
        let next = "";
        doc.select("div.pagelist a").forEach(a => {
            if (a.text().trim() === "下一页") {
                let href = a.attr("href");
                let m = href.match(/_(\d+)\.html$/);
                next = m ? m[1] : "";
            }
        });

        let books = [];
        doc.select("ul.list li").forEach(e => {
            try {
                let bookNameAnchor = e.select("p.bookname > a");
                if (bookNameAnchor.size() === 0) return; 
                
                let name = bookNameAnchor.text();
                let link = bookNameAnchor.attr("href");
                
                // Xử lý ảnh bìa
                let imgElem = e.select("li > a > img");
                let imgSrc = "";
                if (imgElem.size() > 0) {
                    imgSrc = imgElem.attr("src") || "";
                }
                let cover = imgSrc.startsWith("http") ? imgSrc : BASE_URL + imgSrc;
                
                // Thông tin tác giả
                let author = e.select("p.data > a.layui-btn-xs.layui-bg-cyan").text();
                
                // Thông tin thể loại và trạng thái
                let genreSpans = e.select("p.data > span.layui-btn-xs.layui-btn-radius");
                let genre = genreSpans.size() > 0 ? genreSpans.first().text() : "";
                let status = genreSpans.size() > 1 ? genreSpans.last().text() : "";
                
                // Thông tin giới thiệu và chương mới
                let intro = e.select("p.intro").text();
                let latestChap = e.select("p.data:last-child > a").text();

                books.push({
                    name: name,
                    link: link,
                    cover: cover,
                    description: intro,
                    host: BASE_URL,
                    author: author,
                    genre: genre,
                    status: status === "完结" ? "Completed" : "Ongoing",
                    detail: latestChap
                });
            } catch (error) {
                console.log("Error processing book item: " + error);
            }
        });

        return Response.success(books, next);
    }
    return null;
}