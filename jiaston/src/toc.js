function execute(url) {
    //https://scxs.pigqq.com/BookFiles/Html/446/445578/info.html
    let newurl = url.replace("/info.html","/")
    let response = fetch(newurl);
    if (response.ok) {
        let res = response.text();
        // let item_data_list = res.match(/"id":(\d+),"name":"(.*?)"/gm)
        let item_data_list = res.match(/"id":(\d+),"name":"(.*?),"hasContent":1/gm)
        let data = [];
        item_data_list.forEach(el1 => {
            let temp = el1.match(/"id":(\d+),"name":"(.*?)"/);
            let link = newurl + temp[1] + ".html";
            data.push({
                name: temp[2],
                url: link ,
                host: "https://scxs.pigqq.com"
            });
        }); 
        return Response.success(data);  
    }
    return null;
}
