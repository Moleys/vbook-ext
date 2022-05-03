load("crypto.js");
function execute(url) {
    url = url.replace('wap.ciweimao.com', 'mip.ciweimao.com').replace('www.ciweimao.com', 'mip.ciweimao.com');
    if(url.includes("?vip=true")){
        let htm = "Đây là chương VIP. <br>Hiện extension này không thể đọc được chương VIP.";
        return Response.success(htm);
    }
    if(url.slice(-1) === "/")
        url = url.slice(0, -1);
    let book_id = url.split(/[/ ]+/).pop();
    let app_version= "2.8.021";
    let device_token= "ciweimao_f";
    let login_token= "9f652b5729f4ae15e1ff180dd48bd390";
    let account= "书客611354746076";
    let host_url = "https://app.hbooker.com";
    let default_params = "app_version="+app_version+"&device_token="+device_token+"&login_token="+login_token+"&account="+account;
    url = host_url+"/chapter/get_chapter_info?chapter_id=" + book_id + "&" +default_params;
    console.log(url)
    let response_chapter_info = fetch(url, {
        headers: [
        'User-Agent: Android com.kuangxiangciweimao.novel',
        ],
    })
    if (response_chapter_info.ok) {
		let text_encrypt_chapter_info = response_chapter_info.text();
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