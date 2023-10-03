load('crypto.js');
load('decode.js');

function execute(url) {
    let newurl = url.replace("/info.html","/")
    let response = fetch(newurl);
    if (response.ok) {
        let res_json = response.text();
        res = decode_text(res_json)

        let item_data_list = res.match(/"id":(\d+),"name":"(.*?)"/gm)
        let data = [];
        item_data_list.forEach(el1 => {
            let temp = el1.match(/"id":(\d+),"name":"(.*?)"/);
            let link = newurl + temp[1] + ".html";
            data.push({
                name: temp[2],
                url: link ,
                host: "https://wb.pigqq.com"
            });
        }); 
        return Response.success(data);  
    }
    return null;
}
