function execute(url) {
    let commentsAll ="";
    let response = fetch(url); //https://api.yousuu.com/api/book/289040/comment?page=1
    if (response.ok) {
        let json = response.json();
        let comments = json.data.comments;
        for (let i = 0; i < comments.length; i++) {
            let author = comments[i].createrId.userName;
            let content = comments[i].content;
            let comments_id = comments[i]._id;
            // console.log(comments_id)
            let commentsReply= getReply(comments_id)
            let praiseCount = comments[i].praiseCount;
            let createdAt = comments[i].createdAt;
            let score = comments[i].score;
            if(score===1) score = "★";
            else if(score===2) score = "★★";
            else if(score===3) score = "★★★";
            else if(score===4) score = "★★★★";
            else score = "★★★★★";
            // let commentInfo ="--------------<br>#" +(i+1) + " " + author +" : " + score +"<br>评论时间: " + createdAt.split("T")[0] +"<br>▲" + praiseCount+"<br>" + content.replace(/(?:\r\n|\r|\n)/g, '<br>')+"<br>"+ commentsReply;
            let commentInfo ="--------------<br>Lầu " +(i+1) + "" + author +" : " + score + "<br>" + content.replace(/(?:\r\n|\r|\n)/g, '<br>') +"<br>"+ commentsReply;
            commentsAll = commentsAll + commentInfo + "<br><br>";
        }

    }
    if (commentsAll.replace("<br>","") !== null && commentsAll.replace("<br>","") !== '') 
        return Response.success(commentsAll);

    return null;

}
function getReply(_id){
    let response = fetch("https://api.yousuu.com/api/comment/"+_id+"/reply"); 
    let commentsReply0 = ""
    if (response.ok) {
        let json = response.json();
        let comments = json.data.commentReply;
        for (let i = 0; i < comments.length; i++) {
            let author = comments[i].fromId.userName;
            let content = comments[i].content;
            var commentInfo1 ="<br>" + (i+1) + "►" + author +"<br>" + content.replace(/(?:\r\n|\r|\n)/g, '<br>');
            commentsReply0 = commentsReply0 + commentInfo1 +"<br>"
        }
        return commentsReply0;
    }
}