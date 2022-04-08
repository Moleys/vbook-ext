function execute(url, page) {
	url = url.replace('m.ijjxs.com', 'www.ijjxs.com');

    if(url.slice(-1) === "/")
        url = url.slice(0, -1)

    if(url.indexOf("/index_") !== -1){
        var temp = url.split("/index");
        url = temp[0];
    }
    if(!page) page = '1';
    url = url +"/index_" +  page +".html";
    console.log(url)

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select('.pager a').last().remove();

        let next = doc.select('.pager a').last().attr("href").split("_")[1].replace(".html","");

		doc.select("#catalog .listbg").forEach(e => {
            let coverImg = e.select("a.img img").attr("src");

        if (coverImg.startsWith("//")) {
            coverImg = "https:" + coverImg;
        }
            data.push({
                name: e.select(".title a").first().text(),
                cover: coverImg,
                link: e.select(".title a").first().attr("href"),
                description: e.select(".newDate").first().text(),
                host: "http://www.ijjxs.com"
            })
        });


        return Response.success(data, next.toString());
    }
    return null;
}