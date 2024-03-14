load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        doc.select("#lineCorrect").remove();
        doc.select("span").remove();
        doc.select("p").last().remove();
        let htm = doc.select(".article-content p")
        let content = ""
        htm.forEach(e => {
            content = content + e.text() + "<br>"
        })
        content = content.replace("Tips：如果觉得52书库不错，记得收藏网址 www.52shuku.vip 或推荐给朋友哦~拜托啦",'');
        return Response.success(content);
    }
    return null;
}

function cleanHtml(html) {

    // replace p tags with empty string
    html = html.replace(/<\/?p>/g, "");
    // replace a tags with empty string
    html = html.replace(/<a[^>]*>([^<]+)<\/a>/g, '');
    // replace new line characters with br tags
    html = html.replace(/\n/g, '<br>');
    // remove duplicate br tags
    html = html.replace(/(<br>\s*){2,}/gm, '<br>');
    // strip html comments
    html = html.replace(/<!--[^>]*-->/gm, '');
    // html decode
    html = html.replace(/&(nbsp|amp|quot|lt|gt);/g, "");
    // trim br tags
    html = html.replace(/(^(\s*<br>\s*)+|(<br>\s*)+$)/gm, '');
    return html.trim();
}