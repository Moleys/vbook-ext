


// function execute() {
//     let response = fetch("https://www.shumilou.co/");
//     if (response.ok) {
//         let doc = response.html();
//         let zenre = [];
//         doc.select("nav.nav a").forEach(e => zenre.push({
//             title: e.text(),
//             input: "https://www.shumilou.co" + e.attr("href"),
//             script: "zen.js"
//         }));
//         return Response.success(zenre);
//     }

//     return null;
// }


function execute() {
    return Response.success([
        {title: "玄幻", input:  "https://www.shumilou.co/list/xuanhuanmofa", script: "zen.js"},
        {title: "仙侠", input:  "https://www.shumilou.co/list/xianxiaxiuzhen", script: "zen.js"},
        {title: "都市", input:  "https://www.shumilou.co/list/dushuyanqing", script: "zen.js"},
        {title: "历史", input:  "https://www.shumilou.co/list/lishijunshi", script: "zen.js"},
        {title: "网游", input:  "https://www.shumilou.co/list/wangyoudongman", script: "zen.js"},
        {title: "科幻", input:  "https://www.shumilou.co/list/kehuanxiaoshuo", script: "zen.js"},
        {title: "女生", input:  "https://www.shumilou.co/list/nvshengxiaoshuo", script: "zen.js"},
        {title: "其他", input:  "https://www.shumilou.co/list/qitaxiaoshuo", script: "zen.js"}

    ]);
}