function execute(url) {
    let host = "https://" + url.replace("https://","").split("/")[0]
    console.log(host)
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        info = doc.select("div[uk-grid]").get(1).select(".uk-card.uk-card-default").get(0)
        info.select("div[id]").remove()
        info.select("div[class]").remove()
        info.select("div").last().remove()
        let name = info.select("h4").first().text()
        let ongoing = info.select("span.uk-label").text()
        let tags = info.select("font[color=#800080]").text()
        info = info.html().split("<textarea id")[0].split("<\/font>").pop();
        let author = doc.select("div.uk-panel h4:contains(作家：)").first().select("a").text()
        
        return Response.success({
            name: name,
            author: author,
            description: info,
            detail: "作者： " + author + "<br>" + tags,
            ongoing: ongoing.indexOf("完結") === -1,
            host: host
        });
    }
    return null;
}