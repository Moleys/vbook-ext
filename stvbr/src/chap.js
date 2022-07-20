function execute(url) {
    if(url.slice(-1) !== "/")
        url = url + "/";
    let el1 =""
    var browser = Engine.newBrowser() // Khởi tạo browser
    let doc = browser.launch(url, 5000) // Mở trang web với timeout, trả về Document object
    el1 = doc.select("#content-container")
    browser.close()
    console.log(el1)
    el1.select("i[hd=\"\"]").remove()
    el1 = el1.html()
    el1 = Html.clean(el1, ["i","br"]).replace(/<i>/g, "").replace(/<\/i>/g, "").replace("@Bạn đang đọc bản lưu trong hệ thống \n<br>","").replace(/  /g, " ")
    if(el1.includes("Đangtảinộidungchương"))
    {
        el1 = "Chưa thể lấy nội dung. Vui lòng tải lại nội dung chương"
    }
    if(el1.includes("Đang tải nội dung chương"))
    {
        el1 = "Chưa thể lấy nội dung. Vui lòng tải lại nội dung chương"
    }
    return Response.success(el1);
}


