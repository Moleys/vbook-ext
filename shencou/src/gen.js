function execute(url, page) {
    if(!page) page = '1';
    let response = fetch("http://www.shencou.com/modules/article/toplist.php?sort=" + url + "&page=" +page);
    if (response.ok) {
        let doc = response.html('gbk');
        const data = [];
		let table = doc.select("#content table tbody div[style=width:382px;float:left;margin:3px 3px 3px 3px;]")
        table.forEach(e => {
            data.push({
                name: e.select("div[style=margin-top:2px;] b a").first().text(),
                link: e.select("a").first().attr("href"),
                cover: e.select("img").first().attr("src"),
                description: e.select("p:contains(著作作者：)").first().text().replace("著作作者：","").split("·来自")[0].trim(),
                host: "http://www.shencou.com"
            })
        });
        let next = doc.select("#pagelink a.next").attr("href").split("page=")[1]
        return Response.success(data, next)
    }
    return null;
}