

function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        doc.select(".text-center").remove();
        doc.select('.sky-detail-chap').remove();
        var content =doc.select(".content").html();
        content = content.replace(/\n/g,'')
        content = content.replace(/&nbsp;/g,'')
        return Response.success(content);
    }
    return null;
}