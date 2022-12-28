function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img,"https://www.qiuxiaoshuo.com");
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#txtContent").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}