
function execute(url) {
    let url1 = url.split("?novelid=")[1];
    let chapterid = url1.split("&chapterid=")[1];
    let novelid =  url1.split("&chapterid=")[0];
    let response = fetch("http://app-cdn.jjwxc.net/androidapi/chapterContent?novelId="+novelid+"&chapterId="+chapterid);
    if (response.ok) {
        let res_json = response.json();
        if(res_json.message){
            var html1 = "Đây là chương VIP. Nếu muốn đọc bạn cần mua chương VIP rồi đăng nhập tài khoản vào trình duyệt của Vbook.<br>Nếu đã mua rồi mà vẫn không đọc được thì lập chủ đề báo lỗi nha!";
            return Response.success(html1);
        }
        let chap_content = res_json.content.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/<br><br>/g, "<br>");
        return Response.success(chap_content);
    }
}