load('config.js');
function execute(url) {
    const to = "vie";
    let default_max_length = 9500;
    

    let url_chap = url.split("/getBookContent")[1]
    let response_chapter_info = fetch(config_host + "/getBookContent" + url_chap)
    if (response_chapter_info.ok) {
        let json = response_chapter_info.json();
        let chapter_info = json.data.replace(/<br\s*\/?>|\n/g, "\n");
        // chapter_info = chapter_info.split('\n').filter(Boolean);

        const arr_text_output = splitText(chapter_info, default_max_length)
        let output_text =""
        arr_text_output.forEach(text => {

            let response = fetch('https://fanyi.baidu.com/ait/text/translate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'query': text,
                        'from': lfrom,
                        'to': to,
                        'reference': '',
                        'corpusIds': [],
                        'qcSettings': ['1','2','3','4','5','6','7','8','9','10','11'
                        ],
                        'domain': 'common',
                    })
                    });


            if (response.ok) {
                let res_text = response.text();
                res_text = res_text.split("\n")
                let translating_json = getTranslatingJson(res_text);
                let translated_text = translating_json.data.list.map(item => item.dst).join('\n');
                output_text += translated_text;
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


function getTranslatingJson(data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].includes("event: message") && data[i + 1].includes("event\":\"Translating\"")) {
            // Extract the JSON data associated with the "Translating" event
            const translatingJson = JSON.parse(data[i + 1].replace("data: ", ""));
            return translatingJson;
        }
    }
    return null; // Return null if "Translating" event is not found
}