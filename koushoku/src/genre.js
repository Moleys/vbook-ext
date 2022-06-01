function execute(url, page) {
    let response = fetch("https://koushoku.org/tags");
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

        return Response.success(data);
    }
    return null;
}