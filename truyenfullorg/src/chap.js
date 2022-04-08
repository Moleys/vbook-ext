function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        doc.select("noscript").remove();
        doc.select("script").remove();
        doc.select("iframe").remove();
        doc.select("div.ads-responsive").remove();
        doc.select("[style=font-size.0px;]").remove();
        doc.select("a").remove();
        var txt = doc.select("div.chapter-c")
        txt.select("p").last().remove();
        txt = txt.html().replace("<em>.*?Chương này có nội dung ảnh.*?</em>", "</?em>");
        return Response.success(txt);
    }
    return null;
}