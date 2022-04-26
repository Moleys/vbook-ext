function execute(url) {
    url = url.replace("m.kenshuzw.com", "www.kenshuzw.com");
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url+ "0/");
    if (response.ok) {
        let doc = response.html();
        let chapList = [];
        doc.select(".chapter-list a").forEach(e => {
            chapList.push({
                name: e.text(),
                url: e.attr("href"),
                host: "https://www.kenshuzw.com"
            })
        });
        return Response.success(chapList);
    }
    return null;
}