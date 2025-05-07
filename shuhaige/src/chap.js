
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
            content += doc.select("#content").html().replace("喜欢红楼之庶子风流请大家收藏：(www.shuhaige.net)红楼之庶子风流书海阁小说网更新速度全网最快。", "");
        } while (nextPart != BASE_URL)

        return Response.success(content);
    }
    return null;
}
