function execute(url) {
    url = url.replace('m.biqugeabc.com', 'www.biqugeabc.com');
    let response = fetch(url);
    let data = "";
    if (response.ok) {
        let doc = response.html();
        doc.select(".posterror").remove();
        let htm = doc.select(".text_row_txt");
        htm.select("p").forEach(p => { ///p tag
            const p1  = [];

            p.select("d").forEach(d => {
                let temp = d.attr("data-index").trim();
                p1.push({
                    index: temp,
                    text1: d.text()
                });
            });
            p1.forEach(f => {
                console.log(f.index)
            });
            p1 = p1.sort((a, b) => Number(a.index) - Number(b.index));
            let paragraphText  = "";
            p1.forEach(f => {
                paragraphText = paragraphText + f.text1;
            });
            data = data + paragraphText+ "<br>";
        });
        }

    if (data !== null && data !== '') 
        return Response.success(data);
    
    return null;
}