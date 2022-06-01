function execute(url) {
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();
        let coverImg = doc.select('#archive figure.thumbnail img').first().attr("src");
        let author =  doc.select(".metadata tr.artists a").text();
        return Response.success({
            name: doc.select(".metadata h1.title").text(),
            cover: coverImg,
            author: author,
            description: doc.select('section.metadata table tbody').html().replace(/<tr class/g,"<p class").replace(/<\/td> \n <td>/g,": ").replace(/<td>/g,"").replace(/<\/td>/g,"").replace(/:  <a href=/g,": <a href="),
            detail: "Artist: " + author +"<br>Parody: "+doc.select(".metadata tr.parodies a").text(),
            host: "https://koushoku.org"
        });
    }
    return null;
}