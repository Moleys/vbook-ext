function execute(url) {
    const regex = /(?:item_id=|\/)(\d+)$/;
    let chapid = url.match(regex)[1]

    let newurl = "https://novel.snssdk.com/api/novel/book/reader/full/v1/?device_platform=android&version_code=973&app_name=news_article&version_name=9.7.3&app_version=9.7.3&device_id=1&channel=google&device_type=1&os_api=33&os_version=13&item_id="+chapid+"&aid=1319"
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