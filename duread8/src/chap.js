function execute(url) {
    url = url.replace('www.duread8.com', 'm.duread8.com').replace('https://duread8.com', 'https://m.duread8.com');
    let el1 =""
    let el2 =""
    var browser = Engine.newBrowser() // Khởi tạo browser
    let doc = browser.launch(url, 2300) // Mở trang web với timeout, trả về Document object
    el1 = doc.select(".read-bd")
    // el2 = doc.select(".container").html()

    browser.close()
    el1 = el1.html().replace(/<p class=\"chapter\">/g,"<p>")
    // // if(el1.trim().length>0 && el2.trim().length>0 )
    // // {
    //     return Response.success(el2);

    // // }
    return Response.success(el1);

    return null;
}