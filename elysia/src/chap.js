load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url)
    if (response.ok) {
		let doc = response.html();
        let data = []
        const cookie = response.request.headers.cookie
        const auto_use_chapter_vip = cookie.includes('auto_share_chapter_vip=on');
        let text1 = doc.select("article div[style*=font-size:20px]").text().trim()
        console.log(text1.length)
        const isUC = doc.html().includes('有道友分享了这一章');

        if((text1.length == 0) || isUC){
            let res2 = fetch(url.replace('chap', 'shchap'))
            if(res2.ok){
                let doc2 = res2.html()
                doc2.select("article div[style*=font-size:20px]").forEach((e,index) => {
                    data.push(e.html())
                });
            }
        }
        else {
            doc.select("article div[style*=font-size:20px]").forEach((e,index) => {
                data.push(e.html())
            });
        }
        return Response.success(data.join('<br>'));
    }
    return null;
}

