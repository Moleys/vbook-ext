function execute(url) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1)
    let bookId = url.split(/[/ ]+/).pop();
    if(url.includes("sangtacviet")){
        url = "https://mip.ciweimao.com/book/" + bookId;
    }
    
    // console.log(url)
    let url1 = "https://sangtacviet.pro/truyen/ciweimao/1/"+bookId+"/";

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.select(".cnt-box.catalogue").last()
        let el = el1.select("li a")
        const data = [];
        for (let i = 0;i < el.size(); i++) {
            var e = el.get(i);
            let name = e.select("a").text();
            let isVip = e.select("i").attr("class").replace(/icon/g,"").replace("-","").trim();
            let chapId = "";
            if(isVip === "lock"){
                chapId = e.attr("href").split(/[/ ]+/).pop()+"";
            }
            else{
                chapId = e.attr("href").split(/[/ ]+/).pop();
            }


            data.push({
                name: name,
                url: url1+chapId+"/",
                host: "https://sangtacviet.pro"
            })

        }
        return Response.success(data);
    }
    return null;
}