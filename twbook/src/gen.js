function execute(url, page) {
    if(!page) page = '1';
	url = url.replace('m.twbook.cc', 'www.twbook.cc');
    let response = fetch(`https://www.twbook.cc/${url}/?page=${page}`);
    if (response.ok) {
        let doc = response.html();
        let next = doc.select('ul.pagination-list').select('li.is-current + li').text();
        const data = [];
		doc.select(".list .row").forEach(e => {
            data.push({
                name: e.select("h3 a").text(),
                link: e.select("h3 a").attr("href"),
                cover: e.select("img").attr("src"),
                description: e.select(".author").text(),
                host: "http://www.twbook.cc"
            })
        });
        return Response.success(data, next)
    }
    return null;
}