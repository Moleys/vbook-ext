function execute(url, page) {
    if (!page) page = 1;
    var offset = (parseInt(page, 10) - 1) * 20;
    url = String(url || "");
    url = url.replace(/\{\{page\}\}/g, String(offset));
    url = url.replace(/\{\{offset\}\}/g, String(offset));
    if (url.indexOf("http") !== 0) {
        url = "https://bookshelf.html5.qq.com/qbread/api/rank/list?ch=001995&" + url;
    }
    var response = fetch(url, {
        "headers": {
            "Referer": "https://bookshelf.html5.qq.com/qbread/categorylist?traceid=0809004&sceneid=FeedsTab&strageid=&ch=001995&tabfrom=top&feeds_version=8516&reader_version=0&groupid=1501&tag_type_id=1"
        }
    });
    if (response.ok) {
        var doc = response.json();
        var rows = doc.rows || [];
        var data = [];
        if (rows.length > 0) {
            rows.forEach(function(e) {
                    data.push({
                        name: e.resourceName,
                        link: "https://bookshelf.html5.qq.com/autojump/intro?bookid=" + e.resourceID,
                        cover: e.picurl,
                        description: e.author,
                        host: "https://bookshelf.html5.qq.com"
                    })
            });
            var next = parseInt(page, 10) + 1;
            return Response.success(data, next);
        } else {
            return Response.success(data);
        }
    }
    return null;
}
