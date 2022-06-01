function execute() {
    return Response.success([
        {title: "新书榜单", input: "http://app.jjwxc.org/androidapi/newDayList", script: "gen2.js"},
        {title: "VIP今日限免", input: "http://app-cdn.jjwxc.net/bookstore/vipNovelFreeByDate", script: "gen4.js"},
        {title: "完结高分", input: "http://www.jjwxc.net/topten.php?orderstr=20", script: "gen.js"},
        {title: "出版最新", input: "http://www.jjwxc.net/copyright.php?publisherid=2", script: "gen.js"}

    ]);
}