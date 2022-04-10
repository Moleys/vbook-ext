function execute(url) {

    let bookID = url.split("novelid=")[1];
    console.log(bookID)

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let table = doc.select("#oneboolt").first()

        let checkName = true;
        let el = table.select('tr[itemtype="http://schema.org/Chapter"]');
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);

            let name =  e.select('a[itemprop="url"]').first().text();
            // let chaperID = e.select("td").first().text();
            let chaperID = i+1;
            name = chaperID +". " + name.trim();
            if(name.length === 0)
                name = "[锁]";

            let link = e.select("a").first().attr("href");
            if(link.length===0) {
                link = "http://my.jjwxc.net/onebook_vip.php?novelid=" +  bookID + "&chapterid=" +chaperID;
            }
            data.push({
                name: name,
                url: link ,
                host: "https://www.jjwxc.net"
            })
        }
        return Response.success(data);
    }
    return null;
}