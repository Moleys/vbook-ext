
function decryptContent(content) {
    // Được hỗ trợ bởi thám tử Đạt 009
    if (content.length <= 30) {
        return "";
    }
    const key = CryptoJS.enc.Utf8.parse("KW8Dvm2N");
    const iv = CryptoJS.enc.Utf8.parse("1ae2c94b");
    const ciphertext = CryptoJS.enc.Base64.parse(content);
    const decrypted = CryptoJS.DES.decrypt({ ciphertext }, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
        });
    return decrypted.toString(CryptoJS.enc.Utf8);
}


function decode(accesskey, keyString, content) {
    let v43, v38, dest;

    const accesskeyLen = accesskey.length;
    let v9 = 0;
    const v6 = accesskey.charCodeAt(accesskeyLen - 1);
    for (let i = 0; i < accesskeyLen; i++) {
        v9 += accesskey.charCodeAt(i);
    }
    const v15 = v9 % keyString.length;
    const v17 = Math.floor(v9 / 65);
    const v18 = keyString.length;
    if (v17 + v15 > v18) {
        v43 = keyString.substring(v15, (v18 - v17) + v15);
    } else {
        v43 = keyString.substring(v15, v17 + v15);
    }
    const v32 = content.length;
    if (v6 & 1) {
        v38 = content.substring(v32 - 12, v32);
        dest = content.substring(0, v32 - 12);
    } else {
        v38 = content.substring(0, 12);
        dest = content.substring(12, content.length);
    }

    const key = md5Encode(v43 + v38).substring(0, 8);
    const iv = md5Encode(v38).substring(0, 8);

    try {
        content = decryptDES(dest, key, iv);
    } catch (e) {
        console.error(e);
    }

    return content;
}

function md5Encode(input) {
    return CryptoJS.MD5(input).toString();
}

function decryptDES(encrypted, key, iv) {
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const ivHex = CryptoJS.enc.Utf8.parse(iv);
    const decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(encrypted)
    }, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}