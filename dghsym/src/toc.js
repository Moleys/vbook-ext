function execute(url) {
	url = url.replace('m.dghsym.com', 'www.dghsym.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("ul#ul_all_chapters a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: "http://www.dghsym.com" + e.attr("href"),
                host: "http://www.dghsym.com"
            })
        }
        return Response.success(data);
    }
    return null;
}