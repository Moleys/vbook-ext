function execute(url, page) {
    if(!page) page = '1';
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url +"page/"+ page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("#pagenavi span +a").first().text()

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