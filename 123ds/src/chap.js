function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("div#DivContentBG");
        htm.select("div.DivCurrentPos").remove()
        htm.select("script").remove()
        htm.select("h1").remove()
        htm.select("hr").remove()
        htm.select("center").remove()
        htm.select("select").remove()
        htm.select('meta[property="text-align:center"]')
        console.log(htm)

        htm = htm.html().replace(/\&nbsp;/g, "").replace(/\&emsp;/g, "");
        return Response.success(htm);
    }
    return null;
}