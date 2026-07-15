function execute(url) {
    var match = String(url || "").match(/resourceid=(\d+).*serialid=(\d+)/);
    if (!match) return Response.error("Cannot detect chapter id");
    var resourceId = match[1];
    var serialId = match[2];
    var response = fetch('https://novel.html5.qq.com/be-api/content/ads-read', {
    method: 'POST',
    headers: {
        'Referer': 'https://novel.html5.qq.com/',
        'Q-GUID': '0ee63838b72eb075f63e93ae0bc288cb',
        'QIMEI36': '8ff310843a87a71101958f5610001e316a11',
    },
    body: JSON.stringify({
        'ContentAnchorBatch': [
        {
            'BookID': resourceId,
            'ChapterSeqNo': [serialId]
        }
        ],
        'Scene': 'chapter'
    })
    });
    if (response.ok) {
        var doc = response.json();
        var content = doc.data.Content[0].Content[0]
        // if(!doc.data.isFree) return Response.success("Không FREE");
        content = content.replace(/\r\n/g,"<br>")
        return Response.success(content);
    }
    return null;
}
