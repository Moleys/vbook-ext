function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("script").html();
        bookID = htm.split("const DJANGO_NOVEL_ID = '")[1].split("';")[0].trim();
        let url1 = "https://www.vietnovel.com/novel-chapters/api/list-chapters/?novel_id=" + bookID;
        let responseJson = fetch(url1);
        if (responseJson.ok) {
            let json = responseJson.json();
            console.log(json)
            let el = json.results;
            const data = [];
            for (let i = 0;i < el.length; i++) {
                data.push({
                    name: el[i].chapTitle,
                    // url: el[i].url,
                    url: "https://www.vietnovel.com/web-api/novel/chapter-content/?novelId="+ el[i].novelId +"&chapNum=" + el[i].chapNum,
                    host: "https://www.vietnovel.com",

                })
            }
            return Response.success(data);
        }

    }
    return null;
}