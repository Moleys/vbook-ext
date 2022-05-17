function execute(url, page) {
    if(!page) page='1'
    let response = fetch(url+"&page="+page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("ul.pagination li a[rel=\"next\"]").attr("href").split("page=")[1]
        
        console.log(next)
		doc.select("div.container div.media").forEach(e => {
            data.push({
                name: e.select("h4.media-title").first().text(),
                link: e.select("a").first().attr("href"),
                cover: e.select("img").first().attr("src"),

                description: e.select("span.label.label-primary").first().text(),
                host: "https://lnmtl.com"
            })
        });


        return Response.success(data,next)
    }
    return null;
}