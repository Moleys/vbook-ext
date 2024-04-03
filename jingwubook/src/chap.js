function execute(url) {
    url = url.replace('m.jingwubook.com', 'www.jingwubook.com');
    let url2 = "http://www.jingwubook.com"
    const doc = fetch(url).html();
    var content = doc.select("#booktxt")
    content.select("script").remove()
    content.select("ins").remove()
    content = content.html();
    console.log(content)
    var nextPage = doc.select('.bottem1 a').last();

    console.log(url2+nextPage.attr('href'))
    while(nextPage.text() === '下一页'){
        var doc2 = fetch(url2+nextPage.attr('href')).html();
        var content2 = doc2.select("#booktxt")
        content2.select("script").remove()
        content2.select("ins").remove()
        content += content2.html();
        var nextPage = doc2.select('.bottem1 a').last();
    }
    content = content.replace(/<p><\/p>/g,'').replace(/&nbsp;/g,'').replace(/<div><\/div>/g,"")
    return Response.success(content);
}