load('config.js');

function execute(url) {
     url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if(url.slice(-1) !== "/")
        url = url + "/"
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select('.cover img').attr('src');
        let title = doc.select('.title').text();
        let author = doc.select('.author').first().text();
        let category = doc.select('.iconf a').text();
        let updateTime = doc.select('.iconf:contains("更新")').text().replace('更新：', '');
        let introduction = doc.select('.intro').text();

        return Response.success({
            name: title,
            cover: coverImg,
            author: author,
            description: introduction,
            detail: `作者: ${author}<br>分類: ${category}<br>更新時間: ${updateTime}`,
            host: url
        });
    }

    return null;
}
