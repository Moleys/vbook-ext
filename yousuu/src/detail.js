function execute(url) {
    let response = fetch(url);
    if (response.ok) {

        let doc = response.html();

        let coverImg = doc.select(".card-bookInfo-cover").first().attr("cover");;
        // doc.select("ul li ul").remove();
        doc.select('script[data-n-head="ssr"]').remove();

        let description = doc.select('meta[name="description"]').first().attr("content").split("深度解析。");

        let scriptText = doc.select('script').first().toString();


        
        let score = scriptText.split(",score:")[1].split(",")[0];
        let scorer = scriptText.split(",scorerCount:")[1].split(",")[0];
        let scoreDetail = scriptText.split("],commentCount")[0].split("scoreDetail:[")[1];
        let scoreDetailArr = scoreDetail.split(",."); //f**k [Y,.09,Y,X,.42], [X,.192,.262,.198,.135], [.12,.16,P,.26,P] thì X Y p là cái qq gì?
        //[.08,.02,.09,aa,ab] [.09,b,.02,.01,.89] [.132,.177,O,.239,P] [.082,.042,.121,.232,aj]  [.301,E,E,.224,.129]
        //tự quy ước, không đúng thì thôi X=13 Y=21, P=22, aa=14, ab = 67, b= 0, o =23, aj = 52, E=17
        console.log(scorer) // có gì lại ra W - thực là 60 người, ra U khi 40 người. f**K
        console.log(scoreDetailArr.toString())

        //test tính scrorer
        //        6.6 d - 40 ng
        //       1sao = ng1/(tong)*100% = 10% => a = b/tong*100 => tong= 100b/a => ng1  = b = a*tong/100
        //       2sao = ng2/(tong)*100% = 21%
        //       3sao = ng3/(tong)*100% = 25%
        //       4sao = ng4/(tong)*100% = 18%
        //       5sao = ng5/(tong)*100% = 26%
        //      ng1+ng2+ng3+ng4+ng5=40
        //      4 +8.4 +10 +7.2 +10.4
        // (4*1 + 8.4*2 +10*3 + 7.2*4 + 10.4*5)/20 = 6.6
        // (10*tong)/100 + 21*tong/100 + 25*tong/100+18*tong/100+26*tong/100 = 6.6


        //        7.4 d - 129 ng
        //       1sao = ng1/(tong)*100% = 13%
        //       2sao = ng2/(tong)*100% = 9%
        //       3sao = ng3/(tong)*100% = 13%
        //       4sao = ng4/(tong)*100% = 22%
        //       5sao = ng5/(tong)*100% = 42%
        //      ng1+ng2+ng3+ng4+ng5=129



        // console.log(scriptText)
        console.log("az")
        let ratingDetail = "综合评分: " +  score + "/10\n个评分: " + scorer;

        return Response.success({
            name: doc.select("h1.book-name").first().text(),
            cover: coverImg,
            author: doc.select("p.book-author").first().text().replace(/作\s*者：/g, ""),
            description: ratingDetail +"\n\n" + description,
            detail: doc.select(".book-status span").html(),
            host: "https://www.yousuu.com"
        });
    }
    return null;
}