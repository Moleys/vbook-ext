load("crypto.js");
function execute(key, page) {
    if (!page) page = '1';
    let url = "https://nhimmeo.cf/api/search.php?q=" + key +"&page=" + page
    let response = fetch(url)
    if (response.ok) {
        const data = [];
		let text_encrypt = response.text();
        let json_decrypt = JSON.parse(decrypt(text_encrypt)).data;
        let book_list = json_decrypt.book_list
        book_list.forEach(e => {
            data.push({
                name: e.book_name,
                link: "https://nhimmeo.cf/detail/" + e.book_id,
                cover:  e.cover,
                description: e.author_name,
                host: "https://nhimmeo.cf"
            });
        });
        var next = parseInt(page, 10) + 1;
        return Response.success(data, next)
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