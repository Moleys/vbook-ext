function decode_text(input) {
    const key = CryptoJS.enc.Utf8.parse('OW84U8Eerdb99rtsTXWSILDO');
    const iv = CryptoJS.enc.Utf8.parse('SK8bncVu');
    const algorithm = CryptoJS.TripleDES;
    const padding = CryptoJS.pad.Pkcs7;
    let result = input;
    try {
        let matches = result.match(/"[^"]*[{}]{2,}[^"]+"/g);
        for (let i in matches) {
            let match = matches[i].match(/"([^"]*[{}]{2,})([^"]+)"/);
            let xx = CryptoJS.TripleDES.decrypt(match[2], key, { iv: iv, padding: padding }).toString(CryptoJS.enc.Utf8);
            result = result.replace(match[1] + match[2], xx);
        
        }
    }
    catch (error) {
        // Xử lý lỗi nếu cần thiết
        console.error(error);
    }

    return result;
}
