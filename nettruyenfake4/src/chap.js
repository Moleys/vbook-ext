load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let data = [];
        doc.select(".page-chapter img").forEach(e => {
            if(e.attr("src")) {
                data.push(e.attr("src"))
            }
            if(e.attr("data-src")) {
                data.push(e.attr("data-src"))
            }

        });
        return Response.success(data);
    }
    return null;
}