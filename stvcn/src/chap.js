function execute(url) {
    if(url.slice(-1) !== "/")
        url = url + "/";
    let el1 =""
    var browser = Engine.newBrowser() // Khởi tạo browser
    let doc = browser.launch(url, 5500) // Mở trang web với timeout, trả về Document object
    el1 = doc.select(".contentbox")
    browser.close()
    // console.log(el1)
    el1.select("i[hd=\"\"]").remove()
    el1.select("img").remove()
    el1.select("span").remove()
    el1.select("a").remove()
    el1 = el1.html()
    el1 = el1.replace(/\"/g,"'")

    const regex1 = /<i(.*?)t='(.*?)'(.*?)'>(.*?)<\/i>/g;
    el1 = el1.replace(regex1, "$2").replace(/ /g,"").replace("Đọctrênwebđểcóchấtlượngdịchcaovàủnghộwebsite.", "")
    if (url.indexOf("uukanshu") > 0) {
        el1.replace(/[UＵ][UＵ]\s*看书\s*[wｗ][wｗ][wｗ][\.．][uｕ][uｕ][kｋ][aａ][nｎ][sｓ][hｈ][uｕ][\.．][cｃ][oｏ][mｍ]/gi, "");
    }
    
    if(el1.includes("Đangtảinộidungchương")){
        el1 = "Lấy nội dung thất bại, vui lòng load lại chap"
    }

    return Response.success(el1);
}


