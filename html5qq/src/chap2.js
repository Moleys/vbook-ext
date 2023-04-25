function execute(url) {
    const [resourceId, serialId] = url.match(/resourceid=(\d+).*serialid=(\d+)/).slice(1);
    let response = fetch('https://novel.html5.qq.com/be-api/content/ads-read', {
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
        let doc = response.json();
        let content = doc.data.Content[0].Content[0]
        // if(!doc.data.isFree) return Response.success("Không FREE");
        // let content = doc.data.content.join("<br>")
        content = content.replace(/\r\n/g,"<br>")
        return Response.success(content);
    }
    return null;
}