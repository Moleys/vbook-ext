function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let total =doc.select("#pageNum a").first().text().replace("共","").replace("张","")
        console.log(total)
        var image = doc.select("img#bigImg").attr("src").trim();
        let imgs  = []
        imgs.push(image);

        if(total>1){
            for (var i = 2; i <= total; i++) {
                let url1 = url.replace(".html","") +"_" + i + ".html"
                console.log(url1)
                let response1 = fetch(url1);
                if (response1.ok) {
                    let doc1 = response1.html();
                    var image = doc1.select("img#bigImg").attr("src").trim();
                    imgs.push(image);
                }
            }
        }
        return Response.success(imgs);
    }
    return null;
}