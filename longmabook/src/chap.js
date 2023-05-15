function execute(url) {
    // let host = "https://" + url.replace("https://","").split("/")[0]
    // console.log(host)
    let response_0 = fetch(url);
    if (response_0.ok) {
        let doc = response_0.html();
        let el1 = doc.select("script").html();
        let writersay = doc.select("#colorpanelwritersay").html()


        const m = el1.match(
            /{\spaperid:\s'(\d+)',\svercodechk:\s'(\w+)'}/
        );
        let paperidInner = m[1];
        let vercodechkInner = m[2];
        let response = fetch("https://ebook.longmabook.com/showpapercolor.php", {
        "headers": {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "x-requested-with": "XMLHttpRequest"
        },
        "body": {
            "paperid": paperidInner,
            "vercodechk": vercodechkInner
        },
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
        });
        if (response.ok) {
            let doc = response.html();
            let htm = doc.select("body")
            htm.select("img[src*=/images/fullcolor.png]").remove();
            return Response.success(htm.html() + writersay);
        }
    }
    return null;
}