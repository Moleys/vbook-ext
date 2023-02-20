function execute(url) {
    let newurl = url.replace("/info.html","/")
    let response = fetch(newurl);
    if (response.ok) {
        let res = response.text();
        let item_data_list = res.match(/"id":(\d+),"name":"(.*?)"/gm)
        let data = [];
        item_data_list.forEach(el1 => {
            let temp = el1.match(/"id":(\d+),"name":"(.*?)"/);
            let link = newurl + temp[1] + ".html";
            data.push({
                name: temp[2],
                url: link ,
                host: "https://contentxs.pysmei.com"
            });
        }); 
        return Response.success(data);  
    }
    return null;
}
