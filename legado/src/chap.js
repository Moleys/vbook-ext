load('config.js');

function execute(url) {
    
    const bookUrl = getBookUrl(url);



    if(url.includes("&type=comic")) {
        let url_chap = url.split("/getBookContent")[1]
        let response_chapter_info = fetch(config_host + "/getBookContent" + url_chap)
        if (response_chapter_info.ok) {
            let json = response_chapter_info.json();
            let data = []
            let html = Html.parse(json.data).select("img").forEach(e => {
                data.push(e.attr("src"))
            })
            return Response.success(data);
        }
        return Response.error("Kiểm tra lại Web service Legado");
    }
    else {
        let url_chap = url.split("/getBookContent")[1]
        let response_chapter_info = fetch(config_host + "/getBookContent" + url_chap)
        if (response_chapter_info.ok) {
            let json = response_chapter_info.json();
            let chapter_info = json.data.replace(/<br\s*\/?>|\n/g, "<br><br>");
            chapter_info = replaceImageLinks(chapter_info, bookUrl);

            return Response.success(chapter_info);
        }
        return Response.error("Kiểm tra lại Web service Legado");
    }
}

// Tách thủ công giá trị của tham số "url="
function getBookUrl(fullUrl) {
    const match = fullUrl.match(/[?&]url=([^&]+)/);
    return match ? match[1] : "";
}

// Hàm thay ảnh
function replaceImageLinks(html, bookUrl) {
    const baseImageUrl = "http://localhost:1122/image";
    const width = 800;
    return html.replace(/<img\s+src="([^"]+)"\s*\/?>/g, (match, imgPath) => {
        const encodedPath = encodeURIComponent(imgPath);
        const fullImageUrl = `${baseImageUrl}?path=${encodedPath}&url=${bookUrl}&width=${width}`;
        return `<img src="${fullImageUrl}">`;
    });
}
