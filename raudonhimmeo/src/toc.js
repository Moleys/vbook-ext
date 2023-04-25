
function execute(url) {
    if (url.slice(-1) === "/")
        url = url.slice(0, -1);
    const data = [];
    let a = url.split(/[/ ]+/)
    let book_id = a.pop();
    let site = a.pop();
    let url_division = "https://raudo.nhimmeo.cf/api/" + site + "/catalog.php?q=" + book_id;
    let response_chapter_list = fetch(url_division)
    if (response_chapter_list.ok) {
        let text_encrypt = response_chapter_list.json();
        let chapter_list = text_encrypt.data.item_list;
        chapter_list.forEach((e, index) => {
            let name = e.name;
            data.push({
                name: name,
                url: "https://raudo.nhimmeo.cf/api/" + site + "/chap.php?q=" + e.url + "&k=" + book_id,
                host: "https://raudo.nhimmeo.cf"
            })
        });
        return Response.success(data)
    }
    return null;
}

