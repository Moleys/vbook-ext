function execute(url) {
    // let host = "https://" + url.replace("https://","").split("/")[0]
    // console.log(host)
    const bookid = url.match(/bookid=(\d+)/)[1]
    let response = fetch("https://ebook.longmabook.com/showbooklist.php", {
        "headers": {
            "accept": "*/*",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "x-requested-with": "XMLHttpRequest"
        },
        "body": {
            "ebookid": bookid,
            "showbooklisttype": "1"
        },
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
    });
    if (response.ok) {
        let doc = response.html();
        const data = [];

        let li0 = doc.select("li").first().text()
        if(li0 === "章節數量較多，採分頁顯示")
        {
            li1 = doc.select("li").last().select("a").text().trim()
            for(let i = 1; i<=li1;i++) {
                data.push(bookid+"_"+i.toString())
            }
        }
        else
            data.push(bookid+"_1")

        return Response.success(data);
    }
    return null;
}