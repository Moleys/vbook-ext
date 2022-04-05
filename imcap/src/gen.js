function execute(url, page) {
	url = url.replace('m.imcap.cn', 'www.imcap.cn');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];

        // if(url.slice(-1) === "imcap.cn"){
        //     let ele1 = doc.select("ul.odd").last()
        //     ele1.select("li").forEach(e => {
        //         data.push({
        //             name: e.select("a").first().text(),
        //             link: e.select("a").first().attr("href"),
        //             description: e.select("a.gray").first().text(),
        //             host: "http://www.imcap.cn"
        //         })
        //     });
        // }
        // else{
        let ele1 = doc.select("ul.flex").last()
        ele1.select("li").forEach(e => {

            data.push({
                name: e.select("h2").first().text(),
                link: e.select("a").first().attr("href"),
                cover: "http://www.imcap.cn/" + e.select("img").attr("data-original"),
                description: e.select("div.li_bottom").first().text(),
                host: "http://www.imcap.cn"
            })
        });
        

        return Response.success(data)
    }
    return null;
}