load('config.js');
function execute(url, page) {
    if (!page) page = 1
    url = url.replace('{{page}}', page);
    let response = fetch(config_host2 + url);
    if (response.ok) {
        let doc = response.json();
        let rows = doc.data.data.book_info
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