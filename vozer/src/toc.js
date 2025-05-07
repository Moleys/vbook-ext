load('config.js');

function execute(url) {
    const data = [];
    let doc = fetch(url).html();
    
    let chapList = doc.select("table.w-full.mb-5 tr td a");
    let chapListCount = chapList.length;

    for (let j = 0; j < chapListCount; j++) {
        let element = chapList.get(j);

        data.push({
            name: element.text(),
            url: element.attr("href"),
            host: BASE_URL
        });
    }
    
    return Response.success(data);
}
