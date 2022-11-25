function execute(key, page) {
    if (!page) page = '1';
    let response = fetch('https://botruyen.vip/page/' + page, {
        method: "GET",
        queries: {
            s : key,
        }
    });

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
                    detail: e.select("div.chap").first().text(),
                    cover: coverImg,
                    host: "https://botruyen.vip"
                });     
            }
        });


        return Response.success(data, next.toString());
    }
    return null;
}