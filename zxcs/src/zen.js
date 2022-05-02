function execute(url, page) {
    let response = fetch("http://zxcs.me/?plugin=lf_map");
    if (response.ok) {
        let doc = response.html();
        const data = [];
		doc.select("tbody a").forEach(e => {
            console.log(e)
            let name = e.text()
            data.push({
                name: name.split("》")[0].replace("《",""),
                link: e.select("a").first().attr("href"),
                description: name.split("作者：")[1],
                host: "http://zxcs.me"
            })
        });


        return Response.success(data)
    }
    return null;
}