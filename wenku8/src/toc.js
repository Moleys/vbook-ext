function execute(url) {
    url = "https://www.wenku8.net/modules/article/reader.php?aid=" + url.split(/[/ ]+/).pop().replace(".htm","");
    console.log(url)
    console.log("j")

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let el1 = doc.select("table").last()
        let el = el1.select("td.ccss a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: e.attr("href"),
                host: "https://www.wenku8.net"
            })
        }
        return Response.success(data);
    }
    return null;
}