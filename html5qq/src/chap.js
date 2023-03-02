function execute(url) {
    let response = fetch(url, {"headers":{"Referer":"https://bookshelf.html5.qq.com/kdread/adread/chapter"}})
    if (response.ok) {
        let doc = response.json();
        // if(!doc.data.isFree) return Response.success("Không FREE");
        let content = doc.data.content.join("<br>")
        return Response.success(content);
    }
    return null;
}