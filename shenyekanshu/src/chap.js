load('config.js');
load('cryptojs.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        // 1/2 text đầu không bị mã hóa
        let htm = doc.select("#C0NTENT");
        htm.select("p[style=\"color:red;\"]").remove();
        
        //1/2 text sau không bị mã hóa
        let text0 = doc.select("script").html().split("$('#C0NTENT').html(d(\"")[1];
        let a = text0.split("\", \"")[0].trim().replace(/\\/g,"");
        let b = text0.split("\", \"")[1].split("\"));")[0].trim();

        htm = d(a,b);

        return Response.success(htm);
    }
    return null;
}

function d(a, b) {
    b = CryptoJS.MD5(b).toString();
    var d = CryptoJS.enc.Utf8.parse(b.substring(0, 16));
    var e = CryptoJS.enc.Utf8.parse(b.substring(16));
    return CryptoJS.AES.decrypt(a, e, { iv: d, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8)
}

