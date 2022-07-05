function execute(url) {
    if(url.slice(-1) !== "/")
        url = url + "/";
    let el1 =""
    var browser = Engine.newBrowser() // Khởi tạo browser
    let doc = browser.launch(url, 1400) // Mở trang web với timeout, trả về Document object
    el1 = browser.callJs("document.getElementsByTagName('body')[0].innerHTML = document.cookie;", 100);
    el1 = el1.select("body").text()
    browser.close()
    console.log(el1)
    let host = url.split('/truyen/')[0];
    let params = url.split('/truyen/')[1].split('/');
    let bookid = params[2];
    let currentid = params[3];
    let bookhost = params[0];
    let booksty = params[1];
    let currentidc = '';
    let response = fetch(host+'/index.php',{
        method: "POST",
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Cookie': el1,
            'Referer': url
        },
        queries: {
            sajax : 'readchapter',
            bookid : bookid,
            h : bookhost,
            c2 : currentidc,
            c : currentid,
            sty : booksty  
        }
    });
    if(response.ok){
        var content = response.json().data;
        content = content.replace(/\n/g, "<br>");

        let content_0 = Html.parse(content).select("body")
        content_0.select("img").remove()
        content_0.select("span").remove()
        content_0.select("i[hd]").remove()
        let content_2 = ""
        content_0 = content_0.html().split("<br>")
        content_0.forEach(ele => {

            let content_1 = Html.parse(ele).select("body")
                        console.log(content_1)

            content_1 = content_1.select("i")
            let content_1a = ""
             content_1.forEach(ele1 => {
                content_1a = content_1a + ele1.attr("t")
             });
            content_2 = content_2 +  content_1a +"<br>";
        });
        // content = content.replace(/<a href=.*?<\/a>/g, "");
        // content = content.replace(/<i (.*?) hd>(.*?)<\/i>/g, "");
        // content = content.replace(/<i (.*?) hd >(.*?)<\/i>/g, "");
        // content = content.replace(/<i t='.'(.*?)>(.*?)<\/i>/g, "");
        // console.log(content)
        // const regex1 = /<i h='(.*?)'t='(.*?)'v='(.*?)'p='(.*?)'>(.*?)<\/i>/g;
        // content = content.replace(regex1, "$2").replace(/ /g,"").replace(/\n/g, "<br>");
        // content = content.replace(/<(\/)?i.*?>/g, "");
        // content = content.replace(/<span.*?>(.*?)<\/span>(<br>)?/g, "");
        // content = content.replace(/(\n)?\t/g, "<br>");
        // content = content.replace(/\s{2,}/g, " ");

        // content = content.replace(/&(nbsp|amp|quot|lt|gt|bp|emsp);/g, "");
        // content = content.replace(/(<br\/?>)+/g,"<br>");
        // content = content.replace(/<\/p><br><br><p>/g,"<br><br>");
        // content = content.replace(/ ([,\.!\?”]+)/g,"$1");
        // //Đã lọc rác có thể. còn nhiều vcl ra ý. tự lọc đi
        return Response.success(content_2);
    }
    return Response.error;
}
