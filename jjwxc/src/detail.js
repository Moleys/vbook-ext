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

    console.log(bookID)

    let response = fetch("https://www.jjwxc.net/onebook.php?novelid=" + bookID);
    if (response.ok) {
        let doc = response.html('gbk');
        let name = doc.select('h1[itemprop="name"]').text();
        let author = doc.select('meta[name="Author"]').attr("content");
        var ele1 = doc.select(".righttd li");
        let detail = "";
        for (var i = 0; i < 2; i++) {
            detail += ele1.get(i).text() + "<br>";
        }

        let coverImg = doc.select("img.noveldefaultimage").first().attr("src");
        if (coverImg.startsWith("/")) {
            coverImg = "https://www.jjwxc.net/" + coverImg;
        }

        return Response.success({
            name: name,
            cover: coverImg,
            author: author,
            description: doc.select("#novelintro").html(),
            detail: "作者： " + author  + "<br>" + detail,
            host: "https://www.jjwxc.net/"
        });
    }
    return null;
}