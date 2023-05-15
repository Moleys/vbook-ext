load('crypto.js');
function execute(url) {
    let newurl = url.replace("/info.html","/")
    let response = fetch(newurl);
    if (response.ok) {
        let res_json = response.text();
        res = decode_text(res_json)

        let item_data_list = res.match(/"id":(\d+),"name":"(.*?)"/gm)
        let data = [];
        item_data_list.forEach(el1 => {
            let temp = el1.match(/"id":(\d+),"name":"(.*?)"/);
            let link = newurl + temp[1] + ".html";
            data.push({
                name: temp[2],
                url: link ,
                host: "https://contentxs.pysmei.com"
            });
        }); 
        return Response.success(data);  
    }
    return null;
}



function decode_text(input) {
    const key = CryptoJS.enc.Utf8.parse('OW84U8Eerdb99rtsTXWSILDO');
    const iv = CryptoJS.enc.Utf8.parse('SK8bncVu');
    const algorithm = CryptoJS.TripleDES;
    const padding = CryptoJS.pad.Pkcs7;

    let result = input;

    try {
    const matches = result.match(/"[^"]*[{}]{2,}[^"]+"/g);

    for (let i in matches) {
        const match = matches[i].match(/"([^"]*[{}]{2,})([^"]+)"/);
        const xx = CryptoJS.TripleDES.decrypt(match[2], key, { iv: iv, padding: padding }).toString(CryptoJS.enc.Utf8);
        result = result.replace(match[1] + match[2], xx);
    }
    } catch (error) {
    // Handle error if needed
    console.error(error);
    }

    return result;
}