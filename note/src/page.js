load('config.js');

// Phân trang mục lục: bài viết = 1 trang, tạp chí và tác giả = nhiều trang API.
function execute(url) {
    url = normalizeUrl(url);

    if (isMagazineUrl(url)) {
        let key = magazineKey(url);
        let limit = maxTocPages();
        let pages = [];
        for (let page = 1; page <= limit; page++) {
            let section = magazineSection(key, page);
            if (!section) break;
            pages.push(BASE_URL + "/api/v1/layout/magazine/" + encodeURIComponent(key) + "/section?page=" + page + "&include_details=true");
            if (section.is_last_page) break;
        }
        if (!pages.length) return Response.error("note.com: không đọc được mục lục tạp chí");
        return Response.success(pages);
    }

    if (isCreatorUrl(url)) {
        let urlname = urlnameOf(url);
        let api = apiGet("/api/v2/creators/" + encodeURIComponent(urlname));
        let total = api.ok && api.data && api.data.data ? (parseInt(api.data.data.noteCount, 10) || 0) : 0;
        if (total <= 0) return Response.success([url]);
        let per = 20;
        let count = Math.ceil(total / per);
        if (count > maxTocPages()) count = maxTocPages();
        let pages = [];
        for (let page = 1; page <= count; page++) {
            pages.push(BASE_URL + "/api/v2/creators/" + encodeURIComponent(urlname) + "/contents?kind=note&page=" + page + "&per=" + per);
        }
        return Response.success(pages);
    }

    return Response.success([url]);
}
