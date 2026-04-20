
load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    if(url.slice(-1) === "/")
        url = url.slice(0, -1);
    let book_id = url.split(/[/ ]+/).pop();
    url = BASE_URL + "/api/detail.php?q=" + book_id;
    console.log(url)
    let response = fetch(url)
    if (response.ok) {
		let data = response.json();

        let book_info = data.data.book_info;
        let categories = {
            "8": "玄幻奇幻",
            "27": "都市青春",
            "1": "灵异未知",
            "30": "历史军事",
            "6": "科幻无限",
            "3": "游戏竞技",
            "5": "仙侠武侠",
            "24": "免费同人",
            "11": "女频"
        };

        let category_index = book_info.category_index; 
        let category_text = categories[category_index] || "未知分类";
        return Response.success({
            name: book_info.book_name,
            cover: book_info.cover,
            author: book_info.author_name,
            description: "Category: " +category_text +"<br>题材：" +book_info.tag + "<br>简介：<br>" + book_info.description.replace(/\r\n/g, "<br>"),
            detail: "作者：" + book_info.author_name + "<br>更新：" +book_info.uptime+ "<br>字数：" +book_info.total_word_count,
            host: BASE_URL
        });
    }
    return null;
}
