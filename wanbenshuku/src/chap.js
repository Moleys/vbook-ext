load("base64.js");
function execute(url) {
    url = url.replace('m.wanbenshuku.com', 'www.wanbenshuku.com');
    let data  ="";
    let part1 = url.replace("https://www.wanbenshuku.com", "").replace("http://www.wanbenshuku.com", "").replace(".html","");
    var next = part1.trim();
    console.log(next)
    let i = 0;
    while (next.includes(part1)) {
        console.log("https://www.wanbenshuku.com" + next.trim() +".html")
        let response = fetch("https://www.wanbenshuku.com" + next +".html");
        if (response.ok) {
            let doc = response.html();
            doc.select('p[style*=\"color:red;\"]').remove();
            next = doc.select(".bottem2 a").last().attr("href").replace(".html","").trim();
            let htm = doc.select("#booktxt").html();
            data = data + htm.replace(/ 　　/g, "<br>").replace("<!-- <div id=\"play\" style=\"color:#f55;font-weight:bold;text-align:center\"><\/div> -->","").replace(/\&nbsp;/g, "");
            console.log(data)
            if(i>0){
                doc.select("#booktxt").remove();
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