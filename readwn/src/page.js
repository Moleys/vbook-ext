function execute(url) {
    let book_id = url.replace(".html","").split(/[/ ]+/).pop()

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select("ul.pagination li a").last().attr("href").split("page=")[1].split("&")[0]
        const data = [];
        for (let i = 0;i <= el1; i++) {
            data.push(
                "https://www.readwn.com/e/extend/fy.php?page=" +  i.toString() + "&wjm=" + book_id,
            )
        }
        return Response.success(data);
    }
    return null;
}