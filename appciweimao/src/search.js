load("crypto.js");
function execute(key, page) {
    let app_version= "2.8.021";
    let device_token= "ciweimao_f";
    let login_token= "9f652b5729f4ae15e1ff180dd48bd390";
    let account= "书客611354746076";
    let host_url = "https://app.hbooker.com";
    let default_params = "app_version="+app_version+"&device_token="+device_token+"&login_token="+login_token+"&account="+account;
    let search_book = "/bookcity/get_filter_search_book_list";
    let url = host_url + search_book + "?+" + default_params + "&count=10&page=0&category_index&key="+key;
    console.log(url)
    let response = fetch(url, {
        headers: [
        'User-Agent: Android com.kuangxiangciweimao.novel',
        ],
    })
    if (response.ok) {
        const data = [];
		let text_encrypt = response.text();
        let json_decrypt = JSON.parse(decrypt(text_encrypt)).data;
        let book_list = json_decrypt.book_list
        book_list.forEach(e => {
            data.push({
                name: e.book_name,
                link: "https://mip.ciweimao.com/book/" + e.book_id,
                cover:  e.cover,
                description: e.author_name,
                host: "https://mip.ciweimao.com/"
            });
        });

        return Response.success(data);
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