function execute(url) {
    url = url.replace('m.wanben.org', 'www.wanben.org');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select(".readerCon");
        htm.select("script").remove();
        htm = htm.html();
        htm = htm.replace(/\&nbsp;/g, "").replace("一秒记住.↘完^本.神^站.首^发↘.手机用户输入地址：m.wanbentxt.com","").replace("支持.\\^完*本*神*站*\\^.把本站分享那些需要的小伙伴！找不到书请留言！","");
        return Response.success(htm);
    }
    return null;
}