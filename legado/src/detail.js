
function execute(url) {
    let host = "http://192.168.0.102:1122"
    let book_url = decodeURIComponent(url.split("/getChapterList?url=")[1])

    if (typeof host === "undefined")
        {
            return Response.error(book_url);

        }
        else
        {
            let response = fetch(host+"/getBookshelf")
            if (response.ok) {
try {
                let json = response.json();
                let book_list = json.data;
                // let book_info = book_list.find(obj => obj.bookUrl === book_url);
                let book_info;

                for (let i = 0; i < book_list.length; i++) {
                    if (book_list[i].bookUrl == book_url) {
                        book_info = book_list[i];
                        break;
                    }
                }

                return Response.success({
                    name: book_info.name,
                    cover:  book_info.coverUrl,
                    author: book_info.author,
                    description: book_info.intro.replace(/\r\n/g, "<br>"),
                    detail: "作者：" + book_info.author + "<br>" + book_info.kind,
                    host: "https://raudo.nhimmeo.cf",
                });
}catch (error) {
                return Response.error(error);
            }}
            return null;
        }
}