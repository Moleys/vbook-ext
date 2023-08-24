function execute(url) {
    let chapid = url.split("item_id=")[1]
    let newurl = "https://novel.snssdk.com/api/novel/book/reader/full/v1/?group_id=" + chapid + "&item_id=" + chapid + "&aid=2329"
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
        return Response.success(content);
    }
    return null;
}
