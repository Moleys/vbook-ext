function execute(url) {
    let doc = fetch(url).html();
    let content = doc.select(".smiley").html();
    content = content.replace(/\n/gm, '<br>')
            .replace(/&(nbsp|amp|quot|lt|gt|bp|emsp);/g, "")
            .replace(/(<br\s*\/?>( )?){2,}/g, '<br>')
            .replace(/<img[^>]*>/gi, '')
            .replace(/<\/?p[^>]*>/gi, '').replace("Note: Ẩn quảng cáo xem <strong><a href=\"https://vozer.vn/thanh-vien/tu-tien\" style=\"color: #ff0000;\">tại đây<\/a><\/strong>.","");
    return Response.success(content);
}