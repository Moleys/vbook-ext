function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let name0  = doc.select("h1.article-title").text().trim();
        let name = name0;
        let author = "";
        if(name.includes("_")){
            author = name.split(/[_ ]+/).pop();
            name = name.replace("_"+author,"");
            if(author.includes("【")){
                author = author.split("【")[0];
            }
        }

        let description = doc.select("article.article-content p").get(1);
        if(description.html().includes("　　"))
            description = description.html().replace(/　　/g,"<br>")

        return Response.success({
            name: name,
            author: author,
            description: description,
            detail: "作者： " + author + "<br>" + doc.select(".meta time.muted").text(),
            host: "https://www.52shuku.vip"
        });
    }
    return null;
}