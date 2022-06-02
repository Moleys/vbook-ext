function execute(url) {
    url = url.replace('wap.ciweimao.com', 'mip.ciweimao.com').replace('www.ciweimao.com', 'mip.ciweimao.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        try {
            let htm = doc.select("#J_BookRead");
            htm.select("span").remove();
            htm.select("a").remove();
            htm = htm.html().replace(/\&nbsp;/g, "").replace(/<p class=\"chapter\">/g,"<p>");
            return Response.success(htm);
        }
        catch (err) {
            return null;
        }

    }
    let htm = "Đây là chương VIP. <br>Hiện extension này không thể đọc được chương VIP.";
    return Response.success(htm);
}