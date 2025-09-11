load('config.js');
function execute(url) {


    let translate_to = "vi"


    let url_chap = url.split("/getBookContent")[1]
    let response_chapter_info = fetch(config_host + "/getBookContent" + url_chap)
    if (response_chapter_info.ok) {
        let json = response_chapter_info.json();
        let chapter_info = json.data.replace(/<br\s*\/?>|\n/g, "\n");
        // chapter_info = chapter_info.split('\n').filter(Boolean);

    const arr_text_output = splitText(chapter_info, MAXLENGTHLINESZH)
    let output_text =""
    arr_text_output.forEach(t=>{t=encodeURIComponent(t);let o=fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl="+translate_to+"&dt=t&q="+t);if(o.ok){let t=o.json();phra_output="",t[0].forEach(t=>phra_output+=t[0]),output_text+=phra_output}});
    output_text = output_text.replace(/\n/g, "<br>");



        return Response.success(output_text);
    }
    return Response.error("Kiểm tra lại Web service Legado");

}
function splitText(txt_content) {
    let arrLinesZH = [];
    let MAXLENGTHLINESZH = CHUNK_SIZE_U;
    let tempLinesZH = "";
    let text_content_no_img_0a = txt_content.split('\n').map(line => line.trim()).filter(line => line !== '')
    for (let i = 0; i < text_content_no_img_0a.length; i++) {
        let line = text_content_no_img_0a[i]
        if ((line.length + tempLinesZH.length + (tempLinesZH.length > 0 ? 1 : 0)) < MAXLENGTHLINESZH) {
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