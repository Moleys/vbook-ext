load("crypto.js");
function execute() {
    let app_version= "2.8.021";
    let device_token= "ciweimao_f";
    let ciweimao_account = "";
    let ciweimao_password = "";
    let host_url = "https://app.hbooker.com";
    let url = host_url+"/signup/login?app_version="+app_version+"&device_token="+device_token+"&passwd="+ciweimao_password+"&login_name="+ciweimao_account;
    let response = fetch(url, {
        headers: [
        'User-Agent: Android com.kuangxiangciweimao.novel',
        ],
    })

    if (response.ok) {
        let text_encrypt = response.text();
        let json_decrypt = JSON.parse(decrypt(text_encrypt))

        let data = [];
        data.push({
            login_token:  json_decrypt.data.login_token,
            account: json_decrypt.data.reader_info.account,
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