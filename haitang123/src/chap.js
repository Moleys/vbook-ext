load('crypto.js');


function execute(url) {
    url = url.replace('m.haitang123.co', 'www.haitang123.co');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#C0NTENT");
        // htm = htm.replace(/\&nbsp;/g, "");
        htm.select("p[style=\"color:red;\"]").remove();
        htm = htm.html().replace("<p>收藏网址：www.haitang123.com<\/p>","").replace("<p>(＞人＜；)<\/p>","");

        let text0 = doc.select("script").html().split("$('#C0NTENT').html(d(\"")[1];
        let a = text0.split("\", \"")[0];
        let b = text0.split("\", \"")[1].split("\"));")[0];

        b = CryptoJS.MD5(b).toString();
        var d = CryptoJS.enc.Utf8.parse(b.substring(0, 16));
        var e = CryptoJS.enc.Utf8.parse(b.substring(16));
        text1 =  CryptoJS.AES.decrypt(a, e, { iv: d, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8)

        let text2 = htm + text1;


        return Response.success(htm);
    }
    return null;
}


