function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img,"https://nftstorage.link")
    let response = fetch(url + "/toc.ncx");
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("navMap navPoint")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("text").first().text(),
                url: url +"/" + e.select("content").attr("src").replace("OEBPS/Text/",""),
                host: "https://nftstorage.link"
            })
        }
        return Response.success(data);
    }
    return null;
}