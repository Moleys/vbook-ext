function execute(url) {
    const resourceidRegex = /resourceid=(\d+)/;
    const match = url.match(resourceidRegex);
    const resourceid = match[1];
    let response = fetch(url, {"headers":{"Referer":"https://bookshelf.html5.qq.com/qbread/adread/catalog"}});
    if (response.ok) {
        let doc = response.json();
        let el = doc.rows
        const data = [];
        for (let i = 0;i < el.length; i++) {
            let chargetype = el[i].chargetype ? "🌟" : "";
            let link = "https://bookshelf.html5.qq.com/qbread/api/wenxue/buy/ad-chapter/v3?resourceid="+ el[i].resourceid +"&serialid="+ el[i].serialid +"&apn=1&readnum=1&duration=2&srcCh="
            data.push({
                name: el[i].serialname,
                url: link,
                host: "https://bookshelf.html5.qq.com"
            })
        }
        return Response.success(data);
    }
    return null;
}