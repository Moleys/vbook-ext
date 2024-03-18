load('config.js');

function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select(".list-view .c_l")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            let link = e.select("a").attr("href")
            console.log(link)
            let pay = false
            if(link == "javascript:") {
                link = BASE_URL + "/error"
                pay = true

            }
            data.push({
                name: e.select(".l_counter").text() + " " + e.select(".l_chaptname").text(),
                url: link,
                host: BASE_URL,
                pay: pay
            })
        }
        return Response.success(data);
    }
    return null;
}
