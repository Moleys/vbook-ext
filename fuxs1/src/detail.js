function execute(url) {
    url = url.replace('m.fuxsb.com', 'www.fuxsb.com').replace('m.fuxsb.cc', 'www.fuxsb.com').replace('www.fuxsb.com', 'www.fuxsb.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let name  = doc.select("h1").text().trim();
        let author =  doc.select(".atts strong a").first().text().replace(/作\s*者：/g, "");
        // let cover  =  "";
        // let response1 = fetch("https://api.yousuu.com/api/search/?type=title&value="+name);
        // console.log("https://api.yousuu.com/api/search/?type=title&value="+name)
        // if (response1.ok) {
        //     let json = response1.json();
        //     if(json.data.total>0)
        //         cover = "https://images.weserv.nl/?url=" + json.data.books[0].cover +"&output=jpg&w=100";
        // }

        return Response.success({
            name: name,
            // cover: cover,
            author: author,
            description: "",
            detail: doc.select("div.atts").html(),
            host: "http://www.fuxsb.com"
        });
    }
    return null;
}