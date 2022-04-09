function execute(url, page) {
    const data = [];
    data.push({
        name: "Tin mới nhất",
        link: "https://tuoitre.vn/rss/tin-moi-nhat.rss",
        host: "https://tuoitre.vn"
    }),    
    data.push({
        name: "Thời sự",
        link: "https://tuoitre.vn/rss/thoi-su.rss",
        host: "https://tuoitre.vn"
    }),    
    data.push({
        name: "Thế giới",
        link: "https://tuoitre.vn/rss/the-gioi.rss",
        host: "https://tuoitre.vn"
    }),    
    data.push({
        name: "Pháp luật",
        link: "https://tuoitre.vn/rss/phap-luat.rss",
        host: "https://tuoitre.vn"
    }),    
    data.push({
        name: "Kinh doanh",
        link: "https://tuoitre.vn/rss/kinh-doanh.rss",
        host: "https://tuoitre.vn"
    }),    data.push({
        name: "Công nghệ",
        link: "https://tuoitre.vn/rss/nhip-song-so.rss",
        host: "https://tuoitre.vn"
    }),    data.push({
        name: "Xe",
        link: "https://tuoitre.vn/rss/xe.rss",
        host: "https://tuoitre.vn"
    }),    data.push({
        name: "Nhịp sống trẻ",
        link: "https://tuoitre.vn/rss/nhip-song-tre.rss",
        host: "https://tuoitre.vn"
    }),    
    data.push({
        name: "Văn hóa",
        link: "https://tuoitre.vn/rss/van-hoa.rss",
        host: "https://tuoitre.vn"
    }),    
    data.push({
        name: "Giải trí",
        link: "https://tuoitre.vn/rss/giai-tri.rss",
        host: "https://tuoitre.vn"
    }),    data.push({
        name: "Thể thao",
        link: "https://tuoitre.vn/rss/the-thao.rss",
        host: "https://tuoitre.vn"
    }),    data.push({
        name: "Giáo dục",
        link: "https://tuoitre.vn/rss/giao-duc.rss",
        host: "https://tuoitre.vn"
    }),    data.push({
        name: "Khoa học",
        link: "https://tuoitre.vn/rss/khoa-hoc.rss",
        host: "https://tuoitre.vn"
    }),    data.push({
        name: "Sức khỏe",
        link: "https://tuoitre.vn/rss/suc-khoe.rss",
        host: "https://tuoitre.vn"
    }),    data.push({
        name: "Giả thật",
        link: "https://tuoitre.vn/rss/gia-that.rss",
        host: "https://tuoitre.vn"
    }),    
    data.push({
        name: "thu-gian",
        link: "https://tuoitre.vn/rss/thu-gian.rss",
        host: "https://tuoitre.vn"
    }),    
    data.push({
        name: "Bạn đọc",
        link: "https://tuoitre.vn/rss/ban-doc-lam-bao.rss",
        host: "https://tuoitre.vn"
    }),
    data.push({
        name: "Du lịch",
        link: "https://tuoitre.vn/rss/du-lich.rss",
        host: "https://tuoitre.vn"
    })

    return Response.success(data)
}