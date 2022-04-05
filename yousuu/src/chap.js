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
            let commentInfo ="#" +(i+1) + " " + author +" : " + score +"<br>" + createdAt.split("T")[0] +"<br>▲" + praiseCount+"<br>" + content;
            commentsAll = commentsAll + commentInfo + "<br><br>";
        }

    }
    if (commentsAll.replace("<br>","") !== null && commentsAll.replace("<br>","") !== '') 
        return Response.success(commentsAll);

    return null;

}