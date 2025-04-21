function execute(url, page) {
    if (!page) page = '1'

    let response = fetch("https://www.pixiv.net/ajax/search/novels/"+url+"?word="+url+"C&order=date_d&mode=all&p="+page+"&csw=0&s_mode=s_tag_full&gs=0&lang=en");
    if (response.ok) {
        let doc = response.json();
        const data = [];
		doc.body.novel.data.forEach(e => {


            data.push({
                name: e.title,
                link: "https://www.pixiv.net/novel/show.php?id="+e.id,
                description: e.userName,
                cover: e.url,
                host: "https://www.pixiv.net"
            })
        });


        let nextPage = (parseInt(page, 10) + 1).toString();
        return Response.success(data, nextPage);
    }
    return null;
}