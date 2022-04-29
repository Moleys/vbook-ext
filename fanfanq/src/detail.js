function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let coverImg = doc.select("img.lazy").first().attr("data-original");
        let author = doc.select("title").text().split("作者：")[1].split("【")[0].trim();
        let description = doc.select("#read_tpc")
        // if(description.charAt(0)==="：" || description.charAt(0)==="】")
        //     description.substring(1);
        description.select("a").remove();
        description = description.html().replace(/\&nbsp;/g, "")
        if(description.indexOf("文案:") !== -1)
            description  = description.split("文案")[1];
        if(description.indexOf("文案】") !== -1)
            description  = description.split("文案】")[1];
        if(description.indexOf("文案") !== -1)
            description  = description.split("文案")[1];
        // if(description.indexOf("span") !== -1)
        //     description  = description.split(/[span ]+/).pop();
        return Response.success({
            name: doc.select("div#breadCrumb a").last().text().split("》")[0].replace("《",""),
            cover: coverImg,
            author: author,
            description: description,
            detail: "作者： " + author + "<br>" +doc.select("title").text().split("作者：")[1].split("【")[1].replace("】","").split("-")[0],
            host: "http://bbs.fanfanq.com"
        });
    }
    return null;
}