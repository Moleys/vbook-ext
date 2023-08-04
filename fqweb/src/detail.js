load('config.js');
function execute(url) {
    const regex = /(?:book_id=|\/)(\d+)$/;
    let book_id = url.match(regex)[1]

    // let book_id = url.split("book_id=")[1]
    let response = fetch(config_host2 + "/info?book_id=" + book_id)
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
            let last_publish_time = book_info.last_publish_time
            let last_publish_time_string = formatChineseDate(last_publish_time)
            let serial_count = book_info.serial_count
            let last_chapter_title = book_info.last_chapter_title
            let read_count = book_info.read_count
            let word_number = book_info.word_number
            let score = book_info.score
            let ongoing = (book_info.creation_status == '1') ? true : false
            return Response.success({
                name: book_info.book_name,
                cover: book_info.thumb_url,
                author: book_info.author,
                description: book_info.abstract.replace(/\n/g, "<br>"),
                genres: genres,
                detail: `作者: ${book_info.author}<br>评分: ${score}分<br>章节数: ${serial_count}<br>字数: ${word_number}<br>查看次数: ${read_count}<br>更新: ${last_publish_time_string}<br>最后更新: ${last_chapter_title}`,
                ongoing: ongoing
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
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}