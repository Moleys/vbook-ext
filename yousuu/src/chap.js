function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let commentList = [];
        doc.select('script[data-n-head="ssr"]').remove();
        let scriptText = doc.select('script').first().toString();
        let temp0 = scriptText.split("commentsResult:");
        let temp1 = temp0[1].split(",Bookcase:{")[0]
        // console.log(temp1);
        //nội dung comment ở trong thẻ script, nhưng thông tin ngày comment có cái là bb, aa ==", nên phải lấy từ html
        let  divResult = doc.select(".result");
        divResult.select(".BookCommentItem").forEach(element => {
            console.log(element.select("div").first());
            
            // commentList.push({
            //     id: 
            //     name: page,
            //     content: "https://www.yousuu.com"
            //     createdAt: 
            // });
        });


        return Response.success("htm");
    }
    return null;
}