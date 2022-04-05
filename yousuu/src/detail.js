function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let coverImg = doc.select(".card-bookInfo-cover").first().attr("cover");;
        let author = doc.select("p.book-author").first().text().replace(/作\s*者：/g, "")''
        // doc.select("ul li ul").remove();
        doc.select('script[data-n-head="ssr"]').remove();
        let description = doc.select('meta[name="description"]').first().attr("content").split("深度解析。");
        let scriptText = doc.select('script').first().toString();


        
        let score = scriptText.split(",score:")[1].split(",")[0];
        let scorer = scriptText.split(",scorerCount:")[1].split(",")[0];
        let scoreDetail1 = scriptText.split("],commentCount")[0].split("scoreDetail:[")[1];
        let scoreDetailArr = scoreDetail1.split(","); //f**k [Y,.09,Y,X,.42], [X,.192,.262,.198,.135], [.12,.16,P,.26,P] thì X Y p là cái qq gì?

        const scoreDetailArr1 = [];
        //fix ký tự, số
        scoreDetailArr.forEach(element => {
            element = element.replace(".","");
            if(element.length == 3) element = parseInt(element)/10;
            element = Math.round(element);
            scoreDetailArr1.push(element); 
        });

        console.log(scoreDetailArr1.toString())
        

        // console.log(scriptText)
        console.log("az")
        let ratingDetail = "综合评分: " +  score + "/10<br>人评分: " + scorer + "<br>评级信息:<br>1★: "+ scoreDetailArr1[0] + "%<br>2★: "+ scoreDetailArr1[1] + "%<br>3★: "+ scoreDetailArr1[2] + "%<br>4★: "+ scoreDetailArr1[3] + "%<br>5★: "+ scoreDetailArr1[4] +"%";



        return Response.success({
            name: doc.select("h1.book-name").first().text(),
            cover: coverImg,
            author: author,
            description: ratingDetail +"<br><br>作品简介: " + description,
            detail: author + "<br>" + doc.select(".book-status span").html(),
            host: "https://www.yousuu.com"
        });
    }
    return null;
}