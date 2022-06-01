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
    let url1 = "https://app-cdn.jjwxc.net/androidapi/chapterList?novelId="+ bookID +"&more=0&whole=1";

    let response = fetch(url1);
    if (response.ok) {
        let el = response.json().chapterlist;
        const data = [];
        for (let i = 0;i < el.length; i++) {
            let name =  el[i].chaptername;
            name = el[i].chapterid +". " + name.trim();
            let link = "http://www.jjwxc.net/onebook.php?novelid="+ bookID +"&chapterid=" + el[i].chapterid;
            let checkVIP = el[i].isvip;
            if(checkVIP>0) {
                name =  name + " [VIP]";
                link = "http://my.jjwxc.net/onebook_vip.php?novelid=" + bookID + "&chapterid=" + el[i].chapterid;
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