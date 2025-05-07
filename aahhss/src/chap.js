function execute(url) {

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        doc.select("script").remove();
        doc.select(".bottem2").remove();
        let htm = doc.select("#content").html();
        htm = cleanHtml(htm);
        return Response.success(htm);
    }
    return null;
}
//clear rác
function cleanHtml(htm) {
    htm = htm.replace(/(<br>\s*){2,}/g, '<br>');
    htm = htm.replace(/<a[^>]*>([^<]+)<\/a>/g, '');
    htm = htm.replace(/&(nbsp|amp|quot|lt|gt);/g, "");
    htm = htm.replace(/<!--(<br \/>)?[^>]*-->/gm, '');
    htm = htm.replace(/\&nbsp;/g, "");
    htm = htm.replace(/喜欢我有一百个分身请大家收藏：\(www\.soxscc\.net\)我有一百个分身搜小说更新速度全网最快。/g, '');
    return htm;
}