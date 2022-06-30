function execute(key, page) {
    if(!page) page = '1';
    let response = fetch('https://ebook.longmabook.com/searchlist.php?fixlangsnd=FsedAjjT6&fixlangact=edit&searchkeyword='+ key +'&searchmode=book&selbooktype=all&selbooktypeb=all&selsexytype=all&selages=all&selstylesa=all&selstylesb=all&selbookpoststats=all&searchkpage='+page);
    if (response.ok) {
        let doc = response.html();
        const data = [];
		let table = doc.select("table tr")
        // table.select("tr").first().remove()
        // console.log(table)
        table.forEach(e => {
            let name = e.select("a").first().text();
            if(name){
                    data.push({
                        name: e.select("a").first().text(),
                        link: "https://ebook.longmabook.com" + e.select("a").first().attr("href"),
                        description: "",
                        host: "https://ebook.longmabook.com"
                    })
                }
        });
        let next = parseInt(page,10)+1
        return Response.success(data,next);
    }
    return null;
}