load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    if(url == (BASE_URL + "/error"))
    {
        return Response.success("Bạn chưa mua chương này, vui lòng mua chương, sau đó vào THÔNG TIN TRUYỆN tải lại mục lục để có thể đọc.");
    }





    let url1 = url.replace("/articles/","/articlescontent/")
    let response = fetch(url1, {
                    headers: {
                        'Accept': 'text/html, */*; q=0.01',
                        'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
                        'Connection': 'keep-alive',
                        'DNT': '1',
                        'Referer': url
                    }
                    });
    if (response.ok) {
        let doc = response.html();
        doc.select("blockquote").remove()
        doc.select("h1").remove()

        let content = doc.html()
        return Response.success(content);
    }
    return null;
}
