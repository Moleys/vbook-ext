function execute(url, page) {
    if (!page) page = '1';
    let url1 = "https://raudo.nhimmeo.cf/api/"+url+"/gen.php?index=0&page=" + page;
    let response = fetch(url1)
    if (response.ok) {
        let doc = response.json();
        let item_list = doc.data.item_list
        const data = [];
        for (let j = 0; j < item_list.length; j++) {
            data.push({
                name: item_list[j].book_name,
                link: "https://raudo.nhimmeo.cf/" + url +"/" + item_list[j].book_id,
                cover: item_list[j].cover_img,
                description: item_list[j].author,
                host: "https://raudo.nhimmeo.cf"
            });
        }
        var next = parseInt(page, 10)+1
        return Response.success(data, next)
    }
    return null;
}