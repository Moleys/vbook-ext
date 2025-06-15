load('config.js');
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response = fetch(url)
    if (response.ok) {
        const cookie = response.request.headers.cookie
        const isAutoShareOn = cookie.includes('auto_share_chapter_vip=on');
		let doc = response.html();
        let data = []
        doc.select("article div[style*=font-size:20px]").forEach((e,index) => {
            data.push(e.html())
        });
        if(data.length === 0 && isAutoShareOn){
            let res2 = fetch(url.replace('chap', 'shchap'))
            if(res2.ok){
                let doc2 = res2.html()
                doc2.select("article div[style*=font-size:20px]").forEach((e,index) => {
                    data.push(e.html())
                });
            }
        }
        return Response.success(data.join('<br>'));
    }
    return null;
}

