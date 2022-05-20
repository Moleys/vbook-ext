function execute(url) {
    let response = fetch(url);
    // if(url.slice(-1) === "/")
    //     url = url.slice(0, -1)
    if (response.ok) {
        let doc = response.html();
        let el = doc.select("section p img");
        var data = [];
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            var img = e.attr("src");
            console.log(img)
            data.push(img);
 
        }



        
        return Response.success(data);
    }


    return null;
}