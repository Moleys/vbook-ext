function execute(url) {
    url = url.replace('m.yyun.net', 'www.yyun.net');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        doc.select(".k").remove();
        doc.select(".kk").remove();
        let htm = doc.select("#content").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}