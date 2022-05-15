function execute(url, page) {
    if (!page) page = '1';
	url = url.replace('m.mozhua6.com', 'www.mozhua6.com');
    let response = fetch(url+"&page="+page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("a:contains(下一页)").first().attr("href").split("page=")[1]
		doc.select("#threadlist tbody").forEach(e => {
            if(e.select("e[id]:contains(normalthread)"))
            {
                let linka = e.select("a").first().attr("href")
                if(linka.includes("forum.php?mod=viewthread") && linka!=="//www.mozhua6.com/forum.php?mod=viewthread&tid=118723&extra=page%3D1"){

                    // console.log(e.select("a").first())
                    data.push({
                        name: e.select(".s.xst").first().text(),
                        link: linka.replace("//www.mozhua6.com","https://www.mozhua6.com"),
                        description: e.select("em").last().text(),
                        host: "https://www.mozhua6.com"
                    })
                 }
            }


        });


        return Response.success(data,next)
    }
    return null;
}