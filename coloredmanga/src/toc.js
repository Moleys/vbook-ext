function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select(".listing-chapters_wrap").last();
        console.log(el1)
        let el = el1.select(".wp-manga-chapter a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: e.attr("href"),
                host: "https://coloredmanga.com"
            })
        }
        data.reverse();
        return Response.success(data);
    }
    return null;
}