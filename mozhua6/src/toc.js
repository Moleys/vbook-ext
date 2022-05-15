function execute(url) {
	url = url.replace('m.mozhua6.com', 'www.mozhua6.com');
    let linktruyen = ""
    if(url.includes("mozhua6.com/read-")){
        linktruyen = url
    }
    else{
        console.log("get url truyen")

        let response0 = fetch(url);
        if (response0.ok) {
            let doc1 = response0.html();
            linktruyen = doc1.select("h3.psth.xs1 a").attr("href")

        }
    }

    console.log(linktruyen)
    let linktruyen2 = linktruyen.replace(linktruyen.split(/[- ]+/).pop(),"")
    console.log(linktruyen2)


    let response = fetch(linktruyen);
    if (response.ok) {
        let doc = response.html();
        let total = doc.select("a#overpage").first().attr("href").split(/[- ]+/).pop().replace(".html","")
        console.log("Total: "+total)
        const data = [];
        for (let i = 1;i <= total; i++) {
            data.push({
                name: "第"+ i.toString() +"章",
                url: linktruyen2+i+".html",
                host: "https://www.mozhua6.com"
            })
        }
        return Response.success(data);
    }
    return null;
}