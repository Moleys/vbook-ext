load('crypto.js');
function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let res_json = response.text();
        res_json = decode_text(res_json)
        console.log(res_json)
        res_json = JSON.parse(res_json)

        let author = res_json.data.Author;
        let bookname = res_json.data.Name;
        let description = res_json.data.Desc.replace(/\n/g, "<br>");
        let coverImg = res_json.data.Img;
        let lastime = res_json.data.LastTime;
        let category = res_json.data.CName;
        let bookstatus = res_json.data.BookStatus;
        coverImg = "https://imgapixs.pysmei.com/BookFiles/BookImages/" + coverImg;
        return Response.success({
            name: bookname,
            cover: coverImg,
            author: author,
            description: description,
            detail: "作者： " + author  + "<br>" + category + "<br>" + lastime +"<br>" + bookstatus,
            host: "https://infosxs.pysmei.com",
        });
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