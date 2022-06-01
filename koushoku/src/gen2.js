function execute(url, page) {
    if(!page) page = '1';
    let response = fetch(url+"?page="+page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
        let next = doc.select("nav.pagination ul li a.next").attr("href").replace("?page=","");
		doc.select(".entries div.entry").forEach(e => {
            data.push({ 
                    title: e.select("strong.name").text() + " (" + e.select("span.count").text() +")", 
                    input: "https://koushoku.org" + e.select("a").first().attr("href"),
                    script: "gen.js" 
                })
        });

        return Response.success(data,next);
    }
    return null;
}