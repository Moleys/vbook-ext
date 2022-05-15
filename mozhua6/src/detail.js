function execute(url) {
	url = url.replace('m.mozhua6.com', 'www.mozhua6.com');
    if(url.includes("mozhua6.com/read-")){
        let response0 = fetch(url);
        if (response0.ok) {
            let doc1 = response0.html('gbk');
            let title = doc1.select("h1.flb.hm.txt_title").text().split("- 绗")[0].trim()
            console.log(title)

            let author = title.split("作者：")[1].split("（")[0].split("【")[0].trim()
            return Response.success({
                name: title,
                author: author,
                description: "",
                detail: "作者： " + author,
                host: "https://www.mozhua6.com"
            });



        }

    }
    else{
        let response = fetch(url);
        if (response.ok) {
            let doc = response.html();
            let des = doc.select(".t_fsz td").first()
            des.select("ignore_js_op").remove()
            let author = doc.select("#thread_subject").text().split("作者：")[1].split("（")[0].split("【")[0].trim()
            return Response.success({
                name: doc.select("#thread_subject").text(),
                author: author,
                description: des.html(),
                detail: "作者： " + author,
                host: "https://www.mozhua6.com"
            });
        }
    }
    return null;
}