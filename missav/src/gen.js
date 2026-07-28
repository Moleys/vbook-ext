load('config.js');

function execute(url, page) {
    if (!page) page = '1';
    var sep = url.indexOf('?') !== -1 ? '&' : '?';
    var apiUrl = url + sep + "page=" + page;

    var response = fetch(apiUrl, { headers: { "User-Agent": UA, "Referer": REFERRER } });
    if (response.ok) {
        var html = response.text();
        var r = parseMissavList(html);

        var next = parseInt(page, 10) + 1;
        if (r.items.length === 0 || next > r.totalPages) next = null;

        return Response.success(r.items, next);
    }
    return null;
}
