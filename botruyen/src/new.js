function execute(url, page) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
    if(!page) page = '1';
    let response = fetch(url+"/page/" + page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		let ele1 = doc.select(".block-content").first().select("ul.list-group li");
        let ele2 = doc.select(".pagination li");
        ele2.select("li a").last().remove();
        let next = ele2.select('a').last().attr("href");
        next = next.split(/[/ ]+/).pop();

        ele1.forEach(e => {
            let name = e.select("h2.title a").first().text();
            if(name !== null && name !== '') {
            let coverImg = e.select("img.img-responsive").attr("src");
                data.push({
                    name: name,
                    link: e.select("h2.title a").first().attr("href"),
                    cover: coverImg,
                    detail: e.select("div.chap").first().text(),
                    host: "https://botruyen.vip"
                });     
            }
        });


        return Response.success(data, next.toString());
    }
    return null;
}