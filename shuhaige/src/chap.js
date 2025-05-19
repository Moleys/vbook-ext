
load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    let response = fetch(url);
    if (response.ok) {
        let doc;
        let nextPart = url;
        let content = '';
        do {
            console.log(nextPart)
            doc = fetch(nextPart).html();
            nextPart = BASE_URL + doc.select("a:contains(下一页)").first().attr("href")
            content += doc.select("#content").html();
        } while (nextPart != BASE_URL)

        return Response.success(cleanHtml(content));
    }
    return null;
}

//clear rác
function cleanHtml(content) {
    return content
        .replace(/(<br>\s*){2,}/g, '<br>')
        .replace(/<a[^>]*>([^<]+)<\/a>/g, '')
        .replace(/&(nbsp|amp|quot|lt|gt);/g, "")
        .replace(/<!--(<br \/>)?[^>]*-->/gm, '')
        .replace(/\&nbsp;/g, "")
        .replace(/<p>\s*喜欢[\s\S]*?小说网更新速度全网最快。\s*<\/p>/g,'')
        .replace(/这章没有结束，请点击下一页继续阅读！\s*/g, '')
        .replace(/<p>\s*小主，这个章节后面还有哦，请点击下一页继续阅读，后面更精彩！\s*<\/p>/g,'')
        .replace(/<p>\s*本小章还未完，请点击下一页继续阅读后面精彩内容！\s*<\/p>/g,'');
}
