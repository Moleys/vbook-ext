function execute(url) {
    let data  ="";
    let part1 = url.replace("https://w.linovelib.com", "").replace("http://w.linovelib.com", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        console.log(next)
        let response = fetch("https://w.linovelib.com" + next +".html");
        if (response.ok) {
            let doc = response.html();
            let name = doc.select("title").text()
            if(name.includes("(漫画)") || name.includes("（漫画）") ){
                let imgs = [];
                doc.select("#acontent img").forEach(e => imgs.push(e.attr("src")));
                return Response.success(imgs);
            }





            next = doc.select("link[rel=prerender]").attr("href").replace(".html","").replace("https://w.linovelib.com", "").replace("http://w.linovelib.com", "");
            let htm = doc.select("#acontent")
            htm.select(".cgo").remove()
            htm = htm.html();
            data = data + htm;
        } 
        else {
            break;
        }
    }
    if (data) {
        return Response.success(data);
    }
    return null;
}