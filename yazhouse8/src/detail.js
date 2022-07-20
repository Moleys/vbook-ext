function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        return Response.success({
            name: doc.select(".articleList h1").text(),
            author: "",
            description: "",
            detail: "",
            host: "https://yazhouse8.com"
        });
    }
    return null;
}