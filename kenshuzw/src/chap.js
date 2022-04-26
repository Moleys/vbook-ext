function execute(url) {
    url = url.replace("m.kenshuzw.com", "www.kenshuzw.com");
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        doc.select("#center_tip").remove();
        return Response.success(doc.select(".article-con").html().replace(/&nbsp;/g, ""));
    }
    return null;
}