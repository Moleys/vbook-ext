function execute(url) {
    // let host = "https://" + url.replace("https://","").split("/")[0]
    // console.log(host)
    const bookid= url.split("_")[0]
    const p =url.split("_")[1]
    let response = fetch("https://ebook.longmabook.com/showbooklist.php", {
        "headers": {
            "accept": "*/*",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "x-requested-with": "XMLHttpRequest"
        },
        "body": {
            "ebookid": bookid,
            "pages": p,
            "showbooklisttype": "1"
        },
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
    });
    if (response.ok) {
        let doc = response.html();





        let el = doc.select("li")
        const data = [];

        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            let name = e.select("a").text()
            if(name){
                let cart = e.html()
                if(cart.includes('<span uk-icon=\"cart\" uk-tooltip=\"\u6D77\u68E0\u5E63\u50F9\u683C\"><\/span><\/font>\u514D\u8CBB&nbsp; <font color=\"green\">')){
                    cart = false
                }
                else if(cart.includes("<b><font color=\"red\">**\u5DF2\u8CFC\u8CB7")){
                    cart = false
                }
                else{
                    cart = true
                }
                let link =  e.select("a").attr("href")
                if(link)
                    data.push({
                        name: name,
                        url: "https://ebook.longmabook.com" + link,
                        pay: true,
                        host: "https://ebook.longmabook.com"
                    });
            }
        }
        return Response.success(data);
    }
    return null;
}