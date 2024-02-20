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



    let token = "error"
    let response_tk = fetch("https://moldich.raudo.eu.org/tools/jjwxc-sign.php");
    if (response_tk.ok) {
        let doc = response_tk.html();
        token = doc.select("#token_display").text().trim()
        token = (token === "Chưa thiết lập") ? "error" : token;
    }
    console.log(token)


    let url1 = "https://app-cdn.jjwxc.net/androidapi/chapterList?novelId="+ bookID +"&more=0&whole=1";
    let response = fetch(url1);
    if (response.ok) {
        let el = response.json().chapterlist;
        const data = [];
        for (let i = 0;i < el.length; i++) {
            let name =  el[i].chaptername;
            if(el[i].chaptertype != '1')
            {
                let buy = false
                name = el[i].chapterid +". " + name.trim();
                let chapterid=  el[i].chapterid
                let link = 'https://app.jjwxc.net/androidapi/chapterContent?novelId='+bookID+'&chapterId='+chapterid;
                let checkVIP = el[i].isvip;
                if(checkVIP>0) {
                    buy = true
                    link = "https://app.jjwxc.net/androidapi/chapterContent?novelId="+bookID+"&versionCode=349&chapterId="+chapterid+"&token="+token
                    
                }
                data.push({
                    name: name,
                    url: link ,
                    pay: buy,
                    host: "https://app.jjwxc.net"
                    
                })

            }
        }
        return Response.success(data);
    }
    return null;
}
