load("crypto.js");
function execute(url) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1);
    let book_id = url.split(/[/ ]+/).pop();
    let app_version= "2.8.021";
    let device_token= "ciweimao_f";
    let login_token= "9f652b5729f4ae15e1ff180dd48bd390";
    let account= "书客611354746076";
    let host_url = "https://app.hbooker.com";
    let default_params = "app_version="+app_version+"&device_token="+device_token+"&login_token="+login_token+"&account="+account;
    let get_division_list = "/book/get_division_list";
    let url_division_list = host_url + get_division_list + "?book_id=" + book_id + "&" +default_params;
    let response_division_list = fetch(url_division_list, {
        headers: [
        'User-Agent: Android com.kuangxiangciweimao.novel',
        ],
    })
    const data = [];
    if (response_division_list.ok) {
		let text_encrypt_division_list = response_division_list.text();
        let division_list = JSON.parse(decrypt(text_encrypt_division_list)).data.division_list;
        division_list.forEach(division => {
            console.log("division_name: "+division.division_name)
            let url_division = host_url+"/chapter/get_updated_chapter_by_division_id?division_id=" + division.division_id + "&" +default_params;
            // console.log(url)
            let response_chapter_list = fetch(url_division, {
                headers: [
                'User-Agent: Android com.kuangxiangciweimao.novel',
                ],
            })
            if (response_chapter_list.ok) {
                let text_encrypt = response_chapter_list.text();
                // console.log(text_encrypt)
                let chapter_list = JSON.parse(decrypt(text_encrypt)).data.chapter_list;
                chapter_list.forEach((e,index) => {
                    let url = "https://mip.ciweimao.com/chapter/"+e.chapter_id;
                    let name = e.chapter_title;
                    if(e.is_paid > 0){
                        name = "[VIP] " + name;
                        url = url + "?vip=true";
                    }
                    if(index==0){
                        name =  division.division_name +"BOOK" +name;
                        console.log(name)
                    }

                    data.push({
                        name: name,
                        url: url,
                        host: "https://mip.ciweimao.com"
                    })
                }); 
            }
        });

    if(data.length>0)
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