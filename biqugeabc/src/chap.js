function execute(url) {
    url = url.replace('m.biqugeabc.com', 'www.biqugeabc.com');
    let response = fetch(url);

    let data = "";

    if (response.ok) {
        let doc = response.html();
        doc.select(".posterror").remove();
        let htm = doc.select(".text_row_txt");
        // htm = htm.replace(/\&nbsp;/g, "");
        htm.select("p").forEach(p => {
            let paragraph  = [];
            let paragraphText  = "";
            p.select("d").forEach(d => {
                let temp = parseInt(d.attr("data-index").trim());
                paragraph.push({
                    index: temp,
                    text: d.text()
                });
                // paragraph.sort((a, b) => a.index.localeCompare(b.index));
                var paragraph = paragraph.sort((a, b) => Number(a.index) - Number(b.index));


                paragraph.forEach(f => {
                    paragraphText += + f.text;
                });
            });
            data += paragraphText;

            // data = data + e.text().replace(/(?:\r\n|\r|\n)/g, '<br>') +"<br>";
        });


        }

    if (data !== null && data !== '') 
        return Response.success(data);
    
    return null;
}