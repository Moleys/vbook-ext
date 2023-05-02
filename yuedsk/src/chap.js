function execute(url) {
    url = url.replace('m.yuedsk.com', 'www.yuedsk.com');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#clickeye_content").html();
        htm = htm.replace(/\&nbsp;/g, "").replace("(阅读库www.yuedsk.com)(阅读库 www.yuedsk.com)","").replace("阅读库 www.yuedsk.comyuedsk www.yuedsk.com","");
        return Response.success(htm);
    }
    return null;
}