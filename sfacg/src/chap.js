function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#ChapterBody").html();
        if(url.includes("/vip/"))
            htm = "Extension hiện không hỗ trợ đọc chương VIP"
        return Response.success(htm);
    }
    return null;
}