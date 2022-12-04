function execute(url, page) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
    if(!page) page = '1';
    let response = fetch(url+"/page/" + page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		let ele1 = doc.select(".block-content ul.list-group").first().select("div.col-md-4");
        //get next
        let ele2 = doc.select(".pagination li");
        ele2.select("li a").last().remove();
        let next = ele2.select('a').last().attr("href");
        next = next.split(/[/ ]+/).pop();
        //end next
        let ele3 = ele1.select(".media-left").first();

        ele1.forEach(e => {
            let name = e.select("div.media-left a").first().attr("title");
            let link = e.select("div.media-left a").first().attr("href");
            let coverImg = e.select("img.media-object").attr("src");
            let detail = e.select("p.text-muted small").first();
            let temp = detail.text().trim().split(" ")[0];
            detail = detail.text().replace(temp,"").trim();
            if(name !== null && name !== '') {
                data.push({
                    name: name,
                    link: link,
                    detail: detail,
                    cover: coverImg,
                    host: "https://botruyen.vip"
                });     
            }
        });


        return Response.success(data, next.toString());
    }
    return null;
}