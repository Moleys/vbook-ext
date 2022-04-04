function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();

        doc.select('script[data-n-head="ssr"]').remove();
        let scriptText = doc.select('script').first().toString();
        let temp0 = scriptText.split("commentsResult:");
        let temp1 = temp0[1].split(",Bookcase:{")[0]
        console.log(temp1)
        return Response.success("htm");
    }
    return null;
}