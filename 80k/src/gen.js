function execute(url, page) {
	url = url.replace('m.80k.net', 'www.80k.net');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select(".update-book ul.book-list li").forEach(e => {
            data.push({
                name: e.select("a.book-title").first().text(),
                link: e.select("a.book-title").first().attr("href"),
                description: e.select("a.book-chapter").first().text(),
                host: "http://www.80k.net"
            })
        });


        return Response.success(data)
    }
    return null;
}