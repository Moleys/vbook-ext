function execute(url) {
    url = url.replace('m.mozhua6.com', 'www.mozhua6.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#txt_content")
        htm.select("#float_300").remove()
        htm.select("script").remove()
        htm.select("style").remove()
        htm.select("style").remove()
        htm.select("p[align=center]").remove()
        htm = htm.select("p").first().text()
        htm = "<p>"+htm +"</p>"
        htm = fdecode(htm)
        
        let htm2 = "<div><p>"+htm +"</p></div>"
        let htm3= Html.parse(htm2).select("div").html().replace("<p>﻿","<p>").replace(/<p><\/p>/g, "").replace(/ ;/g, "")
        return Response.success(htm3);
    }
    return null;
}


function fdecode(o) {
    o = o.replace(/ /g, "&nbsp")
    var e = [
        [String.fromCharCode(1), ";&#x"],
        [String.fromCharCode(2), "&#x"],
        [String.fromCharCode(3), ";&#"],
        [String.fromCharCode(4), "&gt"],
        [String.fromCharCode(5), "&lt"],
        [String.fromCharCode(6), "</p><p>"],
        [String.fromCharCode(7), "<p>"],
        [String.fromCharCode(8), "</p>"],
        ["&nbsp;;", " "],
        ["<p>&nbsp;</p>", ""]
    ]

    for (let a = 0; a < e.length; a++) {
        var i = new RegExp(e[a][0], "ig");
        o = o.replace(i, e[a][1])
    }
    return o;
}
