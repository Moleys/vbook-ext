
function execute(url) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1);
    let book_id = url.split(/[/ ]+/).pop();
    url = "https://sv2.nhimmeo.ovh/api/detail.php?q=" + book_id;
    let response = fetch(url)
    if (response.ok) {
        const data = [];
		let text_encrypt = response.json();
        console.log(text_encrypt)
        let book_info = text_encrypt.data.book_info;
        return Response.success({
            name: book_info.book_name,
            cover: book_info.cover,
            author: book_info.author_name,
            description: "<br>题材：" +book_info.tag + "<br>简介：<br>" + book_info.description.replace(/\r\n/g, "<br>"),
            detail: "作者：" + book_info.author_name + "<br>更新：" +book_info.uptime+ "<br>字数：" +book_info.total_word_count,
            host: "https://sv2.nhimmeo.ovh"
        });
    }
    return null;
}
