function execute(url, page) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        const data = [];
		let ele1 =  doc.select('td div[style*="width:373px;height:136px;float:left;margin:5px 0px 5px 5px;"]');
        // console.log(ele1)
        
        ele1.forEach(e => {
            let temp0 = e.select('div').last();
            data.push({
                name: e.select('div a').first().attr("title"),
                link: e.select('div a').first().attr("href"),
                cover: e.select('div img').first().attr("src"),
                description: temp0.select('p').get(3).text(),
                host: "https://www.wenku8.net/"
            })
        });


        return Response.success(data)
    }
    return null;
}