function execute(url, page) {
    if (!page) page = "1";
    // Extract ID from URL: https://www.fuxsb.com/xiandai/26424.html -> 26424
    let id = url.match(/\/(\d+)\.html/)[1];
    
    // API URL provided by USER
    let apiUrl = "https://www.fuxsb.com/e/extend/com_pl/api/record.php?orderby=0&id=" + id + "&classid=4&pageIndex=" + page;
    
    let res = fetch(apiUrl);
    if (res.ok) {
        let json = res.json();
        if (json && json.result) {
            let doc = Html.parse(json.result);
            let data = [];
            
            doc.select(".com_pl_record_item").forEach(el => {
                let userEl = el.select(".com_pl_record_item_userinfo_link span").first();
                let user = userEl ? userEl.text().trim() : "Ẩn danh";
                
                // Tách tên và ngày: "Tên  2025-12-28"
                let name = user.split(/\s{2,}/)[0] || "Ẩn danh";
                let time = user.split(/\s{2,}/)[1] || "";
                
                let contentEl = el.select(".com_pl_record_item_saytext").first();
                let content = contentEl ? contentEl.text().trim() : "";
                
                // Format lại nội dung, loại bỏ các khoảng trắng thừa
                content = content.replace(/\s+/g, " ");
                
                data.push({
                    name: name,
                    content: content,
                    description: time
                });
            });
            
            let hasNext = json.pageIndex < json.pageTotal;
            return Response.success(data, hasNext ? (parseInt(page) + 1) + "" : null);
        }
    }
    return null;
}