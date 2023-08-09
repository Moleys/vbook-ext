function execute(url) {
    let data  ="";
    let part1 = url.replace("https://w.linovelib.com", "").replace("http://w.linovelib.com", "").replace(".html","");
    var next = part1;
    while (next.includes(part1)) {
        console.log(next)
        let response = fetch("https://w.linovelib.com" + next +".html");
        if (response.ok) {
            let doc = response.html();
            let name = doc.select("title").text()
            if(name.includes("(漫画)") || name.includes("（漫画）") ){
                let imgs = [];
                doc.select("#acontent img").forEach(e => imgs.push(e.attr("src")));
                return Response.success(imgs);
            }





            next = doc.select("link[rel=prerender]").attr("href").replace(".html","").replace("https://w.linovelib.com", "").replace("http://w.linovelib.com", "");
            let htm = doc.select("#acontent")
            htm.select(".cgo").remove()
            htm = htm.html()
            data = data + htm;
        } 
        else {
            break;
        }
    }
    if (data) {
        data = data.replace(/“/g,"「").replace(/”/g,"」").replace(/‘/g,"『").replace(/’/g,"』").replace(//g,"上").replace(//g,"们").replace(//g,"来").replace(//g,"当").replace(//g,"时").replace(//g,"大").replace(//g,"了").replace(//g,"我").replace(//g,"不").replace(//g,"有").replace(//g,"这").replace(//g,"个").replace(//g,"的").replace(//g,"一").replace(//g,"是").replace(//g,"人").replace(//g,"在").replace(//g,"他").replace(//g,"地").replace(//g,"为").replace(//g,"子").replace(//g,"中").replace(//g,"你").replace(//g,"说").replace(//g,"生").replace(//g,"国").replace(//g,"年").replace(//g,"用").replace(//g,"就").replace(//g,"那").replace(//g,"和").replace(//g,"要").replace(//g,"她").replace(//g,"出").replace(//g,"也").replace(//g,"得").replace(//g,"里").replace(//g,"后").replace(//g,"自").replace(//g,"以").replace(//g,"会").replace(//g,"家").replace(//g,"可").replace(//g,"下").replace(//g,"然").replace(//g,"过").replace(//g,"天").replace(//g,"去").replace(//g,"能").replace(//g,"对").replace(//g,"小").replace(//g,"多").replace(//g,"而").replace(//g,"么").replace(//g,"还").replace(//g,"于").replace(//g,"心").replace(//g,"学").replace(//g,"好").replace(//g,"看").replace(//g,"着").replace(//g,"起").replace(/𫓴/g,"鉾").replace(//g,"发").replace(//g,"道").replace(//g,"想").replace(//g,"成").replace(//g,"只").replace(//g,"如").replace(//g,"事").replace(//g,"样").replace(//g,"之").replace(//g,"都").replace(//g,"第").replace(//g,"阴").replace(//g,"到").replace(//g,"没").replace(//g,"液").replace(//g,"茎").replace(//g,"乳").replace(//g,"美").replace(//g,"肉").replace(//g,"交").replace(//g,"性").replace(//g,"胸").replace(//g,"私").replace(//g,"呻").replace(//g,"欲").replace(//g,"把").replace(//g,"作").replace(//g,"种").replace(//g,"开").replace(//g,"射").replace(//g,"脱").replace(//g,"穴").replace(//g,"淫").replace(//g,"臀").replace(//g,"舔").replace(//g,"裸").replace(//g,"骚").replace(//g,"唇");

        return Response.success(data);
    }
    return null;
}