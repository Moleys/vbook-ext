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
        let cover  =  "";
        let response1 = fetch("https://api.yousuu.com/api/search/?type=title&value="+name);
        console.log("https://api.yousuu.com/api/search/?type=title&value="+name)
        if (response1.ok) {
            let json = response1.json();
            if(json.data.total>0)
                cover = "https://images.weserv.nl/?url=" + json.data.books[0].cover +"&output=jpg&w=300";
        }

        let description = doc.select("article.article-content p").get(1);
        if(description.html().includes("　　"))
            description = description.html().replace(/　　/g,"<br>")

        return Response.success({
            name: name,
            cover: cover,
            author: author,
            description: description,
            detail: "作者： " + author + "<br>" + doc.select(".meta time.muted").text(),
            host: "https://www.52shuku.vip"
        });
    }
    return null;
}