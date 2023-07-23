load('crypto.js');

function execute(url) {

    if(url.includes("token"))
    {
        const token = url.split("token=")[1];
        let html1 = `Token không hợp lệ. Bạn chưa đăng nhập Tấn Giang.<br/>Hãy tìm đọc bài viết “[Tấn Giang, jjwxc] Hướng dẫn lấy token trong app và đọc truyện trên Vbook” và làm theo hướng dẫn. Sau khi lưu token nhớ load lại mục lục truyện.`;
        if(token === "error" || token.length < 30)
            return Response.success(html1);
        else {

            let response1 = fetch(url);
            if (response1.ok) {
                let res_json1 = response1.json().downloadContent[0];

                if(res_json1.message){
                    html1 = "Đây là chương VIP. Nếu muốn đọc bạn cần mua chương VIP ở Tấn Giang.<br>Nếu bạn vừa mới mua thì reload - tải lại chương này, để cập nhật nội dung.<br>Nếu vẫn không đọc được thì lập chủ đề bên Góp ý báo lỗi!";
                    return Response.success(html1);
                }
                else {
                    let chapterIntro = res_json1.chapterIntro
                    let sayBody = res_json1.sayBody
                    if (typeof intro !== "undefined") {
                        sayBody = (intro == 1) ? sayBody : ""
                    }
                    let chap_content = res_json1.content
                    chap_content = decryptContent(chap_content)
                    chap_content = getConent(chap_content,sayBody,chapterIntro);
                    return Response.success(chap_content);             
                }
            }

        }
    }
    else
    {
        // chap free
        let response = fetch(url);
        if (response.ok) {
            let res_json = response.json();
            let chapterIntro = res_json.chapterIntro
            let sayBody = res_json.sayBody
            if (typeof intro !== "undefined") {
                sayBody = (intro == 1) ? sayBody : ""
            }
            let chap_content = res_json.content
            return Response.success(getConent(chap_content,sayBody,chapterIntro));
        }
    }
}

function decryptContent(content) {
    // Được hỗ trợ bởi thám tử Đạt 009
    if (content.length <= 30) {
        return "";
    }
    const key = CryptoJS.enc.Utf8.parse("KW8Dvm2N");
    const iv = CryptoJS.enc.Utf8.parse("1ae2c94b");
    const ciphertext = CryptoJS.enc.Base64.parse(content);
    const decrypted = CryptoJS.DES.decrypt({ ciphertext }, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
        });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

function getConent(chap_content, sayBody,chapterIntro) {
    chap_content = chap_content.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\n　　/g,"<br>").replace(/<br><br>/g, "<br>");
    if(sayBody.trim().length>0){
        chap_content = chap_content + "<br>••••••••<br>作者留言：<br>" + sayBody.replace(/\r\n/g,"<br>")
    }
    if(chapterIntro.trim().length>0){
        chap_content = chapterIntro.replace(/\r\n/g,"<br>") + "内容提要：<br>••••••••<br>" + chap_content
    }
    return chap_content;
}