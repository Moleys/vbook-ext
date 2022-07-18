function execute(url) {
    url = url.replace('m.novel543.com', 'www.novel543.com');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        doc.select("script").remove();
        doc.select(".adsbygoogle").remove();


        let htm = doc.select("#text-content").html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}