function execute(url) {
    const regex = /(?:item_id=|\/)(\d+)$/;
    let chapid = url.match(regex)[1]

    let newurl = "https://novel.snssdk.com/api/novel/book/reader/full/v1/?aid=2329&item_id=" + chapid
    let response = fetch(newurl, {
        headers: {
            'user-agent': UserAgent.android()
        }
    });
    if (response.ok) {
        let res_json = response.json();
        let dataa = res_json.data.content;  
        var doc = Html.parse(dataa);
        var content = doc.select('article').html();
        return Response.success(dataa);
    }
    return null;
}
