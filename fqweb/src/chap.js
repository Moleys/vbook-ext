load('config.js');

function execute(url) {
    const regex = /(?:item_id=|\/)(\d+)$/;
    let chapid = url.match(regex)[1];
    let chapterUrl = "https://torri77.nhimmeo.cf/content/" + chapid;
    let response_chapter_info = fetch(chapterUrl)
    if (response_chapter_info.ok) {
        let json = response_chapter_info.json();
        let chapter_info = json.data.data.content.replace(/<br\s*\/?>|\n/g, "<br><br>");
        if(chapter_info == "Đã dùng hết số chương cho phép, chi tiết vui lòng vào Trang nguồn.")
        {
            return Response.error("Đã dùng hết số chương cho phép, chi tiết vui lòng vào Trang nguồn.");
        }
        return Response.success(chapter_info);
    }

    return Response.error("Lỗi");
}

