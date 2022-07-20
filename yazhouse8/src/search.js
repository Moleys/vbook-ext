

function execute(key, page) {
    let response = ""
    if(!page){
        response = fetch("https://yazhouse8.com/keyword.php", {
            method: "POST",
            body: {
                keyword: key
            }
        });
    }
    else{
        response = fetch("https://yazhouse8.com/" + page)
    }

    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("div.articleList p").forEach(e => {
            data.push({
                name: e.select("a").first().text(),
                link: "https://yazhouse8.com/" + e.select("a").first().attr("href"),
                description: "",
                host: "https://yazhouse8.com"
            })
        });
        let next = doc.select("nav ul.pager li a").last().attr("href");
        return Response.success(data, next)
    }
    return null;
}