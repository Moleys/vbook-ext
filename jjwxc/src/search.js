function execute(key, page) {
    if (!page) page = '1';
    let response = fetch('http://www.jjwxc.net/search.php', {
        method: "GET",
        queries: {
            kw : key,
            t : 1,
            p : page
        }
    });

    if (response.ok) {
        let doc = response.html('gbk');
        const data = [];
		let elePage = doc.select("#search_result div.page").first();
        let next = ''
        if(elePage.text().length>0){
            elePage.select("a").last().remove();
            next  = elePage.select("a").last().attr("href").split("p=")[1];
        }
		let eleSearch = doc.select("#search_result div");
        eleSearch.forEach(e => {
            let name = e.select("h3.title").first().text();
            let author = e.select(".info a").first().text();
            let link = e.select("h3.title a").first().attr("href")
            if(name !== null && name !== '') {
                data.push({
                    name: name,
                    link: link,
                    detail: author,
                    host: "http://botruyen.com"
                });     
            }
        });


        return Response.success(data, next.toString());
    }
    return null;
}