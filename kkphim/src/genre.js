load('config.js');

function execute() {
    let theloai = [
        { name: "Hành Động", url: "https://phimapi.com/v1/api/the-loai/hanh-dong" },
        { name: "Cổ Trang", url: "https://phimapi.com/v1/api/the-loai/co-trang" },
        { name: "Chiến Tranh", url: "https://phimapi.com/v1/api/the-loai/chien-tranh" },
        { name: "Viễn Tưởng", url: "https://phimapi.com/v1/api/the-loai/vien-tuong" },
        { name: "Kinh Dị", url: "https://phimapi.com/v1/api/the-loai/kinh-di" },
        { name: "Tài Liệu", url: "https://phimapi.com/v1/api/the-loai/tai-lieu" },
        { name: "Bí Ẩn", url: "https://phimapi.com/v1/api/the-loai/bi-an" },
        { name: "Phim 18+", url: "https://phimapi.com/v1/api/the-loai/phim-18" },
        { name: "Tình Cảm", url: "https://phimapi.com/v1/api/the-loai/tinh-cam" },
        { name: "Tâm Lý", url: "https://phimapi.com/v1/api/the-loai/tam-ly" },
        { name: "Thể Thao", url: "https://phimapi.com/v1/api/the-loai/the-thao" },
        { name: "Phiêu Lưu", url: "https://phimapi.com/v1/api/the-loai/phieu-luu" },
        { name: "Âm Nhạc", url: "https://phimapi.com/v1/api/the-loai/am-nhac" },
        { name: "Gia Đình", url: "https://phimapi.com/v1/api/the-loai/gia-dinh" },
        { name: "Học Đường", url: "https://phimapi.com/v1/api/the-loai/hoc-duong" },
        { name: "Hài Hước", url: "https://phimapi.com/v1/api/the-loai/hai-huoc" },
        { name: "Hình Sự", url: "https://phimapi.com/v1/api/the-loai/hinh-su" },
        { name: "Võ Thuật", url: "https://phimapi.com/v1/api/the-loai/vo-thuat" },
        { name: "Khoa Học", url: "https://phimapi.com/v1/api/the-loai/khoa-hoc" },
        { name: "Thần Thoại", url: "https://phimapi.com/v1/api/the-loai/than-thoai" },
        { name: "Chính Kịch", url: "https://phimapi.com/v1/api/the-loai/chinh-kich" },
        { name: "Kinh Điển", url: "https://phimapi.com/v1/api/the-loai/kinh-dien" },
        { name: "Phim Ngắn", url: "https://phimapi.com/v1/api/the-loai/phim-ngan" }
    ];

    let quocgia = [
        { name: "Trung Quốc", url: "https://phimapi.com/v1/api/quoc-gia/trung-quoc" },
        { name: "Thái Lan", url: "https://phimapi.com/v1/api/quoc-gia/thai-lan" },
        { name: "Hồng Kông", url: "https://phimapi.com/v1/api/quoc-gia/hong-kong" },
        { name: "Pháp", url: "https://phimapi.com/v1/api/quoc-gia/phap" },
        { name: "Đức", url: "https://phimapi.com/v1/api/quoc-gia/duc" },
        { name: "Hà Lan", url: "https://phimapi.com/v1/api/quoc-gia/ha-lan" },
        { name: "Mexico", url: "https://phimapi.com/v1/api/quoc-gia/mexico" },
        { name: "Thụy Điển", url: "https://phimapi.com/v1/api/quoc-gia/thuy-dien" },
        { name: "Philippines", url: "https://phimapi.com/v1/api/quoc-gia/philippines" },
        { name: "Đan Mạch", url: "https://phimapi.com/v1/api/quoc-gia/dan-mach" },
        { name: "Thụy Sĩ", url: "https://phimapi.com/v1/api/quoc-gia/thuy-si" },
        { name: "Ukraina", url: "https://phimapi.com/v1/api/quoc-gia/ukraina" },
        { name: "Hàn Quốc", url: "https://phimapi.com/v1/api/quoc-gia/han-quoc" },
        { name: "Âu Mỹ", url: "https://phimapi.com/v1/api/quoc-gia/au-my" },
        { name: "Ấn Độ", url: "https://phimapi.com/v1/api/quoc-gia/an-do" },
        { name: "Canada", url: "https://phimapi.com/v1/api/quoc-gia/canada" },
        { name: "Tây Ban Nha", url: "https://phimapi.com/v1/api/quoc-gia/tay-ban-nha" },
        { name: "Indonesia", url: "https://phimapi.com/v1/api/quoc-gia/indonesia" },
        { name: "Ba Lan", url: "https://phimapi.com/v1/api/quoc-gia/ba-lan" },
        { name: "Malaysia", url: "https://phimapi.com/v1/api/quoc-gia/malaysia" },
        { name: "Bồ Đào Nha", url: "https://phimapi.com/v1/api/quoc-gia/bo-dao-nha" },
        { name: "UAE", url: "https://phimapi.com/v1/api/quoc-gia/uae" },
        { name: "Châu Phi", url: "https://phimapi.com/v1/api/quoc-gia/chau-phi" },
        { name: "Ả Rập Xê Út", url: "https://phimapi.com/v1/api/quoc-gia/a-rap-xe-ut" },
        { name: "Nhật Bản", url: "https://phimapi.com/v1/api/quoc-gia/nhat-ban" },
        { name: "Đài Loan", url: "https://phimapi.com/v1/api/quoc-gia/dai-loan" },
        { name: "Anh", url: "https://phimapi.com/v1/api/quoc-gia/anh" },
        { name: "Thổ Nhĩ Kỳ", url: "https://phimapi.com/v1/api/quoc-gia/tho-nhi-ky" },
        { name: "Nga", url: "https://phimapi.com/v1/api/quoc-gia/nga" },
        { name: "Úc", url: "https://phimapi.com/v1/api/quoc-gia/uc" },
        { name: "Brazil", url: "https://phimapi.com/v1/api/quoc-gia/brazil" },
        { name: "Ý", url: "https://phimapi.com/v1/api/quoc-gia/y" },
        { name: "Na Uy", url: "https://phimapi.com/v1/api/quoc-gia/na-uy" },
        { name: "Nam Phi", url: "https://phimapi.com/v1/api/quoc-gia/nam-phi" },
        { name: "Việt Nam", url: "https://phimapi.com/v1/api/quoc-gia/viet-nam" },
        { name: "Quốc Gia Khác", url: "https://phimapi.com/v1/api/quoc-gia/quoc-gia-khac" }
    ];
    let nam = [
        { "name": 2000, "url": "https://phimapi.com/v1/api/nam/2000" },
        { "name": 2001, "url": "https://phimapi.com/v1/api/nam/2001" },
        { "name": 2002, "url": "https://phimapi.com/v1/api/nam/2002" },
        { "name": 2003, "url": "https://phimapi.com/v1/api/nam/2003" },
        { "name": 2004, "url": "https://phimapi.com/v1/api/nam/2004" },
        { "name": 2005, "url": "https://phimapi.com/v1/api/nam/2005" },
        { "name": 2006, "url": "https://phimapi.com/v1/api/nam/2006" },
        { "name": 2007, "url": "https://phimapi.com/v1/api/nam/2007" },
        { "name": 2008, "url": "https://phimapi.com/v1/api/nam/2008" },
        { "name": 2009, "url": "https://phimapi.com/v1/api/nam/2009" },
        { "name": 2010, "url": "https://phimapi.com/v1/api/nam/2010" },
        { "name": 2011, "url": "https://phimapi.com/v1/api/nam/2011" },
        { "name": 2012, "url": "https://phimapi.com/v1/api/nam/2012" },
        { "name": 2013, "url": "https://phimapi.com/v1/api/nam/2013" },
        { "name": 2014, "url": "https://phimapi.com/v1/api/nam/2014" },
        { "name": 2015, "url": "https://phimapi.com/v1/api/nam/2015" },
        { "name": 2016, "url": "https://phimapi.com/v1/api/nam/2016" },
        { "name": 2017, "url": "https://phimapi.com/v1/api/nam/2017" },
        { "name": 2018, "url": "https://phimapi.com/v1/api/nam/2018" },
        { "name": 2019, "url": "https://phimapi.com/v1/api/nam/2019" },
        { "name": 2020, "url": "https://phimapi.com/v1/api/nam/2020" },
        { "name": 2021, "url": "https://phimapi.com/v1/api/nam/2021" },
        { "name": 2022, "url": "https://phimapi.com/v1/api/nam/2022" },
        { "name": 2023, "url": "https://phimapi.com/v1/api/nam/2023" },
        { "name": 2024, "url": "https://phimapi.com/v1/api/nam/2024" },
        { "name": 2025, "url": "https://phimapi.com/v1/api/nam/2025" },
        { "name": 2026, "url": "https://phimapi.com/v1/api/nam/2026" }
    ]

    var result = [];

    // theloai
    for (var i = 0; i < theloai.length; i++) {
        result.push({
            title: "Thể loại: " + theloai[i].name,
            input: theloai[i].url,
            script: "gen.js"
        });
    }

    // quocgia
    for (var i = 0; i < quocgia.length; i++) {
        result.push({
            title: "Quốc gia: " + quocgia[i].name,
            input: quocgia[i].url,
            script: "gen.js"
        });
    }

    // nam
    for (var i = 0; i < nam.length; i++) {
        result.push({
            title: "Năm: " + nam[i].name,
            input: nam[i].url,
            script: "gen.js"
        });
    }

    return Response.success(result);
}
