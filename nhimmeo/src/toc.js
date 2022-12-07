load("crypto.js");
function execute(url) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1);  
    const data = [];
    let book_id = url.split(/[/ ]+/).pop();
    let url_division = "https://nhimmeo.cf/api/catalog.php?q=" + book_id;
    let response_chapter_list = fetch(url_division)
    if (response_chapter_list.ok) {
        let text_encrypt = response_chapter_list.text();
        let chapter_infoCatatog = JSON.parse(decrypt(text_encrypt)).data.chapter_list
        chapter_infoCatatog.forEach((division ) => {
            let chapter_list = division.chapter_list;
            chapter_list.forEach(e => {
                console.log(e.chapter_title)
                data.push({
                    name: e.chapter_title,
                    url: "https://nhimmeo.cf/chap/" + e.chapter_id,
                    host: "https://nhimmeo.cf"
                })
            }); 
        }); 
        return Response.success(data)
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