load('config.js');

function execute(key, page) {
    if (!page) page = '1';
    var apiUrl = BASE_URL + "/search/" + encodeURIComponent(key) + "/" + page;

    var response = fetch(apiUrl, { headers: { "User-Agent": UA } });
    if (response.ok) {
        var html = response.text();
        var r = parseXhList(html);

        var next = parseInt(page, 10) + 1;
        if (r.items.length === 0 || next > r.totalPages) next = null;

        return Response.success(r.items, next);
    }
    return null;
}
