load("base64.js");
function execute(url) {
    url = url.replace('m.hetushu.com', 'www.hetushu.com');
    let chapterUrl = url;
    let sid = url.split(/[/ ]+/).pop();
    let url0 = url.replace(sid,"r" + sid).replace(".html",".json")
    // console.log(url0)
    // console.log(chapterUrl)
    var response_token = fetch(url0, {
        headers: {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
            "Connection": "keep-alive",
            "Content-type": "application/x-www-form-urlencoded",
            "DNT": "1",
            "Host": "www.hetushu.com",
            "Referer": "https://www.hetushu.com/book/6140/4538142.html",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "X-Requested-With": "XMLHttpRequest"
        }
    })

    if (response_token.ok) {
        let token = response_token.headers.token;
        token = base64().decode(token);
        if(token)
        {
            const tokenDict = token
                .split(/[A-Z]+%/)
                .map((v) => parseInt(v));
            let response1 = fetch(chapterUrl);
            if (response1.ok) {
                let doc = response1.html();
                let htm = doc.select("#content");
                htm.select(".cmask").remove();
                htm.select(".mask2").remove();
                htm.select(".mask").remove();
                htm.select(".h2").remove();
                htm = htm.select("div");
                var data = [];
                // console.log(tokenDict.toString());
                for (let i = 0; i < tokenDict.length; i++) 
                {
                    data.push({
                        content: htm.get(i+1).text(),
                        no: tokenDict[i],
                    })
                }
                data.sort((a, b) => a.no > b.no ? 1 : -1);
                // console.log(data[0].content)
                // console.log(data[0].no)
                let htm1 = data.map(e => e.content).join("<br>");
                return Response.success(htm1);
            }

        }


    }
    return null;
}

