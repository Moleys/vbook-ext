function execute(url) {
    let chanel_id = url.split("=")[1]
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let total = doc.select("ul.pagination").first().select("li a").last().attr("href").split("/page/")[1].split("/")[0]
        console.log(total)

        const data = [];
        let count = 0;
        for (let i = total;i >=1; i--) {
            count++;
            data.push({
                name: (parseInt(count)).toString(),
                url: "https://hentaiz.cc/gallery/page/"+ i +"/?channels%5B0%5D="+chanel_id,
                host: "https://hentaiz.cc/gallery/"
            })
        }
        // data.reverse();
        return Response.success(data);
    }
    return null;
}