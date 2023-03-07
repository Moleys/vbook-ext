function execute(url) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
    let chapid = url.split(/[/ ]+/).pop()
    let newurl = "https://novel.snssdk.com/api/novel/book/reader/full/v1/?group_id=" + chapid + "&item_id=" + chapid + "&aid=1977"
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