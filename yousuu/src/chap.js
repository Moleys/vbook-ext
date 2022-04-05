function execute(url) {
    let commentsAll ="";
    let response = fetch(url);
    if (response.ok) {
        let json = response.json();
        let comments = json.data.comments;
        for (let i = 0; i < comments.length; i++) {
            let author = comments[i].createrId.userName;
            let content = comments[i].content;
            let praiseCount = comments[i].praiseCount;
            let createdAt = comments[i].createdAt;
            let score = comments[i].score;
            if(score===1) score = "★";
            else if(score===2) score = "★★";
            else if(score===2) score = "★★★";
            else if(score===2) score = "★★★★";
            else score = "★★★★★";
            let xn ="\/-n".replace("-","")
            let xn2 = xn;
            console.log(content.replace(/(?:\r\n|\r|\n)/g, '<br>'));
            let commentInfo ="--------------<br>#" +(i+1) + " " + author +" : " + score +"<br>评论时间: " + createdAt.split("T")[0] +"<br>▲" + praiseCount+"<br>" + content.replace(/(?:\r\n|\r|\n)/g, '<br>');
            commentsAll = commentsAll + commentInfo + "<br><br>";
        }

    }
    if (commentsAll.replace("<br>","") !== null && commentsAll.replace("<br>","") !== '') 
        return Response.success(commentsAll);

    return null;

}