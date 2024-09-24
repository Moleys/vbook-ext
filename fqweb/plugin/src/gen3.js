load('config.js');
function execute(url, page) {
    if (!page) page = 1
    let newurl = `https://novel.snssdk.com/api/novel/channel/homepage/new_category/book_list/v1/?parent_enterfrom=novel_channel_category.tab.&aid=1967&offset=${(page-1)*100}&limit=100${url}`
    console.log(newurl)
    let response = fetch(newurl);

    if (response.ok) {
        let doc = response.json();
        let rows = doc.data.data
        const data = [];
        rows.forEach(e => {
            data.push({
                name: e.book_name,
                link: config_host + "/page/" + e.book_id,
                cover: e.thumb_url,
                description: e.author,
                host: config_host
            })
        });
        let next = parseInt(page, 10) + 1
        return Response.success(data, next.toString());
    }
    return null;

}