function execute(url) {
    if(url.slice(-1) !== "/")
        url = url + "/";
    let el1 =""
    var browser = Engine.newBrowser() // Khởi tạo browser
    let doc = browser.launch(url, 5000) // Mở trang web với timeout, trả về Document object
    el1 = doc.select("#content-container")
    browser.close()
    console.log(el1)

    el1 = el1.html()
    el1 = Html.clean(el1, ["i","br"]).replace(/<i>/g, "").replace(/<\/i>/g, "").replace("@Bạn đang đọc bản lưu trong hệ thống \n<br>","").replace(/  /g, " ")


    // el1.select("span").remove()
    // el1 = el1.html()
    // el1 = el1.replace(/\"/g,"'")
    // const regex1 = /h='(.*?)'/g;
    // const regex2 = /p='(.*?)'/g;
    // const regex3 = /v='(.*?)'/g;
    // const regex4 = /id='(.*?)'/g;
    // const regex5 = /<i t='(.*?)'  >(.*?)<\/i>/g;
    // el1 = el1.replace(regex1, "").replace(regex2, "").replace(regex3, "").replace(regex4, "").replace(regex5, "$1")
    // el1 = Html.clean(el1, ["i","br"])


    // el1 = el1.replace(/\"/g,"'")
    // content = el1.replace(/<a href=.*?<\/a>/g, "");
    // const regex1 = /<i h='(.*?)'t='(.*?)'v='(.*?)'p='(.*?)'>(.*?)<\/i>/g;
    // content = content.replace(regex1, "$2").replace(/ /g,"").replace(/\n/g, "<br>");
    // content = content.replace(/<(\/)?i.*?>/g, "");
    // content = content.replace(/<span.*?>(.*?)<\/span>(<br>)?/g, "");
    // content = content.replace(/(\n)?\t/g, "<br>");
    // content = content.replace(/\s{2,}/g, " ");
    // if (url.indexOf("bxwxorg") > 0) {
    //     content = content.replace(/<\/?p.*?>/g, "");
    //     content = content.replace(/(Ta chiếm được.*:?)/g, "");
    // }
    // if (url.indexOf("uukanshu") > 0) {
    //     content = content.replace("UUKANSHU đọc sách www.uukanshu.com", "");
    //     content = content.replace(/<div.*?>(.*?)<\/div>/g, "");
    //     content = content.replace(/<p><\/p>\t<br>/g,"");
    //     content = content.replace(/<\/div>/g,"");
    //     content = content.replace(/\(https.*<br>/g,"");
    // }
    // if (url.indexOf("aikanshu") > 0) {
    //     content = content.replace(/<img.*?src="\/novel\/images.*?>/g, "");
    // }
    // if (url.indexOf("ciweimao") > 0) {
    //     content = content.replace(/<span>.*?<\/span>/g, "");
    //     content = content.replace(/<\/?p.*?>/g, "");
    // }
    // content = content.replace(/&(nbsp|amp|quot|lt|gt|bp|emsp);/g, "");
    // content = content.replace(/(<br\/?>)+/g,"<br>");
    // content = content.replace(/<\/p><br><br><p>/g,"<br><br>");
    // content = content.replace(/ ([,\.!\?”]+)/g,"$1");
    // content = content.replace(/ ([,\.!\?”]+)/g,"$1");

    //Đã lọc rác có thể. còn nhiều vcl ra ý. tự lọc đi
    return Response.success(el1);
}


