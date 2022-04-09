function execute(url) {
    if(url.indexOf("this_is_chapter_vip_") !== -1){
        var html = "Đây là chương VIP. Nếu muốn đọc mời bạn mua trên web để đọc ^^! <br>Vì mình không có VIP nên không rõ có load được chương VIP đã mua không!";
        return Response.success(html);
    }

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let htm = doc.select(".noveltext").html();
        htm = htm.replace(/\&nbsp;/g, "");
        htm =  htm.split('<div style="clear:both;"></div>')[1].split("<div")[0]
        console.log(htm)
        return Response.success(htm);
    }
    return url;
}