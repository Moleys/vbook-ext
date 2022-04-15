function execute(url) {
    url = url.replace('wap.ciweimao.com', 'mip.ciweimao.com').replace('www.ciweimao.com', 'mip.ciweimao.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select(".cnt-box.catalogue").last()
        let el = el1.select("li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            let isVip = e.select("i").attr("class").replace(/icon/g,"").replace("-","").trim();
            let name = e.select("a").text();
            if(isVip === "lock"){
                name = "[VIP] " + name;
            }

            data.push({
                name: name,
                url: e.attr("href"),
                host: "https://mip.ciweimao.com"
            })


        }
        return Response.success(data);
    }
    return null;
}