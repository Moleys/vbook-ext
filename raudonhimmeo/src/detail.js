
function execute(url) {
    if (url.slice(-1) === "/")
        url = url.slice(0, -1);
    let a = url.split(/[/ ]+/)
    let book_id = a.pop();
    let site = a.pop();
    url = "https://raudo.nhimmeo.cf/api/" + site + "/detail.php?q=" + book_id;
    let response = fetch(url)
    if (response.ok) {
        let text_encrypt = response.json();
        let book_info = text_encrypt.data;
        let type = "chinese_novel";
        if (site === "truyencv" || site === "tangthuvien" || site === "wattpad") {
            type = "novel";
        }
        let cover = book_info.cover_img;
        if (cover === "/assets/images/noimg_1.jpg") {
            cover = "https://raw.githubusercontent.com/dat-bi/ext-vbook/main/anh-bia/1.png";
        }
        return Response.success({
            name: book_info.book_name,
            cover:  cover,
            author: book_info.author_name,
            description: book_info.description.replace(/\r\n/g, "<br>"),
            detail: book_info.detail,
            host: "https://raudo.nhimmeo.cf",
            type: type
        });
    }
    return null;
}
