function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("script").html()
        htm = htm.split("ar slides_page_path =")[1].split(";")[0]
        slides_page_path = JSON.parse(htm)
        slides_page = slides_page_path;
        length_chapter = slides_page.length-1; 
        for (i = 0; i < length_chapter; i++)
        for (j = i+1; j < slides_page.length; j++){
            if (slides_page[j] < slides_page[i]) {
                temp = slides_page[j];
                slides_page[j] = slides_page[i];
                slides_page[i] = temp;
            }
        }
        return Response.success(slides_page);
    }
    return null;
}