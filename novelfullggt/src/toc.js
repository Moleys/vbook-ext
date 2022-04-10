function execute(url) {

    var docID = Http.get(url).html();
    var idBook = docID.select("#truyen-id").attr("value");
    //Console.log(idBook)
    var doc = Http.get("https://novelfull.com/ajax-chapter-option?novelId=" + idBook).html();
    var list_chapter =[];
    var all_chapter = doc.select(".chapter_jump option")
    // for(var i in all_chapter){
    //     var e = all_chapter[i];
    //     //Console.log(e);
    //     list_chapter.push({
    //         name: e.text(),
    //         url: e.attr("value"),
    //         host: "https://novelfull.com"
    //     })
    // }
    all_chapter.forEach(e=>list_chapter.push({
            name: e.text(),
            url: e.attr("value"),
            host: "https://novelfull.com"
        }))
    return Response.success(list_chapter);
}
//https://novelfull.com/my-pick-up-artist-system/chapter-1-prologue-the-perfect-protagonist.html
// toc json.