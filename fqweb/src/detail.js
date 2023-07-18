load('config.js');
function execute(url) {
    let book_id = url.split("book_id=")[1]
    let response = fetch(config_host + "/info?book_id=" + book_id)
    if (response.ok) {
        try {
            let json = response.json();
            let book_info = json.data.data;
            let a_gen = JSON.parse(book_info.category_schema)
            let genres = [];
            a_gen.forEach(e => {
                genres.push({
                    title: e.name,
                    input: "/reading/bookapi/new_category/landing/v/?category_id=" + e.category_id + "&offset={{page}}&sub_category_id&genre_type=0&limit=10&source=front_category&front_page_selected_category&no_need_all_tag=true&query_gender=1",
                    script: "gen2.js"
                })
            });
            let last_chapter_update_time = book_info.last_chapter_update_time
            let last_chapter_update_time_string = formatChineseDate(last_chapter_update_time);
            return Response.success({
                name: book_info.book_name,
                cover: book_info.thumb_url,
                author: book_info.author,
                description: book_info.abstract.replace(/\n/g, "<br>"),
                genres: genres,
                detail: "作者：" + book_info.author + "<br>" + last_chapter_update_time_string,
            });
        } catch (error) {
            return Response.error(error);
        }
    }
    return null;
}
function formatChineseDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${year}年${month}月${day}日 ${hours}时${minutes}分`;
}