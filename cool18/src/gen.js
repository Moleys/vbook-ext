function execute(url, page) {
    if(!page) page = '1';
    let response = fetch('https://www.cool18.com/bbs4/index.php?app=forum&act=cachepage&cp=tree'+page);
    // let response = fetch(url);
    if (response.ok) {
        let doc = response.html();


        const data = [];
		let ele1 = doc.select('#d_list li')
        ele1.select("ul li a").remove();
        ele1.select("ul li span").remove();
        ele1.select("ul li ul").remove();
        ele1.select("ul li").remove();
        ele1.forEach(e => {
                if(e.select("a").first().text()!='')
                    data.push({
                        name: e.select("a").first().text(),
                        // link: e.select("a").first().attr("href"),
                        link: e.select("a").last().attr("href"),
                        description: e.select("font").last().text(),
                        host: "https://wap.cool18.com/"
                    })
            }
        
        );


        var next = parseInt(page, 10) + 1;

        return Response.success(data, next.toString());
    }
    return null;
}