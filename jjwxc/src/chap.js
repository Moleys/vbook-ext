function execute(url) {
    if(url.indexOf("onebook_vip.php") !== -1){
        let response = fetch(url);
        if (response.ok) {
            let doc = response.html('gbk');
            let htm = doc.select(".noveltext");
            let content =  htm.html();
            if(content.length === 0){
                var html1 = "Đây là chương VIP. Nếu muốn đọc bạn cần mua chương VIP rồi đăng nhập tài khoản vào trình duyệt của Vbook.<br>Nếu đã mua rồi mà vẫn không đọc được thì lập chủ đề báo lỗi nha!";
                return Response.success(html1);
            }
            content = content.replace("<div id=\"show\"><\/div>","").split('<div style="clear:both;"></div>')[1].split("<div")[0];

            //get font name
            let fontname = htm.select("div").first().attr("class").replace("noveltext","").trim();
            console.log(fontname)
            // get JjwxcFontTable
            let responseFont = fetch("https://jjwxc.bgme.bid/" + fontname + ".json");
            if (responseFont.ok) {
                let dataFont = responseFont.json();
                for (var key in dataFont) 
                { if (!dataFont.hasOwnProperty(key))
                    { continue; } 
                    if(content.includes(key)===true){
                        // content = content.replace(key, dataFont[key]);
                        content = content.split(key).join(dataFont[key]);
                    }


                };

            }
            else{
                var html1 = "Sửa font trong truyện VIP thất bại.";
                return Response.success(html1);
            } //end responseFont

            return Response.success(content);
        }
    }
    else  // chương thường
    {
        let response2 = fetch(url);
        if (response2.ok) {
            let doc2 = response2.html('gbk');
            let htm2 = doc2.select(".noveltext").html();
            htm2 = htm2.replace(/\&nbsp;/g, "");
            htm2 =  htm2.split('<div style="clear:both;"></div>')[1].split("<div")[0]
            return Response.success(htm2);
        }
        return null;
    }
}