function execute(url) {
    url = url.replace('m.56bok.com', 'www.56bok.com');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html('gbk');
        let bookid = url.replace("https://www.56bok.com/chapter/","").replace("https://www.56bok.com/chapter/","").split("/")[1];
        console.log(bookid)
        let htm = doc.select(".back_r"+bookid).html();
        htm = htm.replace(/\&nbsp;/g, "");
        return Response.success(htm);
    }
    return null;
}