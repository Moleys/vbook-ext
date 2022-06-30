function execute(url, page) {
	url = url.replace('m.wdbqg.com', 'www.wdbqg.com');
    if(url.slice(-1) !== "/")
        url = url + "/";
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
		table =  doc.select("#ranking table td")
        author_list = table.select("font[color=#008080]")
        book_list = table.select("a[href*=bookid]")
        const data = [];
        for (let i = 0;i < book_list.size(); i++) {
            var ee = book_list.get(i);
            var ff = author_list.get(i);
            data.push({
                name: ee.select("a").text(),
                link: 'https://ebook.longmabook.com'+ee.attr("href"),
                description: ff.text(),
                host: "https://ebook.longmabook.com"
            })
        }
        return Response.success(data);
    }
    return null;
}