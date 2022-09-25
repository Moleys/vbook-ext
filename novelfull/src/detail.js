function execute(url) {
    //var url_split=url.slice(0,url.length()-1);
    var doc = Http.get(url).html();
    var el = doc.select(".col-info-desc div")
    if (doc) {
        //return Response.success(doc.select(".info-holder .info div").get(0));
        return Response.success({
            name: doc.select(".info-holder .books .desc h3").text(),
            cover: "https://novelfull.com/" + doc.select(".info-holder .books .book img").attr("src"),
            host: "https://novelfull.com",
            author: doc.select(".info-holder .info div").get(0).select("a").text(),
            description: doc.select(".desc .desc-text").text(),
            detail: doc.select(".info-holder .info div").get(1).text() + "<br>" 
                        + doc.select(".info-holder .info div").get(2).text()+ "<br>"
                        + doc.select(".info-holder .info div").get(4).text()
            
        });

    }
    return null;
}