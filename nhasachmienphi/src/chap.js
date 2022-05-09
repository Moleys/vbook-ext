function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let theloai = doc.select("div.content_page_online .mg-tb-10 a").text().trim()
        if (theloai!=="Truyện Tranh") 
        {
            let htm = doc.select(".content_p").html();
            htm = htm.replace(/\&nbsp;/g, "").replace(/alt=\"\" src=\"\//g, 'alt=\"\" src="https://nhasachmienphi.com/');
            return Response.success(htm);
        } 
        else {
            let imgs = [];
            doc.select(".content_p img").forEach(e => imgs.push(e.attr("src")));
            return Response.success(imgs);
        }


    }
    return null;
}