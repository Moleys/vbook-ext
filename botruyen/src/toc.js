function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let bookID = doc.select("#sky_follow").last().attr("data-id");
        let response1 = fetch("https://botruyen.vip/wp-admin/admin-ajax.php", {
            method: "POST",
            body: {
                    action: "sky_show_chapter",
                    post_id: bookID,
                    columns: 3
                }
            });

        if (response1.ok) {
            console.log("doc1")
            let doc1 = response1.html();
            let el1 = doc1.select("#list_container").last()
            let el = el1.select("div.item a")
            const data = [];
            for (let i = 0;i < el.size(); i++) {
                var e = el.get(i);
                data.push({
                    name: e.select("a").text(),
                    url: e.attr("href"),
                    host: "https://botruyen.vip"
                })
            }
            data.reverse();
            return Response.success(data);

        }
    }
    return null;
}