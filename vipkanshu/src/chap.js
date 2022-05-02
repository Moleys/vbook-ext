function execute(url) {
    url = url.replace('m.vipkanshu.vip', 'www.vipkanshu.vip');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("#content").html();
        htm = htm.replace(/\&nbsp;/g, "").replace(/<p class=\"content_detail\">/g, "<p>").replace("一秒记住ｈｔｔｐs://ｍ．ｖｉｐｋａｎｓｈｕ．vip", "");
        return Response.success(htm);
    }
    return null;
}