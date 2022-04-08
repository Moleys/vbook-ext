function execute(url) {
    url = url.replace('m.soshuw.com', 'www.soshuw.com');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select(".content");
        htm.select("p").remove();
        htm = htm.html();
        htm = htm.replace(/\&nbsp;/g, "");
        let temp = htm.split(/<br ?\/?>/g)[0]
        htm = htm.replace(temp,"")
        return Response.success(htm);
    }
    return null;
}