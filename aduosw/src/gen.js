function execute() {
    let response = fetch("https://www.aduosw.com/");
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("ul.updatelist li").forEach(e => {
            data.push({
                name: e.select("a").first().text(),
                link: e.select("a").first().attr("href"),
                description:e.select("span.t").text(),
                host: "https://www.aduosw.com"
            })
        });
        return Response.success(data);   
    }
    return null;
}