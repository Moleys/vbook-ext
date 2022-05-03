function execute(url, page) {
	url = url.replace('m.twbook.cc', 'www.twbook.cc');
    if(!page) page = '1';
    let response = fetch(url+"&page="+page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("ul.library.layui-row li.layui-col-lg6").forEach(e => {
            data.push({
                name: e.select("a.bookname").first().text(),
                link: e.select("a.bookimg").first().attr("href"),
                cover: e.select("a.bookimg img").first().attr("src"),
                description: e.select("p").first().text().split("|")[0],
                host: "http://www.twbook.cc"
            })
        });
        let next = doc.select("ul.pagination li.next a").attr("href").split(/[= ]+/).pop();
        return Response.success(data,next)
    }
    return null;
}