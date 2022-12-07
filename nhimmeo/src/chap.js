load("crypto.js");
function execute(url) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1);
    let chapter_id = url.split(/[/ ]+/).pop();
    url = "https://nhimmeo.cf/api/chap.php?q=" + chapter_id;
    let response_chapter_info = fetch(url)
    if (response_chapter_info.ok) {
		let text_encrypt_chapter_info = response_chapter_info.text().trim();
        let chapter_info = JSON.parse(decrypt(text_encrypt_chapter_info)).data.chapter_info.txt_content.replace(/\n/g, "<br>").replace(/　　/g, "");
        return Response.success(chapter_info);
    }
    return null;
}

function decrypt(data, key) {
    const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000')
    key = CryptoJS.SHA256(key ? key : 'zG2nSeEfSHfvTCHy5LCcqtBbQehKNLXn')
    var decrypted = CryptoJS.AES.decrypt(data, key, {
        mode: CryptoJS.mode.CBC,
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
    })
    return decrypted.toString(CryptoJS.enc.Utf8)
}