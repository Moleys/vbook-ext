load("base64.js");
function execute(url) {
    url = url.replace('m.wdbqg.com', 'www.wdbqg.com');
    let data  ="";
    let part1 = url.replace("https://www.wdbqg.com", "").replace("http://www.wdbqg.com", "").replace(".html","");
    var next = part1.trim();
    console.log(next)
    let i = 0;
    while (next.includes(part1)) {
        console.log("https://www.wdbqg.com" + next.trim() +".html")
        let response = fetch("https://www.wdbqg.com" + next +".html");
        if (response.ok) {
            let doc = response.html();

            doc.select('p[style*=\"color:red;\"]').remove();
            next = doc.select("a:contains(下一页)").first().attr("href").replace(".html","").trim();
            console.log(next)
            doc.select(".posterror").remove();
            let htm = doc.select("#content").html();
            data = data + htm.replace(/ 　　/g, "<br>").replace("<!-- <div id=\"play\" style=\"color:#f55;font-weight:bold;text-align:center\"><\/div> -->","").replace(/\&nbsp;/g, "");
            console.log(data)
            if(i>0){
                doc.select("#content").remove();
                doc.select('p[style*=\"color:red;\"]').remove();
                let encoded_text = doc.select("script").html().split("var mytxt = '")[1].split("';")[0];
                let decode_text = Base64.decode(encoded_text)
                decode_text = decode_text.replace(/\n/g, "<br>").replace(/　　/g, "").replace(/\&nbsp;/g, "")
                data = data + "<br>" + decode_text;
            }
            i++;

        } else {
            break;
        }
    }
    if (data) {
        return Response.success(data);
    }
    return null;
}