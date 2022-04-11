function execute() {
    let response = fetch("https://www.vietnovel.com/the-loai/");

    if (response.ok) {
        let doc = response.html();
        const data = [];
        let ele1 = doc.select("div.row.pt-3 div.card-header");
        ele1.forEach(e => {
            let name = e.select("h2.h5").text().replace("Truyện","").trim();
            data.push({
                title: name + " (" +  e.select(".numeral").first().text() +  ")" ,
                input: 'https://www.vietnovel.com' + e.select("a").first().attr('href') +"danh-sach/",
                script: 'gen.js'
            });
        });
        return Response.success(data);
    }

    return null;
}