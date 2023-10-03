function execute(key, page) {    
    page=page||"1";
    let response = fetch("https://ssxs.pigqq.com/search.aspx?key=" + key + "&page="+page+"&siteid=app2");
    if (response.ok) {
        let res_json = response.json();
        let allBook = res_json.data;
        const book = [];
        for (var i = 0; i < allBook.length; i++) {
            let item = allBook[i];
            let coverImg = item.Img;
            coverImg = coverImg.replace("https://quapp.yphsy.com/bookfiles/bookimages/","")
            coverImg = "https://imgapixs.pigqq.com/BookFiles/BookImages/" + coverImg;
            let bookId = item.Id;
            let cid = Math.floor(bookId/1000)+1;
            let link = "https://wb.pigqq.com/BookFiles/Html/" + cid + "/" + bookId + "/info.html";
            book.push({ 
                name: item.Name,
                description: item.Author,
                cover: coverImg,
                link: link,
                host: "https://wb.pigqq.com"
            })
        }
        var next = parseInt(page) + 1;
        return Response.success(book, next.toString())      
    }
    return null;
}