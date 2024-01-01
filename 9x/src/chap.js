function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("section")
        htm.select("h4").remove()
        htm.select(".foot_nav").remove()
        htm.select("h4").remove()
        htm.select("p[style=text-align: center;color: #555;font-size: 16px;]").remove()
        htm.select("p[style=min-height:60px]").remove()

        return Response.success(htm.html());
    }
    return null;
}