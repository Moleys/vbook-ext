load('config.js');
function execute(url) {

    //get cookkie
    var browser = Engine.newBrowser();
    browser.launch("https://fanyi.baidu.com", 1000);
    browser.callJs("var authorization = document.cookie; var auth = document.createElement('auth'); auth.innerHTML = authorization; document.body.appendChild(auth);", 100);
    let auth = browser.html().select("auth").text();

    // let text = "原来，她们才是主角";
    let get_token = getToken();
    const gtk = get_token.gtk;
    const token = get_token.token;
    const from = "zh";
    const to = "vie";
    const url1 = `https://fanyi.baidu.com/v2transapi?from=${from}&to=${to}`;
    let default_max_length = 870;
    

    let url_chap = url.split("/getBookContent")[1]
    let response_chapter_info = fetch(config_host + "/getBookContent" + url_chap)
    if (response_chapter_info.ok) {
        let json = response_chapter_info.json();
        let chapter_info = json.data.replace(/<br\s*\/?>|\n/g, "\n");
        // chapter_info = chapter_info.split('\n').filter(Boolean);

        const arr_text_output = splitText(chapter_info, default_max_length)
        let output_text =""
        arr_text_output.forEach(text => {
            let sign = getSign(sliceText(text), gtk)

            let response = fetch(url1, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': auth
            },
                body: JSON.stringify({
                    from: from,
                    to: to,
                    query: text,
                    transtype: 'realtime',
                    simple_means_flag: '3',
                    sign: sign,
                    token: token,
                    domain: 'common'
                })
            });



            if (response.ok) {
                let translation = response.json();
                let translatedText = translation.trans_result.data.map(item => item.dst).join('\n');
                // console.log(translatedText)
                output_text += translatedText;
            }
        });
        output_text = output_text.replace(/\n/g, "<br>");

        return Response.success(output_text);
    }
    return Response.error("Kiểm tra lại Web service Legado");

}
function splitText(txt_content, max_length) {
    let arrLinesZH = [];
    let tempLinesZH = "";
    let text_content_no_img_0a = txt_content.split('\n').map(line => line.trim()).filter(line => line !== '')
    for (let i = 0; i < text_content_no_img_0a.length; i++) {
        let line = text_content_no_img_0a[i]
        if ((line.length + tempLinesZH.length + (tempLinesZH.length > 0 ? 1 : 0)) < max_length) {
            if (tempLinesZH.length > 0) {
                tempLinesZH += "\n";
            }
            tempLinesZH += line;
        } else {
            arrLinesZH.push(tempLinesZH);
            tempLinesZH = line;
        }
    }
    if (tempLinesZH.length > 0) {
        arrLinesZH.push(tempLinesZH);
    }
    return arrLinesZH
}


function getToken() {
    let homeurl = 'https://fanyi.baidu.com/';
    let response = fetch(homeurl);
    if (response.ok) {
        let homepage = response.html();
        homepage = homepage.html();
		// const sign1 = homepage.match(/window\.gtk\s*=\s*"([^"]+)"/)[1];
		// const token1 = homepage.match(/token\s*:\s*'([^']+)'/)[1];
        let tmatch = /token: ['"](.+?)['"]/gi.exec(homepage);
        if (!tmatch || tmatch.length < 2) return null;
        let gmatch = /window.gtk = ['"](.+?)['"]/gi.exec(homepage);
        if (!gmatch || gmatch.length < 2) return null;
        return {
            'token': tmatch[1],
            'gtk': gmatch[1]
        };
    }
    return null
}

function sliceText(text) {
	if (text.length <= 30) return text;

	const midIndex = Math.floor(text.length / 2);

	return (
		text.slice(0, 10) +
		text.slice(midIndex - 5, midIndex + 5) +
		text.slice(-10)
	);
}

function aB(a, b) {
	for (var c = 0; c < b.length - 2; c += 3) {
		var d = b.charAt(c + 2);
		d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d);
		d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
		a = "+" == b.charAt(c) ? (a + d) & 4294967295 : a ^ d;
	}
	return a;
}

function getSign(a, b) {
	if (b === undefined) return;

	var d = b.split(".");

	b = Number(d[0]) || 0;

	for (var e = [], f = 0, g = 0; g < a.length; g++) {
		var k = a.charCodeAt(g);
		128 > k
			? (e[f++] = k)
			: (2048 > k
					? (e[f++] = (k >> 6) | 192)
					: (55296 == (k & 64512) &&
					  g + 1 < a.length &&
					  56320 == (a.charCodeAt(g + 1) & 64512)
							? ((k =
									65536 +
									((k & 1023) << 10) +
									(a.charCodeAt(++g) & 1023)),
							  (e[f++] = (k >> 18) | 240),
							  (e[f++] = ((k >> 12) & 63) | 128))
							: (e[f++] = (k >> 12) | 224),
					  (e[f++] = ((k >> 6) & 63) | 128)),
			  (e[f++] = (k & 63) | 128));
	}
	a = b;
	for (f = 0; f < e.length; f++) a = aB(a + e[f], "+-a^+6");
	a = aB(a, "+-3^+b+-f");
	a ^= Number(d[1]) || 0;
	0 > a && (a = (a & 2147483647) + 2147483648);
	a %= 1e6;
	return a.toString() + "." + (a ^ b);
}
