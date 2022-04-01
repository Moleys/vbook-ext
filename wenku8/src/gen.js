function execute(url, page) {
    if(!page) page = '1';
    if(url.indexOf("&page=") !== -1){
        url =  url.slice(0, -1);
        url = url + page;
    }
    else{
        url = url + "&page=" + page;
    }
    if(url.indexOf("articlelist.php") !== -1)
    {
        url = url.replace("&page","?page")
    }
    
    console.log(url)

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        const data = [];
		let ele1 =  doc.select('td div[style*="width:373px;height:136px;float:left;margin:5px 0px 5px 5px;"]');
        
        ele1.forEach(e => {
            let temp0 = e.select('div').last();
            data.push({
                name: e.select('div a').first().attr("title"),
                link: e.select('div a').first().attr("href"),
                cover: e.select('div img').first().attr("src"),
                description: temp0.select('p').get(1).text(),
                host: "https://www.wenku8.net/"
            })
        });


        var next = parseInt(page, 10) + 1;

        return Response.success(data, next.toString());
    }
    return null;
}