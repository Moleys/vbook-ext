function execute(url) {
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();

        return Response.success({
            name: doc.select("title").text().split("_")[0],
            cover: doc.select("img#bigImg").attr("src").trim(),
            author: "",
            description: "",
            detail: "",
            host: "http://www.mm4000.com/meinv/",
            type: "comic"

        });
    }
    return null;
}