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
            htm = htm.html();
            data = data + htm;
        } 
        else {
            break;
        }
    }
    if (data) {
        data = data.replace("“","「").replace("”","」").replace("‘","『").replace("’","』").replace("","的").replace("","一").replace("","是").replace("","了").replace("","我").replace("","不").replace("","人").replace("","在").replace("","他").replace("","有").replace("","这").replace("","个").replace("","上").replace("","们").replace("","来").replace("","到").replace("","时").replace("","大").replace("","地").replace("","为").replace("","子").replace("","中").replace("","你").replace("","说").replace("","生").replace("","国").replace("","年").replace("","着").replace("","就").replace("","那").replace("","和").replace("","要").replace("","她").replace("","出").replace("","也").replace("","得").replace("","里").replace("","后").replace("","自").replace("","以").replace("","会").replace("","家").replace("","可").replace("","下").replace("","而").replace("","过").replace("","天").replace("","去").replace("","能").replace("","对").replace("","小").replace("","多").replace("","然").replace("","于").replace("","心").replace("","学").replace("","么").replace("","之").replace("","都").replace("","好").replace("","看").replace("","起").replace("","发").replace("","当").replace("","没").replace("","成").replace("","只").replace("","如").replace("","事").replace("","把").replace("","还").replace("","用").replace("","第").replace("","样").replace("","道").replace("","想").replace("","作").replace("","种").replace("","开").replace("","美").replace("","乳").replace("","阴").replace("","液").replace("","茎").replace("","欲").replace("","呻").replace("","肉").replace("","交").replace("","性").replace("","胸").replace("","私").replace("","穴").replace("","淫").replace("","臀").replace("","舔").replace("","射").replace("","脱").replace("","裸").replace("","骚").replace("","唇")
        return Response.success(data);
    }
    return null;
}