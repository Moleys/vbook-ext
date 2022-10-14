
function execute(url) {
    let url1 = url.split("?novelid=")[1];
    let chapterid = url1.split("&chapterid=")[1];
    let novelid =  url1.split("&chapterid=")[0];
    let response = fetch("http://app-cdn.jjwxc.net/androidapi/chapterContent?novelId="+novelid+"&chapterId="+chapterid);
    if (response.ok) {
        let res_json = response.json();
        if(res_json.message){
            var html1 = "Đây là chương VIP. Nếu muốn đọc bạn cần mua chương VIP rồi đăng nhập tài khoản vào trình duyệt của Vbook.<br>Nếu bạn vừa mới đăng nhập thì reload - tải lại chương này để cập nhật nội dung.<br>Nếu vẫn không đọc được thì lập chủ đề bên Góp ý báo lỗi!";
            return Response.success(html1);
        }
        let chap_content = res_json.content.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/<br><br>/g, "<br>");
        let sayBody = res_json.sayBody
        console.log(sayBody)
        if(sayBody.length>0){
            chap_content = chap_content + "<br>-------------<br>" + sayBody.replace(/\r\n/g,"<br>")
        }
        return Response.success(chap_content);
    }
}