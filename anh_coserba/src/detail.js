function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        return Response.success({
            name: doc.select("h1").first().text(),
            cover: doc.select('meta[property="og:image"]').attr("content").trim(),
            author: "",
            description:doc.select(".entry-content").text().replace("如果出现支付成功未跳转或无法下载，请私信或者文章底部留言！ 免责声明：本站的资源均来自于互联网，仅为资源共享、作个人学习使用，其版权均归原作者及其网站所有。 点击查看安卓手机解压教程 本站所有图片均为正规机构写真，无露D，无大CD，有这方面要求的请绕道，永久地址：Coser.pw",""),
            detail: "",
            host: "https://www.coserba.net/",
            type: "comic"
        });
    }
    return null;
}