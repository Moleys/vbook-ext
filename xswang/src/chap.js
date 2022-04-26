function execute(url) {
    url = url.replace('m.xswang.com', 'www.xswang.com');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let data = []
        doc.select("#content p.content_detail").forEach(e => {
            data.push(e.text().replace("首发网址ｈｔｔps://m.ｘｓｗａng.com ","").replace(" 一秒记住ｈｔｔｐs://ｍ．ｘｓｗａｎｇ.ｃｏｍ","").replace("记住网址m.xsｗａｎｇ．ｃom",""));
        });
        let htm = data.join("<br>");
        return Response.success(htm);
        
    }
    return null;
}