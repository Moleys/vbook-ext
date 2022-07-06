function execute(url) {
    if(url.slice(-1) !== "/")
        url = url + "/";
    let el1 =""
    var browser = Engine.newBrowser() // Khởi tạo browser
    let doc = browser.launch(url, 5500) // Mở trang web với timeout, trả về Document object
    el1 = doc.select(".contentbox")
    el1.select("i[hd=\"\"]").remove()

    browser.close()
    // console.log(el1)
    el1.select("img").remove()
    el1.select("span").remove()
    el1 = el1.html()
    el1 = el1.replace(/\"/g,"'")

    console.log(el1)

    const regex1 = /<i h='(.*?)' t='(.*?)' v='(.*?)' p='(.*?)' id='(.*?)'>(.*?)<\/i>/g;
    const regex2 = /<i (.*?)>(.*?)<\/i>/g;
    el1 = el1.replace(regex1, "$2").replace(regex2, "").replace(/ /g,"").replace("Đọctrênwebđểcóchấtlượngdịchcaovàủnghộwebsite.", "")
    if(el1.includes("Đangtảinộidungchương")){
        el1 = "Lấy nội dung thất bại, vui lòng load lại chap"
    }

    return Response.success(el1);
}


