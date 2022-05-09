function execute(key, page) {
    if(!page) page = '1';
    console.log("http://zxcs.me/?keyword=" + key + "&page="+page)
    let response = fetch("http://zxcs.me/?keyword=" + key + "&page="+page);

    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("#pagenavi span +a").first().text()
        console.log(next)
		doc.select("#pleft dl#plist").forEach(e => {
            let name = e.select("dt a").first().text()
            data.push({
                name: name.split("》")[0].replace("《",""),
                link: e.select("a").first().attr("href"),
                description: name.split("作者：")[1],
                host: "http://zxcs.me"
            })
        });


        return Response.success(data,next)
    }
    return null;
}