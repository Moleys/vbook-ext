
function execute(url, page) {
    if (!page) page = '1'

    let response = fetch(url+"/"+page+".html");
    if (response.ok) {
        let doc = response.html();
        let rows = doc.select("body > div.offcanvas-wrapper > section > div > div.col-xl-9.col-lg-8.p-r-30 > div.row div.card.mb-30")
        const data = [];
        rows.forEach(e => {
            data.push({
                name: e.select("h5.card-title").first().text(),
                link: e.select("h5.card-title a").first().attr("href"),
                cover: "https://wsrv.nl/?url=" + e.select(".main-img div.lazyload").first().attr("data-src")+"&w=225&h=300&fit=cover&output=webp",
                description: e.select(".card-ep").first().text().replace("作者：",""),
                host: "https://www.esjzone.cc"

            })
        });
        let next = doc.select("ul.pagination li.next a").attr("href")
        return Response.success(data, next.toString());
    }
    return null;

}




