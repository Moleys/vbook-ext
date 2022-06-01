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


    let response = fetch("http://app.jjwxc.net/androidapi/novelbasicinfo?novelId=" + bookID);
    if (response.ok) {
        let doc = response.json();
        let name = doc.novelName;
        let author = doc.authorName;
        let novelTags = doc.novelTags;
        // let coverImg = doc.novelCover;
        let coverImg = "https://images.weserv.nl/?url=" + doc.novelCover +"&output=jpg&w=300";
        return Response.success({
            name: name,
            cover: coverImg,
            author: author,
            description: doc.novelIntro.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/<br\/><br\/>/g, "<br/>").replace(/<br\/><br\/>/g, "<br/>").replace(/<br\/>/g, "<br>"),
            detail: "作者： " + author  + "<br>" + novelTags,
            host: "http://www.jjwxc.net/"
        });
    }
    return null;
}