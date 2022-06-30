function execute(url) {
    let book_id = "";
    let b_id = "";
    if(url.includes("m.shencou.com")){
        book_id = url.split("aid=")[1];
        b_id = parseInt((book_id/1000),10)
    }
    if(url.includes("www.shencou.com")){
        book_id = url.match(/books\/read_(\d+).html/)[1];
        b_id = parseInt((book_id/1000),10)
    }
    console.log(book_id)
    let response = fetch("http://www.shencou.com/read/" + b_id + "/" + book_id +"/index.html");
    if (response.ok) {
        let doc = response.html('gbk');
        let el = doc.select("div.box ol li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            let chapter_id = e.attr("href").replace(".html","");
            data.push({
                name: e.select("a").text(),
                url: "http://m.shencou.com/chapter.php?aid="+ book_id +"&cid=" + chapter_id,
                host: "http://www.shencou.com"
            })
        }
        return Response.success(data);
    }
    return null;
}