function execute(url) {
    url = url.replace('m.wanben.org', 'www.wanben.org');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let htm = doc.select(".readerCon");
        htm.select("script").remove();
        htm = htm.html();
        htm = htm.replace(/\&nbsp;/g, "").replace(/一秒记住.↘完^本.神^站.首^发↘.手机用户输入地址：m.wanbentxt.com/g,"").replace(/支持.\\^完*本*神*站*\\^.把本站分享那些需要的小伙伴！找不到书请留言！/g,"").replace(/<\/t>/g,"").replace(/<t>/g,"").replace(/一秒记住↘完^本.神^站.首^发↘手机用户输入地址：m.Wanbentxt.coΜ/g,"").replace(/一秒记住↘完^本.神^立占.首^发↘手机用户输入地址：м.шanbentxt.coM/g,"").replace(/&#x9;/g, "").replace(/&#x8;/g, "").replace(/&#x7;/g, "").replace(/&#x6;/g, "").replace(/&#x5;/g, "").replace(/&#x4;/g, "").replace(/&#x3;/g, "").replace(/&#x2;/g, "").replace(/&#x1;/g, "").replace(/&#x1;/g, "").replace(/【提示】：如果觉得此文不错，请推荐给更多小伙伴吧！分享也是一种享受。/g,"").replace(/【看书助手】/g,"").replace(/百万热门书籍终身无广告免费阅读/g,"").replace(/【完本神站】手机阅读网址 m.wanbentxt.com 喜欢就分享一下/g,"").replace(/百万热门书籍终身无广告免费阅读/g,"").replace(/百万热门书籍终身无广告免费阅读/g,"");//&amp;&gt;


        
        return Response.success(htm);
    }
    return null;
}