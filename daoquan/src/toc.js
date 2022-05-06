function execute(url) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
    let url1 = url.replace("daoquan.vn/doc-truyen/","daoquan.vn/")
    let id = url.split(/[/ ]+/).pop()
    let response = fetch('https://api.daoquan.vn/web/c/storyChapters/sort?filter={"storiesId":"' +  id+ '"}&range=[0,10000]&sort=["number","asc"]');
    if (response.ok) {
        let json = response.json();
        var list = [];
        var el = json.result.list;
        for (var i = 0; i < el.length; i++) {
            list.push({
                name: "Chương " + el[i].number + ": " + el[i].name,
                url: url1+"/"+el[i].storySections.number +"/chuong-" + el[i].number,
                host: "https://daoquan.vn"
            });
        }
        return Response.success(list);
    }
    return null;
}