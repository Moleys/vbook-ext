function execute(url) {
    let url_api =  "https://api.comick.app/comic/" + url.split(/[/ ]+/).pop()
    // https://api.comick.app/comic/solo-leveling/
    let response = fetch(url_api);
    if (response.ok) {
        let doc = response.json();
        let hid = doc.comic.hid;
        console.log(hid)
        let chapter_count = doc.comic.chapter_count;
        let pagination = Math.ceil(chapter_count/300)
        const data = [];
        

        for (let i = 1;i <= pagination; i++) {
            data.push(hid + "_" + i.toString())
        }
        data.reverse();
        return Response.success(data);
    }
    return null;
}



