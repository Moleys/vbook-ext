function execute(url) {

    var bookID = '0';
    if(url.indexOf("book2") !== -1)
    {
        bookID = url.split(/[/ ]+/).pop();
    }
    if(url.indexOf("novelid=") !== -1)
    {
        if(url.slice(-1) === "/")
	        url = url.slice(0, -1)
        bookID = url.split("novelid=")[1]
        if(url.indexOf("&chapterid=") !== -1){
            bookID = bookI.split("&chapterid=")[0];
        }
    }


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
            let chaperID = i+1;
            name = chaperID +". " + name.trim();
            if(name.length === 0)
                name = "[锁]";

            let link = e.select("a[itemprop=\"url\"]").first().attr("href");
            let checkVIP = e.select("a[itemprop=\"url\"]").first().attr("id");

            if(checkVIP.includes("vip")) {
                link = e.select("a[itemprop=\"url\"]").first().attr("rel");
                name = name + " [VIP]";
                // link = "http://my.jjwxc.net/onebook_vip.php?novelid=" +  bookID + "&chapterid=" +chaperID;
            }
            data.push({
                name: name,
                url: link ,
                host: "http://www.jjwxc.net"
            })
        }
        return Response.success(data);
    }
    return null;
}