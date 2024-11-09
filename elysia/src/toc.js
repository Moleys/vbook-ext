
load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if(url.slice(-1) === "/")
        url = url.slice(0, -1);  
    const data = [];
    let book_id = url.split(/[/ ]+/).pop();
    let url_division = BASE_URL+"/book/"+book_id+"/catalog";
    let response_chapter_list = fetch(url_division)
    if (response_chapter_list.ok) {
        let doc = response_chapter_list.html();
        doc.select(".MuiButtonBase-root.MuiListItemButton-root").forEach((e,index) => {
                let name = e.select("p").text()
                let link = e.select("a").first().attr("href")
                data.push({
                    name: name,
                    url: BASE_URL+link,
                    host: BASE_URL
                })
			}); 

        return Response.success(data)
    }
    return null;
}

