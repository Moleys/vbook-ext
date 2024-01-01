load('config.js');

function execute(url, page) {
    if (page) {
        let response = fetch(url + '?page=' + page);
        if (response) {
            let json = response.json();
            let currentPage = json.result.page;
            let totalPage = json.result.totalPage;
            let data = [];
            json.result.list.forEach(item => {
                data.push({
                    name: item.name,
                    link: BASE_URL + item.url,
                    cover: item.icon,
                    description: item.author,
                    host: BASE_URL
                })
            });
            if (currentPage < totalPage) {
                return Response.success(data, (currentPage + 1) + "");
            } else {
                return Response.success(data);
            }
        }
    } else {
        let response = fetch(url);
        if (response.ok) {
            let doc = response.html();
            let data = [];
            doc.select(".books-list li").forEach(e => {
                data.push({
                    name: e.select("h3").last().text(),
                    link: BASE_URL + e.select("a").first().attr("href"),
                    cover: e.select("a img").attr("src"),
                    description: e.select(".type span").first().text(),
                    host: BASE_URL
                })
            });
            return Response.success(data, "2");
        }
    }
    return null;
}
