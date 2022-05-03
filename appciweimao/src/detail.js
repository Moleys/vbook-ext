load("crypto.js");
function execute(url) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1);
    let book_id = url.split(/[/ ]+/).pop();
    console.log(book_id)
    let app_version= "2.8.021";
    let device_token= "ciweimao_f";
    let login_token= "9f652b5729f4ae15e1ff180dd48bd390";
    let account= "书客611354746076";
    let host_url = "https://app.hbooker.com";
    let default_params = "app_version="+app_version+"&device_token="+device_token+"&login_token="+login_token+"&account="+account;
    let get_info_by_id = "/book/get_info_by_id";
    url = host_url+get_info_by_id+"?book_id=" + book_id + "&" +default_params;
    console.log(url)
    let response = fetch(url, {
        headers: [
        'User-Agent: Android com.kuangxiangciweimao.novel',
        ],
    })
    if (response.ok) {
        const data = [];
		let text_encrypt = response.text();
        console.log(text_encrypt)
        let book_info = JSON.parse(decrypt(text_encrypt)).data.book_info;
        return Response.success({
            name: book_info.book_name,
            cover: book_info.cover,
            author: book_info.author_name,
            description: "<br>题材：" +book_info.tag + "<br>简介：<br>" + book_info.description.replace(/\r\n/g, "<br>"),
            detail: "作者：" + book_info.author_name + "<br>更新：" +book_info.uptime+ "<br>字数：" +book_info.total_word_count,
            host: "https://mip.ciweimao.com"
        });
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