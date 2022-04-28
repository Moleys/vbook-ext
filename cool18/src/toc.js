function execute(url) {
    let page = 1;
    const data = [];
    while(true) {
        let response = fetch(url + "&p=" + page.toString());
        if (response.ok) {
            let doc = response.html();
            let el = doc.select(".ta-right").last().select("div.ta-show-list")
            if(el.text().length===0){
                break;
            }
            
            for (let i = 0;i < el.size(); i++) {
                var e = el.get(i);
                data.push({
                    name: e.select("a").text(),
                    url: e.select("a").first().attr("href"),
                    host: "https://www.cool18.com"
                })
            }
            page++;
        }
    }
    console.log("Total page = " +page)
    if (data) {
        return Response.success(data);
    }
            
    return null;
}